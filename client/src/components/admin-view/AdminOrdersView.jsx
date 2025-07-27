import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrderDetails from "./AdminOrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin,getOrderDetailsForAdmin,resetOrderDetails } from "@/features/admin/orderSlice";
import { Badge } from "../ui/badge";

const AdminOrdersView = () => {
const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
const {orderList, orderDetails} = useSelector(state => state.adminOrder);
const dispatch = useDispatch();
useEffect(()=> {
  dispatch(getAllOrdersForAdmin());
},[dispatch]);

function handleFetchOrderDetails (getId) {
  dispatch(getOrderDetailsForAdmin(getId));
}
useEffect(() => {
  if(orderDetails !== null) {
    setOpenDetailsDialog(true);
  }
},[orderDetails])

  return (

    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>
              <span className="sr-only">
                Order Details
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
               {
            orderList && orderList.length > 0 ? 
            orderList.map(orderItem => (
          <TableRow key={orderItem?._id}>
            <TableCell>{orderItem?._id}</TableCell>
            <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
            <TableCell>
              <Badge className={`w-[80px] px-2 py-2 text-sm ${orderItem?.orderStatus === 'confirmed' ? "bg-green-500" :
                orderItem?.orderStatus === 'rejected' ? "bg-red-500" : "bg-black"}`}>
                {orderItem?.orderStatus}
              </Badge>
            </TableCell>
            <TableCell>${orderItem?.totalAmount}</TableCell>
            <TableCell>
              <Dialog open={openDetailsDialog} onOpenChange={() => {
                setOpenDetailsDialog(false);
                dispatch(resetOrderDetails());
              }}>
                <Button className="bg-black" onClick={() => handleFetchOrderDetails(orderItem?._id)}> View Details</Button>
                <AdminOrderDetails orderDetails={orderDetails}/>
              </Dialog>
            </TableCell>
          </TableRow>
            )) : null
          }
        </TableBody>
      </Table>
     </CardContent>
    </Card>

  );

};

export default AdminOrdersView;
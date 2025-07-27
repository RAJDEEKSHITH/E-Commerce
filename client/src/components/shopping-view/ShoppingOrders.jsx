import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetails from "./ShoppingOrderDetails";
import { getAllOrderDetails, getAllOrdersByUserId, resetOrderDetails } from "@/features/shop/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";

const ShoppingOrders = () => {
const [openDetailsDialog,setOpenDetailsDialog] = useState(false);
const dispatch = useDispatch();
const {user} = useSelector(state => state.auth);
const {orderList,orderDetails} = useSelector(state => state.shopOrder);
function handleFetchOrderDetails (getId) {
  dispatch(getAllOrderDetails(getId))
}
useEffect(() => {
  if(orderDetails !== null) {
    setOpenDetailsDialog(true)
  }
},[orderDetails])

useEffect(() => {
  dispatch(getAllOrdersByUserId(user?.id));

},[dispatch])
  return (

    <Card>
     <CardHeader>
      <CardTitle>Order History</CardTitle>
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
              <Badge className={`w-[80px] px-2 py-2 text-sm
                 ${orderItem?.orderStatus === 'confirmed' ? "bg-green-500" :
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
                <ShoppingOrderDetails orderDetails={orderDetails}/>
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

export default ShoppingOrders;
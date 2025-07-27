import { useState } from "react";
import CommonForm from "../common/CommonForm";
import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const ShoppingOrderDetails = ({orderDetails}) => {
const [formData, setFormData] = useState({
    status: "", // default value
  });

const {user} = useSelector(state => state.auth);

const handleUpdateStatus = (event) => {
    event.preventDefault();
  };
  return (
    <DialogContent className="sm:max-w-[600px]">
         <DialogTitle>Order Details</DialogTitle>
         <DialogDescription className="sr-only">
            View and update the status of this order.
        </DialogDescription>
      <div className="gid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus ? orderDetails?.paymentStatus : "pending"}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge className={`w-[80px] px-2 py-2 text-sm
                 ${orderDetails?.orderStatus === 'confirmed' ? "bg-green-500" :
                   orderDetails?.orderStatus === 'rejected' ? "bg-red-500" : "bg-black"}`}>
                   {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator className="mt-5"/>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="mt-5 font-medium">OrderDetails</div>
            <ul className="grid gap-3">
              {
                orderDetails?.cartItems && orderDetails?.cartItems?.length > 0 ? 
                 orderDetails.cartItems.map(item => (
                  <li className="flex items-center justify-between" key={item?.productId}>
                    <span>Title : {item?.title}</span>
                    <span>Quantity : {item?.quantity}</span>
                    <span>Price : ${item?.price}</span>
                  </li>
                 )) : null
              }
            </ul>
          </div>
        </div>
        <div className="grid gap-4 mt-5">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );

};

export default ShoppingOrderDetails;
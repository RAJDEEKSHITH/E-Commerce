import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/features/shop/orderSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const PayPalReturnPage = () => {
const dispatch  = useDispatch();
const location = useLocation();
const params = new URLSearchParams(location.search);
const paymentId = params.get("paymentId");
const payerId = params.get("PayerID");
useEffect(() => {
  if(payerId && paymentId) {
    const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'));
    dispatch(capturePayment({payerId,paymentId,orderId})).then((data) => {
      if(data?.payload?.success) {
        sessionStorage.removeItem('currentOrderId');
        window.location.href="/shop/payment-success";
      }
    })
  }
},[payerId,paymentId,dispatch])


  return (

    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please Wait</CardTitle>
      </CardHeader>
    </Card>

  );

};

export default PayPalReturnPage;
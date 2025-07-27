import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (

    <div>
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">Payment is Successfull!</CardTitle>
      </CardHeader>
      <Button onClick={() => navigate("/shop/account")}
        className="absolute left-10 top-[155px] w-[100px] h-[30px] cursor-pointer"
        >View Orders</Button>
      </Card>
    </div>

  );

};

export default PaymentSuccess;
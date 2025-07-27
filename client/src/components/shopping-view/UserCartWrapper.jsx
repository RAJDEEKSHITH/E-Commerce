import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle,SheetDescription } from "../ui/sheet";
import UserCartItemsContent from "./UserCartItemsContent";

const UserCartWrapper = ({cartItems,setOpenCartSheet}) => {
    const navigate = useNavigate();
    
    const totalCartAmount  = cartItems && cartItems.length > 0 ?
    cartItems.reduce((sum,currentItem) => sum + (
        currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
    )*currentItem?.quantity,0)
    : 0
    

  return (

    <SheetContent className="sm:max-w-md">
        <SheetHeader>
            <SheetTitle>
                Your Cart
            </SheetTitle>
            <SheetDescription className="sr-only">
                List of items in your cart with checkout option.
            </SheetDescription>
        </SheetHeader>
        <div className="nt-8 space-y-4 ">
            {
                cartItems.length > 0 ?
                cartItems.map(item => (
                <UserCartItemsContent setOpenCartSheet={setOpenCartSheet} 
                cartItem={item} key={item.productId}/>)) : null
            }
        </div>
        <div className="mt-8 space-y-4">
            <div className="flex justify-between">
                <span className="font-bold pl-4">Total</span>
                <span className="font-bold pr-4">${totalCartAmount}</span>
            </div>
        </div>
        <Button onClick={() => {
            navigate('/shop/checkout')
            setOpenCartSheet(false)
        }}
        className="w-full mt-6">CheckOut</Button>
    </SheetContent>

  );

};

export default UserCartWrapper;
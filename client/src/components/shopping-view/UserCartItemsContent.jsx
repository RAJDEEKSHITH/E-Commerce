import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/features/shop/cartSlice";
import {toast} from "sonner"


const UserCartItemsContent = ({cartItem}) => {
const dispatch = useDispatch();
const {user} = useSelector(state => state.auth);
const {cartItems} = useSelector(state => state.shopCart);
const {productsList,productDetails} = useSelector(state => state.shopProducts);
const handleCartItemDelete = (getCartItem) => {

  dispatch(deleteCartItem({userId : user?.id,productId : getCartItem?.productId}))
}

function handleUpdateQuantity (getCartItem,typeOfAction) {
  console.log("Clicked", getCartItem, typeOfAction);
  if(typeOfAction === "plus") {
    let getCartItems = cartItems?.items || [];
    if(getCartItems.length) {
    const indexOfCurrentCartItem = getCartItems?.findIndex(item => item.productId === getCartItem?.productId);
    console.log(productsList);
    const getCurrentProductIndex = productsList?.findIndex(product => product._id === getCartItem?.productId);
    const getTotalStock = productsList[getCurrentProductIndex].totalStock;
      if(indexOfCurrentCartItem > -1) {
      const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
        if(getQuantity + 1 > getTotalStock ) {
        toast.warning(`Only ${getQuantity} quantity can be added for this item.`)
        return;
      }
    }
    
  }
  }
  console.log("Dispatching quantity update...");  
  dispatch(updateCartQuantity({
    userId:user?.id, productId: getCartItem?.productId , quantity : 
    typeOfAction === "plus" ?
    getCartItem?.quantity + 1 : getCartItem?.quantity -1
  })).then(data => {
    if(data?.payload?.success) {
      toast.success("cart item is updated successfully")
    }
  })
}

  return (

    <div className="flex items-center space-x-4 pl-4 pr-4">
      <img src={cartItem?.image} alt={cartItem?.title} className="w-20  h-20 rounded object-cover"/>
      <div className="flex-1">
        <h3 className="font-bold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button variant="outline" size="icon" 
          onClick={() => handleUpdateQuantity(cartItem,"minus")}
          disabled = {cartItem?.quantity === 1}
          className="h-8 w-8 rounded-full">
            <Minus className="w-4 h-4"/>
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button variant="outline" size="icon" 
          onClick={() => handleUpdateQuantity(cartItem,"plus")}
          className="h-8 w-8 rounded-full">
            <Plus className="w-4 h-4"/>
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end ">
        <p className="font-semibold">${((
          cartItem?.salePrice > 0  ? cartItem.salePrice : cartItem.price) * cartItem?.quantity).toFixed(2)}
        </p>
        <Trash onClick={() => handleCartItemDelete(cartItem)}
        className="cursor-pointer mt-1" size={20}/>
      </div>
    </div>

  );

};

export default UserCartItemsContent;
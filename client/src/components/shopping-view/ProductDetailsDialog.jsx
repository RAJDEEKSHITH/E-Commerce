import {  Star } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import  { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog"
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/features/shop/cartSlice";
import {toast} from "sonner";
import { setProductDetails } from "@/features/shop/shoppingProductSlice";
import { Label } from "../ui/label";
import StarRating from "../common/StarRating";
import { useEffect, useState } from "react";
import { addreview, getReviews } from "@/features/shop/reviewSlice";
const ProductDetailsDialog = ({open,setOpen,productDetails}) => {
  
  const  dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {cartItems} = useSelector(state => state.shopCart);  
  const {reviews} = useSelector(state => state.shopReview);  
  const [reviewMsg,setReviewMsg] = useState('');
  const [rating,setRating] = useState(0);

  function handleAddToCart (getCurrentProductId,getTotalStock) {
  let getCartItems = cartItems?.items || [];
  if(getCartItems.length) {
    const indexofCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId);
    if(indexofCurrentItem > -1) {
      const getQuantity = getCartItems[indexofCurrentItem].quantity;
      if(getQuantity + 1 > getTotalStock ) {
        toast.warning(`Only ${getQuantity} quantity can be added for this item.`)
        return;
      }
    }
    
  }
  dispatch(addToCart({userId : user?.id, productId : getCurrentProductId, quantity : 1}))
  .then((data) => {
    if(data?.payload?.success) {
      dispatch(fetchCartItems(user?.id));
      toast.success("product added to cart")
    }
  })  
}

function handleDialogClose () {
  setOpen(false);
  dispatch(setProductDetails());
  setRating(0);
  setReviewMsg("");
}
function handleRatingChange (getRating) {
  setRating(getRating)
}
function handleReview () {
  dispatch(addreview({
    productId : productDetails?._id,
    userId : user?.id,
    userName : user?.userName,
    reviewMessage : reviewMsg,
    reviewValue : rating
  })).then((data)=> {
    if(data?.payload?.success) {
      setRating(0);
      setReviewMsg('');
      dispatch(getReviews(productDetails?._id))
      toast.success("Review added successfully")
    }
  });
}

useEffect(() => { 
  if(productDetails !== null) dispatch(getReviews(productDetails?._id))
},[productDetails])

const averageReview = reviews && reviews.length > 0 ?
 reviews.reduce((sum,reviewItem) => sum + reviewItem.reviewValue,0)/reviews.length : 0;

  return (

    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
          <div className="relative overflow-hidden rounded-lg">
              <img src={productDetails?.image} alt={productDetails?.title} 
              width={600} height={600} className="aspect-square w-full object-cover"
              />
          </div>
          <div className=" ">
              <div>
                <DialogTitle>
                  <span className="text-3xl font-semibold">{productDetails?.title}</span>
                </DialogTitle>
                <DialogDescription asChild>
                  <p className="text-muted-foreground text-lg mt-4 mb-5">{productDetails?.description}</p>
                </DialogDescription>
              </div>
              <div className="flex items-center justify-between"> 
                <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>
                  ${productDetails?.price}
                </p>
                {
                  productDetails?.salePrice > 0 ? <p className="text-2xl font-bold text-muted-primary">${productDetails?.salePrice}</p>  : null
                }
              </div>
               <div className="flex items-center gap-0.5 mt-2">
                  <StarRating rating={averageReview}/>
                  <span>({averageReview.toFixed(1)})</span>
                </div>
              <div className="mt-5 mb-5">
                {
                  productDetails?.totalStock === 0 ?
                  <Button className="w-full opacity-60 cursor-not-allowed">Out of Stock</Button> :
                  <Button className="w-full"onClick= {() => handleAddToCart(productDetails?._id,productDetails?.totalStock)}>
                  Add to cart
                 </Button>
                }
              </div>
              <Separator/>
              <div className="max-h-[300px] overflow-auto">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>
                <div className="grid gap-6">
                  {
                    reviews && reviews.length > 0 ? 
                    reviews.map(reviewItem => (
                      <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1 ">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{reviewItem?.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                         <StarRating rating={reviewItem?.reviewValue}/>
                        </div>
                        <p className="text-muted-foreground">{reviewItem?.reviewMessage}</p>
                    </div>
                  </div>
                    ) ) : <h1>No Reviews</h1>
                  }
                </div>
                <div className="mt-10 flex flex-col gap-2">
                  <Label>Write a review</Label>
                  <div className="flex gap-2">
                    <StarRating rating={rating} handleRatingChange={handleRatingChange}/>
                  </div>
                  <Input name="reviewMsg" value={reviewMsg} 
                    onChange={(event) => setReviewMsg(event.target.value)} placeholder="write a review"/>
                  <Button onClick={handleReview}
                  disabled={reviewMsg.trim() === ""}>Submit</Button>
                </div>
              </div>
          </div>
      </DialogContent>
    </Dialog>    
  );
};

export default ProductDetailsDialog;
import ProductDetailsDialog from "@/components/shopping-view/ProductDetailsDialog";
import ShoppingProductTile from "@/components/shopping-view/ShoppingProductTile";
import { Input } from "@/components/ui/input";
import { addToCart, fetchCartItems } from "@/features/shop/cartSlice";
import { getSearchResults, resetSearchResults } from "@/features/shop/searchSlice";
import { fetchProductDetails } from "@/features/shop/shoppingProductSlice";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const SearchProducts = () => {
  const dispatch = useDispatch();
  const [keyword,setKeyword] = useState("");
  const [openDetailsDialog,setOpenDetailsDialog]= useState(false);
  const [searchParams,setSearchParams] = useSearchParams();
  const {searchResults} = useSelector(state => state.shopSearch);
  const {cartItems} = useSelector(state => state.shopCart);
  const {productDetails} = useSelector(state => state.shopProducts);
  const {user} = useSelector(state => state.auth);

  function handleGetProductDetails (getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  useEffect(() => {
    if(keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword))
      }, 1000);
    } else {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(resetSearchResults());
    }
  },[keyword]);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    if(productDetails !== null) setOpenDetailsDialog(true)
  },[productDetails])
  
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

  return (

    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input ref={inputRef}
          value={keyword} name="keyword" onChange={(e)=> setKeyword(e.target.value)}
          placeholder="Search Products..." className="py-6 pr-12"/>
        </div>
      </div>
      {
        !searchResults.length ? <h1 className="text-3xl font-semibold">No Result Found!</h1> : null
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {
          searchResults.map(item => (
            <ShoppingProductTile key={item._id} handleAddToCart={handleAddToCart} product={item}
            handleGetProductDetails={handleGetProductDetails}
            />
          )) 
        }
      </div>
      <ProductDetailsDialog open={openDetailsDialog}
        setOpen={setOpenDetailsDialog} productDetails={productDetails}/> 
    </div>

  );

};

export default SearchProducts;
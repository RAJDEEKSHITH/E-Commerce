import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Footprints, ShirtIcon, WatchIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/features/shop/shoppingProductSlice";
import ShoppingProductTile from "@/components/shopping-view/ShoppingProductTile";
import { toast } from "sonner";

import nikeIcon from "../../assets/nike.png";
import adidasIcon from "../../assets/adidas.png";
import pumaIcon from "../../assets/puma.png";
import zaraIcon from "../../assets/zara.png";
import handmIcon from "../../assets/h&m.png";
import levisIcon from "../../assets/levis.png"
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/features/shop/cartSlice";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetailsDialog";



const ShoppingHome = () => {
  const categoriesWithIcon =[
    {id : "men",label:"Men",icon : ShirtIcon},
    {id : "women",label:"Women", icon : CloudLightning},
    {id : "kids",label:"Kids",icon : BabyIcon},
    {id : "accessories",label:"Accessories", icon : WatchIcon},
    {id : "footwear",label:"Footwear",icon : Footprints},
  ];

  const brandsWithIcon = [
    {id : "nike", label : "Nike", icon : nikeIcon},
    {id : "adidas", label : "Adidas", icon : adidasIcon},
    {id : "puma", label : "Puma", icon : pumaIcon},
    {id : "levi", label : "Levi's", icon : levisIcon},
    {id : "zara", label : "Zara", icon : zaraIcon},
    {id : "h&m", label : "H&M", icon : handmIcon}
  ]

  const { productsList,productDetails } = useSelector(state => state.shopProducts);
  const [openDetailsDialog,setOpenDetailsDialog] = useState(false);

  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

const slides = [bannerOne,bannerTwo,bannerThree];

function handleNavigateToListingPage (getCurrentItem,section) {
  sessionStorage.removeItem("filters");
  const currentFilter = {
    [section] : [getCurrentItem.id]
  }

  sessionStorage.setItem('filters',JSON.stringify(currentFilter))
  navigate('/shop/listing')

}

function handleGetProductDetails (getCurrentProductId) {
  dispatch(fetchProductDetails(getCurrentProductId))
}

function handleAddToCart (getCurrentProductId) {
  dispatch(addToCart({userId : user?.id, productId : getCurrentProductId, quantity : 1}))
  .then((data) => {
    if(data?.payload?.success) {
      dispatch(fetchCartItems(user?.id));
      toast.success("product added to cart")
    }
  })  
}

const [currentSlide,setCurrentSlide] = useState(0);

// useEffect(() => {
//   const timer = setInterval(()=> {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
//   },5000)
//   return () => clearInterval(timer);
// },[])

useEffect(() => {
  if(productDetails !== null) setOpenDetailsDialog(true)
},[productDetails])

useEffect(() => {
  dispatch(fetchAllFilteredProducts({filterParams : {}, sortParams : "price-lowtohigh"}))
},[dispatch])

  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {
          slides.map((slide,index) => ( <img 
          src = {slide}
          key = {index}
          className={`${index === currentSlide ? 'opacity-100' : "opacity-0" } absolute top-0 left-0 w-full h-full 
            object-cover transition-opacity duration-1000 z-0`}
          />

        ))}
        <Button variant="outline" size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-10"
        onClick={() => setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length ) % slides.length)}
        >
          <ChevronLeftIcon className="w-4 h-4"/>
        </Button>

        <Button variant="outline" size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 z-10"
        onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1 + slides.length ) % slides.length)}
        >
          <ChevronRightIcon className="w-4 h-4"/>
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Shop by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {
              categoriesWithIcon.map((categoryItem)=> {
              const CategoryIcon = categoryItem.icon;
               return  (
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" key={categoryItem.id}
                onClick={() => handleNavigateToListingPage(categoryItem,"category")}
                > 
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <CategoryIcon className="w-12 h-12 mb-4 text-primary" />
                      <span className="font-bold">{categoryItem.label}</span>
                    </CardContent>
                </Card>
              )})
            }
          </div>
        </div>
      </section>

       <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {
              brandsWithIcon.map((brandItem)=> {
              const BrandIcon = brandItem.icon;
               return  (
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem,"brand")}
                > 
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <img src={BrandIcon} className="w-18 h-18 mb-4 text-primary"/>
                      <span className="font-bold">{brandItem.label}</span>
                    </CardContent>
                </Card>
              )})
            }
          </div>
        </div>
      </section>

      <section className="py-12 ">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
              {
                productsList && productsList.length > 0 ? 
                (
                  productsList.map((productItem) => (
                    <ShoppingProductTile 
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                    product={productItem} key={productItem._id}/>
                  ))
                ) : null
              }
            </div>
        </div>
      </section>
           <ProductDetailsDialog open={openDetailsDialog}
           setOpen={setOpenDetailsDialog} productDetails={productDetails}/> 
    </div>

  );

};

export default ShoppingHome;



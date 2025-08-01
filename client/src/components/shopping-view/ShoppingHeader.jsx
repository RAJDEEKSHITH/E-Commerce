import { House, LogOut, Menu, ShoppingCart, UserRoundCheck } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { categoryOptionsMap, shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
           DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { loginOutUser, resetTokenAndCredentials } from "@/features/auth/authSlice";
import UserCartWrapper from "./UserCartWrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/features/shop/cartSlice";
import { Label } from "../ui/label";



function MenuItems () {

const navigate = useNavigate();
const location = useLocation();
const [searchParams,setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }


  return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row ">
          {
            shoppingViewHeaderMenuItems.map(menuItem => (
            <Label onClick={() => handleNavigate(menuItem)}
               key={menuItem.id}  className="text-sm font-medium cursor-pointer">{menuItem.label}
            </Label>
            ))
          }
        </nav>
}

function HeaderRightContent () {
  const {user} = useSelector(state => state.auth);
  const {cartItems} = useSelector(state => state.shopCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout () {
    // dispatch(loginOutUser());
    dispatch(resetTokenAndCredentials())
    localStorage.clear();
    navigate("/auth/login");
  }

  useEffect(() => {
    if(user?.id) {
    dispatch(fetchCartItems(user?.id)); 
    }
  },[dispatch,user?.id])

  const [openCartSheet, setOpenCartSheet] = useState(false);

  return <div className="flex lg:items-center lg:flex-row flex-col gap-4 ">
            <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
              <Button variant="outline" size="icon" onClick= {() => setOpenCartSheet(true)} className="relative">
                <ShoppingCart className="h-6 w-6"/>
                <span className="absolute top-[-2px] right-[2px] font-bold text-sm">{cartItems?.items?.length || 0}</span>
                <span className="sr-only">User Cart</span>
              </Button>
              <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={ cartItems && cartItems.items &&
                cartItems?.items.length > 0  ? cartItems.items : []}/>
            </Sheet>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="bg-black">
                     <AvatarFallback className="bg-black text-white font-extrabold">
                      {user?.userName[0]?.toUpperCase()}
                     </AvatarFallback> 
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="w-56">
                    <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                           <UserRoundCheck className="mr-2 h-4 w-4"/>Account
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                           <LogOut className="mr-2 h-4 w-4"/>Logout
                        </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
         </div>
}

const ShoppingHeader = () => {
  const {isAuthenticated} = useSelector(state => state.auth)

  return (

    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
        <House className="h-6 w-6"/>
        <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6"/>
            <span className="sr-only">Toggle Header Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-xs">
            <SheetTitle className="sr-only">Main Menu</SheetTitle>
            <SheetDescription className="sr-only">Navigate through shopping sections</SheetDescription>
             <MenuItems/>
             <HeaderRightContent/> 
        </SheetContent >
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems/>
        </div>
          <div className="hidden lg:block">
            <HeaderRightContent/>
          </div> 
      </div>
    </header>

  );

};

export default ShoppingHeader;
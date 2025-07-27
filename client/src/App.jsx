import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminDashBoard from "./pages/admin-view/AdminDashBoard";
import AdminProducts from "./pages/admin-view/AdminProducts";
import AdminOrders from "./pages/admin-view/AdminOrders";
import AdminFeatures from "./pages/admin-view/AdminFeatures";
import NotFound from "./pages/not-found/NotFound";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import ShoppingHome from "./pages/shopping-view/ShoppingHome";
import ProductsListing from "./pages/shopping-view/ShoppingListing";
import AccountPage from "./pages/shopping-view/AccountPage";
import Checkout from "./pages/shopping-view/ShoppingCheckout";
import CheckAuth from "./components/common/CheckAuth";
import UnAuthPage from "./pages/unauth-page/UnAuthPage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./features/auth/authSlice";
import { Skeleton } from "@/components/ui/skeleton"
import PayPalReturnPage from "./pages/shopping-view/PayPalReturnPage";
import PaymentSuccess from "./pages/shopping-view/PaymentSuccess";
import { Toaster } from "./components/ui/sonner";
import SearchProducts from "./pages/shopping-view/SearchProducts";



const App = () => {


  const {user,isAuthenticated,isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(checkAuth())
  },[dispatch]);


  if(isLoading) {
    return <Skeleton className="w-[800px] bg-black h-[600px]" />
  }

  return (

    <div className="flex flex-col overflow-hidden bg-white">
      <Toaster />
      <Routes>

       {/* Redirect root '/' to '/auth/login' */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>      
          </CheckAuth>
        }> 
         {/* /auth is the parent route for login,register. because /auth route will be same for both children routes. */}


          <Route path="login" element={<AuthLogin/>}/>
          <Route path="register" element={<AuthRegister/>}/>
        </Route>


        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
        }>

          <Route path="dashboard" element={<AdminDashBoard/>}/>
          <Route path="products" element={<AdminProducts/>}/>
          <Route path="orders" element={<AdminOrders/>}/>
          <Route path="features" element={<AdminFeatures/>}/>

        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
        }>
        
          <Route path="home" element={<ShoppingHome/>}/>
          <Route path="listing" element={<ProductsListing/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="account" element={<AccountPage/>}/>
          <Route path="paypal-return" element={<PayPalReturnPage/>}/>
          <Route path="payment-success" element={<PaymentSuccess/>}/>
          <Route path="search" element={<SearchProducts/>}/>
        
        </Route>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/unauth-page"  element={<UnAuthPage/>}/>
        

      </Routes>
    </div>

  );

};

export default App;
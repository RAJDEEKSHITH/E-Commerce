import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./features/auth/authSlice";
import { Toaster } from "./components/ui/sonner";
import PageLoader from "./components/common/PageLoader";
import CheckAuth from "./components/common/CheckAuth";

// 🔹 Lazy loaded components
const AuthLayout = lazy(() => import("./components/auth/AuthLayout"));
const AuthLogin = lazy(() => import("./pages/auth/AuthLogin"));
const AuthRegister = lazy(() => import("./pages/auth/AuthRegister"));

const AdminLayout = lazy(() => import("./components/admin-view/AdminLayout"));
const AdminDashBoard = lazy(() => import("./pages/admin-view/AdminDashBoard"));
const AdminProducts = lazy(() => import("./pages/admin-view/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/admin-view/AdminOrders"));
const AdminFeatures = lazy(() => import("./pages/admin-view/AdminFeatures"));

const ShoppingLayout = lazy(() => import("./components/shopping-view/ShoppingLayout"));
const ShoppingHome = lazy(() => import("./pages/shopping-view/ShoppingHome"));
const ProductsListing = lazy(() => import("./pages/shopping-view/ShoppingListing"));
const AccountPage = lazy(() => import("./pages/shopping-view/AccountPage"));
const Checkout = lazy(() => import("./pages/shopping-view/ShoppingCheckout"));
const PayPalReturnPage = lazy(() => import("./pages/shopping-view/PayPalReturnPage"));
const PaymentSuccess = lazy(() => import("./pages/shopping-view/PaymentSuccess"));
const SearchProducts = lazy(() => import("./pages/shopping-view/SearchProducts"));

const UnAuthPage = lazy(() => import("./pages/unauth-page/UnAuthPage"));
const NotFound = lazy(() => import("./pages/not-found/NotFound"));

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    dispatch(checkAuth(token));
  }, [dispatch]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Toaster />
      {/* 🔸 Suspense wraps all routes to show fallback while loading chunks */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/auth/login" replace />} />

          {/* Auth routes */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<AdminDashBoard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="features" element={<AdminFeatures />} />
          </Route>

          {/* Shopping routes */}
          <Route
            path="/shop"
            element={
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            }
          >
            <Route path="home" element={<ShoppingHome />} />
            <Route path="listing" element={<ProductsListing />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="paypal-return" element={<PayPalReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="search" element={<SearchProducts />} />
          </Route>

          {/* Common */}
          <Route path="/unauth-page" element={<UnAuthPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;

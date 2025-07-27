import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice.js"
import adminProductsSlice from "../features/admin/productsSlice.js"
import adminOrderSlice from "../features/admin/orderSlice.js";
import shoppingProductsSlice from "../features/shop/shoppingProductSlice.js"
import shopCartSlice from "../features/shop/cartSlice.js"
import shopAddressSlice from "../features/shop/addressSlice.js"
import shopOrderSlice from "../features/shop/orderSlice.js";
import shopSearchSlice from "../features/shop/searchSlice.js";
import shopReviewSlice from "../features/shop/reviewSlice.js";
import commonFeatureSlice from "../features/common/commonSlice.js";

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductsSlice,
        shopProducts : shoppingProductsSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
        shopOrder : shopOrderSlice,
        adminOrder : adminOrderSlice,
        shopSearch: shopSearchSlice,
        shopReview : shopReviewSlice,
        commonFeature : commonFeatureSlice
    }
});

export default store;
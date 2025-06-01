import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice.js"
import adminProductsSlice from "../features/admin/productsSlice"
import shoppingProductsSlice from "../features/shop/shoppingProductSlice"



const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts : adminProductsSlice,
        shopProducts : shoppingProductsSlice
    }
});

export default store;
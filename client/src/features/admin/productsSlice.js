import { createAsyncThunk } from '@reduxjs/toolkit';
import{createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading : false,
    productsList : []
};

export const addNewProduct = createAsyncThunk("/products/addnewproduct",
    async (formData) => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`,formData,{
            headers : {
                "Content-Type" : "application/json"
            }
        });
        return result?.data
    }

);

export const fetchAllProducts = createAsyncThunk("/products/fetchAllProducts",
    async () => {
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products/get`);
        return result?.data
    }

);

export const editProduct = createAsyncThunk("/products/editProduct",
    async ({id,formData}) => {
        const result = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,formData,{
            headers : {
                "Content-Type" : "application/json"
            }
        });
        return result?.data
    }

);

export const deleteProduct = createAsyncThunk("/products/deleteProduct",
    async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`,{
            headers : {
                "Content-Type" : "application/json"
            }
        });
        return result?.data
    }
);

const AdminProductsSlice = createSlice({
    name : "adminProducts",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllProducts.pending,(state) => {
            state.isLoading = true;
            
        })
        .addCase(fetchAllProducts.fulfilled,(state,action) => {
            state.isLoading = false;
            state.productsList = action.payload.data;
        })
        .addCase(fetchAllProducts.rejected,(state) => {
            state.isLoading = false;
            state.productsList = [];
        })

    }
})

export default AdminProductsSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getSearchResults= createAsyncThunk("/order/getSearchResults",
    async(keyword) => {
    const response = await axios.get(`http://localhost:5000/api/shop/search/get/${keyword}`);
    return response.data;
})

const initialState = {
    isLoading : false,
    searchResults : []
}
const searchSlice = createSlice({
    name:"searchSlice",
    initialState,
    reducers : {
        resetSearchResults : (state) => {
            state.searchResults = [];
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getSearchResults.pending, (state) => {
            state.isLoading = true;
            
        })
        .addCase(getSearchResults.fulfilled, (state,action) => {
            state.isLoading = false;
            state.searchResults = action.payload.data;
        })
        .addCase(getSearchResults.rejected, (state) => {
            state.isLoading = false;
            state.searchResults = [];
        })
    }

})
export const {resetSearchResults} = searchSlice.actions;
export default searchSlice.reducer;
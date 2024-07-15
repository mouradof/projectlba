import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get(`http://localhost:5100/api/products`)
    return response.data
})

export const createProduct = createAsyncThunk("products/createProduct", async (product) => {
    const response = await axios.post(`http://localhost:5100/api/products`, product)
    return response.data
})

export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, product }) => {
    const response = await axios.put(`http://localhost:5100/api/products/${id}`, product)
    return response.data
})

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
    await axios.delete(`http://localhost:5100/api/products/${id}`)
    return id
})

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(product => product._id === action.payload._id)
                state.items[index] = action.payload
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(product => product._id !== action.payload)
            })
    },
})

export default productSlice.reducer

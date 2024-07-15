import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = createAsyncThunk('user/registerUser', async (userData) => {
    const response = await axios.post(`http://localhost:5100/api/users/register`, userData);
    return response.data;
});

export const loginUser = createAsyncThunk('user/loginUser', async (userData) => {
    const response = await axios.post(`http://localhost:5100/api/users/login`, userData);
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.userInfo = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

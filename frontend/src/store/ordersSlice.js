import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId) => {
    const response = await axios.get(`${API_URL}/orders/${userId}`);
    return response.data;
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData) => {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default ordersSlice.reducer;
import api from '@/api/axios';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCarts = createAsyncThunk('cart/fetchCarts', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`${import.meta.env.VITE_API_URL}/api/cart/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const createCart = createAsyncThunk(
  'cart/createCart',
  async (cartData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${import.meta.env.VITE_API_URL}/api/cart/add/`, cartData);
      return response.data; // return the created cart data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create cart');
    }
  }
);

export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`${import.meta.env.VITE_API_URL}/api/cart/remove/${id}/`);
      dispatch(fetchCarts());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete cart');
    }
  }
);

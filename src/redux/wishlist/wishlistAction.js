import api from '@/api/axios';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createWishlist = createAsyncThunk(
  'wishlist/createWishlist',
  async (wishlistData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/wishlist/add/`,
        wishlistData
      );
      return response.data; // return the created wishlist data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create wishlist');
    }
  }
);

export const moveToCart = createAsyncThunk(
  'wishlist/moveToCart',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/wishlist/move-to-cart/${id}/`
      );
      dispatch(fetchWishlist());
      return response.data; // return the created wishlist data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create wishlist');
    }
  }
);

export const deleteWishlist = createAsyncThunk(
  'wishlist/deleteWishlist',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/api/wishlist/remove/${id}/`
      );
      dispatch(fetchWishlist());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete wishlist');
    }
  }
);

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/api/wishlist/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

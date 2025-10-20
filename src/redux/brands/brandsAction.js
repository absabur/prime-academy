import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/brands/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

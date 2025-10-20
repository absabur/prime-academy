import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSeos = createAsyncThunk(
  'seos/fetchSeos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/seo/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

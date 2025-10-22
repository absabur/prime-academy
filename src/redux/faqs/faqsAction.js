import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFaqs = createAsyncThunk(
  'faq/fetchFaqs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/api/faqs/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

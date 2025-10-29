import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ currentPage, pageSize, search }, { rejectWithValue }) => {
    try {
      const searchParams = search ? `&search=${search}` : '';
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/contact/?page=${currentPage}&page_size=${pageSize}${searchParams}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

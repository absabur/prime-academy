import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';

export const fetchOverView = createAsyncThunk(
  'overview/fetchOverview',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/api/dashboard/overview/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchImgIconContents = createAsyncThunk(
  'imgIconContent/fetchImgIconContents',
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/content-sections/by-page/${page}/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

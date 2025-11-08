import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFooters = createAsyncThunk(
  'footer/fetchFooters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/footer/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchFootersAdmin = createAsyncThunk(
  'footer/fetchFootersAdmin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/api/footer/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const updateFooter = createAsyncThunk(
  'footer/updateFooter',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/footer/update/`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Something went wrong');
    }
  }
);

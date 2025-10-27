import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/api/brands/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const updateBrand = createAsyncThunk(
  'brands/updateBrand',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.patch(`${import.meta.env.VITE_API_URL}/api/brands/${id}/`, data);
      dispatch(fetchBrands());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const createBrand = createAsyncThunk(
  'brands/createBrand',
  async (data, { rejectWithValue, dispatch }) => {
    console.log(data);
    try {
      const response = await api.post(`${import.meta.env.VITE_API_URL}/api/brands/`, data);
      dispatch(fetchBrands());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const deleteBrand = createAsyncThunk(
  'brands/deleteBrand',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`${import.meta.env.VITE_API_URL}/api/brands/${id}/`);
      dispatch(fetchBrands());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

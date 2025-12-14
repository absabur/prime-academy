import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBrands = createAsyncThunk(
  'brands/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/brands/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchBrandsAdmin = createAsyncThunk(
  'brands/fetchBrandsAdmin',
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
      dispatch(fetchBrandsAdmin());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const createBrand = createAsyncThunk(
  'brands/createBrand',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(`${import.meta.env.VITE_API_URL}/api/brands/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Optional
        },
      });
      dispatch(fetchBrands());
      dispatch(fetchBrandsAdmin());
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
      dispatch(fetchBrandsAdmin());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

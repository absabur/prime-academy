import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDepartments = createAsyncThunk(
  'department/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/api/departments/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchSingleDepartment = createAsyncThunk(
  'department/fetchSingleDepartment',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/api/departments/${id}/`);
      return response.data; // the department data
    } catch (error) {
      // handle network or API errors
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createDepartment = createAsyncThunk(
  'department/createDepartment',
  async (departmentData, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/departments/`,
        departmentData
      );
      dispatch(fetchDepartments());
      return response.data; // return the created department data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create department');
    }
  }
);

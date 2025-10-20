import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudents = createAsyncThunk(
  'student/fetchStudents',
  async ({ page = 1, page_size = 10, search = null, order = null }, { rejectWithValue }) => {
    try {
      const searchParam = search ? `&search=${search}` : '';
      const orderParams = order ? `&ordering=${order}` : '';
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/admin/students/?page=${page}&page_size=${page_size}${searchParam}${orderParams}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchSingleStudent = createAsyncThunk(
  'student/fetchSingleStudent',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/students/${id}/`);
      return response.data; // the student data
    } catch (error) {
      // handle network or API errors
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

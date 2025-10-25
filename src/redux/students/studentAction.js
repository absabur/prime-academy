import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
      const response = await api.get(`${import.meta.env.VITE_API_URL}/api/admin/students/${id}/`);
      return response.data; // the student data
    } catch (error) {
      // handle network or API errors
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createStudent = createAsyncThunk(
  'student/createStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/admin/students/`,
        studentData
      );
      return response.data; // return the created student data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create student');
    }
  }
);

export const updateStudent = createAsyncThunk(
  'student/updateStudent',
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/students/${id}/`,
        studentData
      );
      return response.data; // return the updated student data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update student');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'student/deleteStudent',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/students/${id}/`
      );
      return response; // return the deleted student's id
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete student');
    }
  }
);

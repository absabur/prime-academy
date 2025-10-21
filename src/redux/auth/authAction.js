import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// 🔹 Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    let route;
    if (credentials.role == 'student') {
      route = '/api/students/login/';
    } else if (credentials.role == 'teacher') {
      route = '/api/teachers/login/';
    } else if (credentials.role == 'admin') {
      route = '/api/admin/login/';
    } else if (credentials.role == 'stuff') {
      route = '/api/staff/login/';
    }

    try {
      const res = await api.post(route, credentials);
      return res.data; // success
    } catch (err) {
      // capture API error message
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data); // pass backend error
      } else {
        return rejectWithValue(err.message); // fallback
      }
    }
  }
);

// 🔹 Register Student
export const registerStudent = createAsyncThunk(
  'auth/registerStudent',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/students/register/', credentials);
      return res.data; // success
    } catch (err) {
      // capture API error message
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data); // pass backend error
      } else {
        return rejectWithValue(err.message); // fallback
      }
    }
  }
);

// 🔹 Register Student
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ token }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/verify-student/?token=${token}`);
      return res.data; // success
    } catch (err) {
      // capture API error message
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data); // pass backend error
      } else {
        return rejectWithValue(err.message); // fallback
      }
    }
  }
);

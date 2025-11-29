import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import axios from 'axios';

// 🔹 Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    let route;
    if (credentials.role == 'teacher') {
      route = '/api/teachers/login/';
    } else if (credentials.role == 'admin') {
      route = '/api/admin/login/';
    } else if (credentials.role == 'stuff') {
      route = '/api/staff/login/';
    } else {
      route = '/api/students/login/';
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}${route}`, credentials, {
        withCredentials: true,
      });
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
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/students/register/`,
        credentials,
        {
          withCredentials: true,
        }
      );
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
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/verify-student/?token=${token}`,
        {
          withCredentials: true,
        }
      );
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

// 🔹 Forgot password Student
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/students/reset-password/`,
        credentials
      );
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

// 🔹 Forgot password Student
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ new_password, new_password2, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/students/reset-password-confirm/?token=${token}`,
        {
          new_password,
          new_password2,
        }
      );
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

// 🔹 userProfile data
export const userProfile = createAsyncThunk('auth/userProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get(`${import.meta.env.VITE_API_URL}/api/profile/`);
    return res.data; // success
  } catch (err) {
    // capture API error message
    if (err.response && err.response.data) {
      return rejectWithValue(err.response.data); // pass backend error
    } else {
      return rejectWithValue(err.message); // fallback
    }
  }
});

// 🔹 userProfile data
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.patch(`${import.meta.env.VITE_API_URL}/api/profile/`, data);
      dispatch(userProfile());
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

// 🔹 Forgot password Student
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ new_password, new_password2, old_password, role }, { rejectWithValue }) => {
    try {
      let route;
      if (role.toLowerCase() == 'student') {
        route = '/api/students/change-password/';
      } else if (role.toLowerCase() == 'teacher') {
        route = '/api/teachers/change-password/';
      } else if (role.toLowerCase() == 'admin') {
        route = '/api/admin/change-password/';
      }
      const res = await api.post(`${import.meta.env.VITE_API_URL}${route}`, {
        old_password,
        new_password,
        new_password2,
      });
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

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchImgIconContents = createAsyncThunk(
  'imgIconContent/fetchImgIconContents',
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/content-sections/by-page/${page}/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchOurValues = createAsyncThunk(
  'imgIconContent/fetchOurValues',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/our-values/contents/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchAcademyOverview = createAsyncThunk(
  'imgIconContent/fetchAcademyOverview',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/academy-overview/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

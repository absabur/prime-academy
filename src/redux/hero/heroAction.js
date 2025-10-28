import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHeros = createAsyncThunk('heros/fetchHeros', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`${import.meta.env.VITE_API_URL}/api/hero/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const updateHero = createAsyncThunk(
  'heros/updateHero',
  async ({ id, value }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.patch(`${import.meta.env.VITE_API_URL}/api/hero/${id}/`, value);
      dispatch(fetchHeros());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

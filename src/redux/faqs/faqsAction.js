import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFaqs = createAsyncThunk('faq/fetchFaqs', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`${import.meta.env.VITE_API_URL}/api/faqs/`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const addFaqs = createAsyncThunk(
  'faq/addFaqs',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(`${import.meta.env.VITE_API_URL}/api/faqs/`, data);
      dispatch(fetchFaqs());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const editFaq = createAsyncThunk(
  'faq/editFaq',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.patch(`${import.meta.env.VITE_API_URL}/api/faqs/${id}/`, data);
      dispatch(fetchFaqs());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const updateFaqCategoryOrder = createAsyncThunk(
  'faq/updateFaqCategoryOrder',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      let response;
      for (let da of data) {
        response = await api.patch(`${import.meta.env.VITE_API_URL}/api/faqs/${da.id}/`, da);
      }
      dispatch(fetchFaqs());
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'faq/deleteCategory',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`${import.meta.env.VITE_API_URL}/api/faqs/${id}/`);
      dispatch(fetchFaqs());
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

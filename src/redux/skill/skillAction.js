import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSkills = createAsyncThunk(
  'skill/fetchSkills',
  async (
    { page = 1, page_size = 10, search = null, order = null, isActive = null },
    { rejectWithValue }
  ) => {
    try {
      const searchParam = search ? `&search=${search}` : '';
      const orderParams = order ? `&ordering=${order}` : '';
      const currentPage = page ? `page=${page}` : '';
      const pageSize = page_size ? `&page_size=${page_size}` : '';
      const isActiveParams = isActive ? `&is_active=${isActive}` : '';

      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/skills/?${currentPage}${pageSize}${searchParam}${orderParams}${isActiveParams}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchSingleSkill = createAsyncThunk(
  'skill/fetchSingleSkill',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/api/skills/${id}/`);
      return response.data; // the skill data
    } catch (error) {
      // handle network or API errors
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createSkill = createAsyncThunk(
  'skill/createSkill',
  async (skillData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${import.meta.env.VITE_API_URL}/api/skills/`, skillData);
      return response.data; // return the created skill data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create skill');
    }
  }
);

export const updateSkill = createAsyncThunk(
  'skill/updateSkill',
  async ({ id, skillData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/skills/${id}/`,
        skillData
      );
      return response.data; // return the updated skill data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update skill');
    }
  }
);

export const deleteSkill = createAsyncThunk(
  'skill/deleteSkill',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${import.meta.env.VITE_API_URL}/api/skills/${id}/`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete skill');
    }
  }
);

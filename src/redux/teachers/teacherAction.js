import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTeachers = createAsyncThunk(
  'teacher/fetchTeachers',
  async (
    {
      page = 1,
      page_size = 10,
      search = null,
      order = null,
      date_joined_before = null,
      date_joined_after = null,
      is_enabled = null,
    },
    { rejectWithValue }
  ) => {
    try {
      const searchParam = search ? `&search=${search}` : '';
      const orderParams = order ? `&ordering=${order}` : '';
      const joinedBefore = date_joined_before ? `&date_joined_before=${date_joined_before}` : '';
      const joinedAfter = date_joined_after ? `&date_joined_after=${date_joined_after}` : '';
      const isEnable = is_enabled ? `&is_enabled=${is_enabled}` : '';

      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/admin/teachers/?ppage=${page}&page_size=${page_size}${searchParam}${orderParams}${joinedBefore}${joinedAfter}${isEnable}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchSingleTeacher = createAsyncThunk(
  'teacher/fetchSingleTeacher',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/api/admin/teachers/${id}/`);
      return response.data; // the teacher data
    } catch (error) {
      // handle network or API errors
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTeacher = createAsyncThunk(
  'teacher/createTeacher',
  async (teacherData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/admin/teachers/`,
        teacherData
      );
      return response.data; // return the created teacher data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create teacher');
    }
  }
);

export const updateTeacher = createAsyncThunk(
  'teacher/updateTeacher',
  async ({ id, teacherData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/teachers/${id}/`,
        teacherData
      );
      return response.data; // return the updated teacher data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update teacher');
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  'teacher/deleteTeacher',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/teachers/${id}/`
      );
      return response; // return the deleted teacher's id
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete teacher');
    }
  }
);

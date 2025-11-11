import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCourseCategories = createAsyncThunk(
  'course/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/course-categories/?is_active=true`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async ({ category = null, page = 1, page_size = 10, search = null }, { rejectWithValue }) => {
    try {
      const categoryParam = category ? `&category=${category}` : '';
      const searchParam = search ? `&search=${search}` : '';
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/courses/?status=published&page=${page}&page_size=${page_size}${categoryParam}${searchParam}&is_active=true`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchOurCourses = createAsyncThunk(
  'course/fetchOurCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/courses/home-categories/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchMegaCourses = createAsyncThunk(
  'course/fetchMegaCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses/megamenu-nav/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchSingleCourse = createAsyncThunk(
  'course/fetchSingleCourse',
  async (courseIdOrSlug, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/courses/${courseIdOrSlug}/`
      );
      return response.data; // the course data
    } catch (error) {
      // handle network or API errors
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

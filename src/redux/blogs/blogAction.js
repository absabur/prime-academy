import api from '@/api/axios';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBlogCategories = createAsyncThunk(
  'blog/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog-categories/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addBlogCategories = createAsyncThunk(
  'blog/addCategories',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post(`${import.meta.env.VITE_API_URL}/api/blog-categories/`, data);
      dispatch(fetchBlogCategories());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async (
    { category = null, page = 1, page_size = 10, search = null, order = null },
    { rejectWithValue }
  ) => {
    try {
      const categoryParam = category ? `&category=${category}` : '';
      const searchParam = search ? `&search=${search}` : '';
      const orderParams = order ? `&ordering=${order}` : '';

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/?page=${page}&page_size=${page_size}&status=published${categoryParam}${searchParam}${orderParams}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchBlogsAdmin = createAsyncThunk(
  'blog/fetchBlogsAdmin',
  async (
    { category = null, page = 1, page_size = 10, search = null, order = null },
    { rejectWithValue }
  ) => {
    try {
      const categoryParam = category ? `&category=${category}` : '';
      const searchParam = search ? `&search=${search}` : '';
      const orderParams = order ? `&ordering=${order}` : '';

      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/?page=${page}&page_size=${page_size}&status=published${categoryParam}${searchParam}${orderParams}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchLatestBlogs = createAsyncThunk(
  'blog/fetchLatestBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/latest/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchSingleBlog = createAsyncThunk(
  'blog/fetchSingleBlog',
  async (blogIdOrSlug, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/blogs/${blogIdOrSlug}/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addBlog = createAsyncThunk('blog/addBlog', async (formData, { rejectWithValue }) => {
  try {
    const response = await api.post(`${import.meta.env.VITE_API_URL}/api/blogs/`, formData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const editBlog = createAsyncThunk(
  'blog/editBlog',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}/`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (
    { currentPage, pageSize, search, order, created_at_after = null, created_at_before = null },
    { rejectWithValue }
  ) => {
    try {
      const searchParams = search ? `&search=${search}` : '';
      const orderParams = order ? `&ordering=${order}` : '';
      const createdAtAfter = created_at_after ? `&created_at_after=${created_at_after}` : '';
      const createdAtBefore = created_at_before ? `&created_at_before=${created_at_before}` : '';
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/contact/?page=${currentPage}&page_size=${pageSize}${searchParams}${orderParams}${createdAtAfter}${createdAtBefore}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

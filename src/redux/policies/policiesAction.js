import api from '@/api/axios';
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPolicies = createAsyncThunk(
  'policies/fetchPolicies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/policy-pages/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const createPolicy = createAsyncThunk(
  'policy/createPolicy',
  async (policyData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/policy-pages/`,
        policyData
      );
      return response.data; // return the created policy data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create policy');
    }
  }
);

export const updatePolicy = createAsyncThunk(
  'policy/updatePolicy',
  async ({ id, policyData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/policy-pages/${id}/`,
        policyData
      );
      return response.data; // return the updated policy data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update policy');
    }
  }
);

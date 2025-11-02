import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async (
    { search = null, order = null, department = null, isActive = null },
    { rejectWithValue }
  ) => {
    try {
      const searchParam = search ? `&search=${search}` : '';
      const orderParams = order ? `&ordering=${order}` : '';
      const departmentParams = department ? `&department=${department}` : '';
      const isActiveParams = isActive ? `&is_active=${isActive}` : '';
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/employees/?${searchParam}${orderParams}${departmentParams}${isActiveParams}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const fetchSingleEmployee = createAsyncThunk(
  'employee/fetchSingleEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${import.meta.env.VITE_API_URL}/api/employees/${id}/`);
      return response.data; // the employee data
    } catch (error) {
      // handle network or API errors
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/employees/`,
        employeeData
      );
      return response.data; // return the created employee data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create employee');
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/employees/${id}/`,
        employeeData
      );
      return response.data; // return the updated employee data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update employee');
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${import.meta.env.VITE_API_URL}/api/employees/${id}/`);
      return response; // return the deleted employee's id
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete employee');
    }
  }
);

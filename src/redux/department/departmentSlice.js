import { createSlice } from '@reduxjs/toolkit';
import { createDepartment, fetchDepartments, fetchSingleDepartment } from './departmentAction';

const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    departments: [],
    department: {},
    loadingDepartments: true,
    loadingDepartment: true,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Departments
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loadingDepartments = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loadingDepartments = false;
        state.departments = action.payload.data.results;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loadingDepartments = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    //single department
    builder
      .addCase(fetchSingleDepartment.pending, (state) => {
        state.loadingDepartment = true;
        state.error = null;
      })
      .addCase(fetchSingleDepartment.fulfilled, (state, action) => {
        state.loadingDepartment = false;
        state.department = action.payload.data.results; // store single department
      })
      .addCase(fetchSingleDepartment.rejected, (state, action) => {
        state.loadingDepartment = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    // create department
    builder
      .addCase(createDepartment.pending, (state) => {
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.message = 'Department created successfully';
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.error = action.payload?.message ? action.payload?.message : action.payload.message;
      });
  },
});

export const { clearMessage, clearError } = departmentSlice.actions;
export default departmentSlice.reducer;

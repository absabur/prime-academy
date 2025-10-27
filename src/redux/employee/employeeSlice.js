import { createSlice } from '@reduxjs/toolkit';
import {
  fetchEmployees,
  fetchSingleEmployee,
  deleteEmployee,
  createEmployee,
  updateEmployee,
} from './employeeAction';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    employee: {},
    loadingEmployees: true,
    loadingEmployee: true,
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
    // Employees
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loadingEmployees = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loadingEmployees = false;
        state.employees = action.payload.data.results;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loadingEmployees = false;
        state.error = action.payload;
      });
    //single employee
    builder
      .addCase(fetchSingleEmployee.pending, (state) => {
        state.loadingEmployee = true;
        state.error = null;
      })
      .addCase(fetchSingleEmployee.fulfilled, (state, action) => {
        state.loadingEmployee = false;
        state.employee = action.payload.data; // store single employee
      })
      .addCase(fetchSingleEmployee.rejected, (state, action) => {
        state.loadingEmployee = false;
        state.error = action.payload;
      });
    // create employee
    builder
      .addCase(createEmployee.pending, (state) => {
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.message = 'Employee created successfully';
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.error = action.payload.message;
      });
    // delete employee
    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        if (action.payload.status === 204) {
          state.message = 'Employee deleted successfully';
        }
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(updateEmployee.pending, (state) => {
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.message = 'Employee updated successfully';
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearMessage, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;

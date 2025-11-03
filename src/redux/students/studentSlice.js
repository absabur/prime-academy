import { createSlice } from '@reduxjs/toolkit';
import {
  fetchStudents,
  fetchSingleStudent,
  deleteStudent,
  createStudent,
  updateStudent,
} from './studentAction';

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    student: {},
    studentPagination: {},
    pageSize: 10,
    loadingStudents: true,
    loadingActionStudents: false,
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
    // Students
    builder
      .addCase(fetchStudents.pending, (state) => {
        // state.loadingStudents = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loadingStudents = false;
        state.students = action.payload.data.results;
        state.studentPagination = {
          count: action.payload?.data?.count,
          next: action.payload?.data?.next,
          previous: action.payload?.data?.previous,
        };
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loadingStudents = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    //single student
    builder
      .addCase(fetchSingleStudent.pending, (state) => {
        state.loadingStudents = true;
        state.error = null;
      })
      .addCase(fetchSingleStudent.fulfilled, (state, action) => {
        // state.loadingStudents = false;
        state.student = action.payload.data; // store single student
      })
      .addCase(fetchSingleStudent.rejected, (state, action) => {
        state.loadingStudents = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    // create student
    builder
      .addCase(createStudent.pending, (state) => {
        state.loadingActionStudents = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loadingActionStudents = false;
        state.message = 'Student created successfully';
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loadingActionStudents = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload.message;
      });
    // delete student
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.loadingActionStudents = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        if (action.payload.status === 204) {
          state.loadingActionStudents = false;
          state.message = 'Student deleted successfully';
        }
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loadingActionStudents = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    builder
      .addCase(updateStudent.pending, (state) => {
        state.loadingActionStudents = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loadingActionStudents = false;
        state.message = 'Student updated successfully';
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loadingActionStudents = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { clearMessage, clearError } = studentSlice.actions;
export default studentSlice.reducer;

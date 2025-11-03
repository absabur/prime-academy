import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTeachers,
  fetchSingleTeacher,
  deleteTeacher,
  createTeacher,
  updateTeacher,
} from './teacherAction';

const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    teachers: [],
    teacher: {},
    teacherPagination: {},
    pageSize: 10,
    loadingTeachers: true,
    loadingActionTeachers: false,
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
    // Teachers
    builder
      .addCase(fetchTeachers.pending, (state) => {
        // state.loadingTeachers = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loadingTeachers = false;
        state.teachers = action.payload.data.results;
        state.teacherPagination = {
          count: action.payload?.data?.count,
          next: action.payload?.data?.next,
          previous: action.payload?.data?.previous,
        };
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loadingTeachers = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    //single teacher
    builder
      .addCase(fetchSingleTeacher.pending, (state) => {
        // state.loadingTeachers = true;
        state.error = null;
      })
      .addCase(fetchSingleTeacher.fulfilled, (state, action) => {
        state.loadingTeachers = false;
        state.teacher = action.payload.data; // store single teacher
      })
      .addCase(fetchSingleTeacher.rejected, (state, action) => {
        state.loadingTeachers = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    // create teacher
    builder
      .addCase(createTeacher.pending, (state) => {
        state.loadingActionTeachers = true;
        state.error = null;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.loadingActionTeachers = false;
        state.message = 'Teacher created successfully';
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.loadingActionTeachers = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload.message;
      });
    // delete teacher
    builder
      .addCase(deleteTeacher.pending, (state) => {
        state.loadingActionTeachers = true;
        state.error = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        if (action.payload.status === 204) {
          state.loadingActionTeachers = false;
          state.message = 'Teacher deleted successfully';
        }
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loadingActionTeachers = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    // update teacher
    builder
      .addCase(updateTeacher.pending, (state) => {
        state.loadingActionTeachers = true;
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loadingActionTeachers = false;
        state.message = 'Teacher updated successfully';
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loadingActionTeachers = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { clearMessage, clearError } = teacherSlice.actions;
export default teacherSlice.reducer;

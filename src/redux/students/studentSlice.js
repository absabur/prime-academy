import { createSlice } from '@reduxjs/toolkit';
import { fetchStudents, fetchSingleStudent } from './studentAction';

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    student: {},
    studentPagination: {},
    pageSize: 10,
    loadingStudents: true,
    loadingStudent: true,
    error: null,
  },
  reducers: {
    // setActiveCategory: (state, action) => {
    //   state.activeCategory = action.payload;
    // },
  },
  extraReducers: (builder) => {
    // Students
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loadingStudents = true;
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
        state.error = action.payload;
      });

    //single student
    builder
      .addCase(fetchSingleStudent.pending, (state) => {
        state.loadingStudent = true;
        state.error = null;
      })
      .addCase(fetchSingleStudent.fulfilled, (state, action) => {
        state.loadingStudent = false;
        state.student = action.payload.data; // store single student
      })
      .addCase(fetchSingleStudent.rejected, (state, action) => {
        state.loadingStudent = false;
        state.error = action.payload;
      });
  },
});

export const {} = studentSlice.actions;
export default studentSlice.reducer;

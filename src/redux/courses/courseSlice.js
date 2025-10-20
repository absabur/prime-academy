import { createSlice } from '@reduxjs/toolkit';
import { fetchCourseCategories, fetchCourses, fetchSingleCourse } from './courseAction';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    categories: [],
    courses: [],
    course: {},
    coursePagination: {},
    pageSize: 9,
    loadingCourses: true,
    loadingCourse: true,
    loadingCourseCategory: false,
    error: null,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Course categories
    builder
      .addCase(fetchCourseCategories.pending, (state) => {
        state.loadingCourseCategory = true;
        state.error = null;
      })
      .addCase(fetchCourseCategories.fulfilled, (state, action) => {
        state.loadingCourseCategory = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchCourseCategories.rejected, (state, action) => {
        state.loadingCourseCategory = false;
        state.error = action.payload;
      });

    // Courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loadingCourses = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loadingCourses = false;
        state.courses = action.payload.data.results;
        state.coursePagination = {
          count: action.payload?.data?.count,
          next: action.payload?.data?.next,
          previous: action.payload?.data?.previous,
        };
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loadingCourses = false;
        state.error = action.payload;
      });

    //single course
    builder
      .addCase(fetchSingleCourse.pending, (state) => {
        state.loadingCourse = true;
        state.error = null;
      })
      .addCase(fetchSingleCourse.fulfilled, (state, action) => {
        state.loadingCourse = false;
        state.course = action.payload.data; // store single course
      })
      .addCase(fetchSingleCourse.rejected, (state, action) => {
        state.loadingCourse = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveCategory } = courseSlice.actions;
export default courseSlice.reducer;

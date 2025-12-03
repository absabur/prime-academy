import { createSlice } from '@reduxjs/toolkit';
import {
  createCourseCategories,
  deleteCourse,
  fetchAdminCourses,
  fetchCourseCategories,
  fetchCourses,
  fetchMegaCourses,
  fetchMyCourses,
  fetchOurCourses,
  fetchSingleCourse,
  fetchStudentCourseModule,
  updateCourse,
} from './courseAction';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    categories: [],
    courses: [],
    adminCourses: [],
    ourCourses: [],
    megaCourses: [],
    loadingmyCourses: true,
    myCourses: [],
    studentCourseModule: [],
    course: {},
    coursePagination: {},
    pageSize: 12,
    loadingAdminCourse: true,
    loadingCourses: true,
    loadingOurCourses: true,
    loadingMegaCourses: true,
    loadingCourse: true,
    loadingCourseCategory: true,
    loadingStudentCourseModule: true,
    error: null,
    message: null,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    clearCourse: (state) => {
      state.course = {};
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
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
        state.categories = action.payload.data.results;
      })
      .addCase(fetchCourseCategories.rejected, (state, action) => {
        state.loadingCourseCategory = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // create categories
    builder
      .addCase(createCourseCategories.pending, (state) => {
        state.loadingCourseCategory = true;
        state.error = null;
      })
      .addCase(createCourseCategories.fulfilled, (state, action) => {
        state.loadingCourseCategory = false;
        state.message = 'Course Category Create Successfull';
      })
      .addCase(createCourseCategories.rejected, (state, action) => {
        state.loadingCourseCategory = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // Courses
    builder
      .addCase(fetchCourses.pending, (state) => {
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
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // admin course
    builder
      .addCase(fetchAdminCourses.pending, (state) => {
        state.loadingAdminCourse = true;
        state.error = null;
      })
      .addCase(fetchAdminCourses.fulfilled, (state, action) => {
        state.loadingAdminCourse = false;
        state.adminCourses = action.payload.data.results;
        state.coursePagination = {
          count: action.payload?.data?.count,
          next: action.payload?.data?.next,
          previous: action.payload?.data?.previous,
        };
      })
      .addCase(fetchAdminCourses.rejected, (state, action) => {
        state.loadingAdminCourse = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // Our Courses
    builder
      .addCase(fetchOurCourses.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchOurCourses.fulfilled, (state, action) => {
        state.loadingOurCourses = false;
        state.ourCourses = action.payload.data;
      })
      .addCase(fetchOurCourses.rejected, (state, action) => {
        state.loadingOurCourses = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // Mega Menu Courses
    builder
      .addCase(fetchMegaCourses.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchMegaCourses.fulfilled, (state, action) => {
        state.loadingMegaCourses = false;
        state.megaCourses = action.payload.data;
      })
      .addCase(fetchMegaCourses.rejected, (state, action) => {
        state.loadingMegaCourses = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // My Courses
    builder
      .addCase(fetchMyCourses.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.loadingmyCourses = false;
        // Transform enrollment data to extract course information
        state.myCourses = action.payload.data.results.map((enrollment) => ({
          id: enrollment.id,
          course_title: enrollment.course_title,
          course_slug: enrollment.course_slug,
          is_completed_status: enrollment.is_completed_status,
          imageUrl: enrollment.course_info?.header_image || '/placeholder-course.jpg',
          progress_percentage: enrollment.progress_percentage,
          batch: enrollment.course_info?.batch,
        }));
      })
      .addCase(fetchMyCourses.rejected, (state, action) => {
        state.loadingmyCourses = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    //single course
    builder
      .addCase(fetchSingleCourse.pending, (state) => {
        state.loadingCourse = true;
        state.error = null;
      })
      .addCase(fetchSingleCourse.fulfilled, (state, action) => {
        state.loadingCourse = false;
        state.course = action.payload.data?.success
          ? action.payload.data?.data
          : action.payload.data; // store single course
      })
      .addCase(fetchSingleCourse.rejected, (state, action) => {
        state.loadingCourse = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // update course
    builder
      .addCase(updateCourse.pending, (state) => {
        state.loadingAdminCourse = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loadingAdminCourse = false;
        state.message = 'Courses updated successfully';
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loadingAdminCourse = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // delete course
    builder
      .addCase(deleteCourse.pending, (state) => {
        state.loadingAdminCourse = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loadingAdminCourse = false;
        state.message = 'Course deleted successfully';
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loadingAdminCourse = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // student course module
    builder
      .addCase(fetchStudentCourseModule.pending, (state) => {
        state.loadingStudentCourseModule = true;
        state.error = null;
      })
      .addCase(fetchStudentCourseModule.fulfilled, (state, action) => {
        state.loadingStudentCourseModule = false;
        state.studentCourseModule = action.payload.results;
      })
      .addCase(fetchStudentCourseModule.rejected, (state, action) => {
        state.loadingStudentCourseModule = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { setActiveCategory, clearCourse, clearMessage, clearError } = courseSlice.actions;
export default courseSlice.reducer;

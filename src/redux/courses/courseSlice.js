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
import {
  createCourseBatch,
  deleteCourseBatch,
  fetchCourseBatches,
  fetchSingleBatch,
  updateCourseBatch,
} from './courseBatchActions';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    categories: [],
    courses: [],
    adminCourses: [],
    ourCourses: [],
    megaCourses: [],
    loadingmyCourses: false,
    myCourses: [],
    studentCourseModule: [],
    course: {},
    coursePagination: {},
    pageSize: 12,
    loadingAdminCourse: false,
    loadingCourses: false,
    loadingOurCourses: false,
    loadingMegaCourses: false,
    loadingCourse: false,
    loadingCourseCategory: false,
    loadingStudentCourseModule: false,
    // Batch state
    batches: [],
    currentBatch: null,
    loadingBatches: false,
    batchError: null,
    batchMessage: null,
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
    clearBatchMessage: (state) => {
      state.batchMessage = null;
    },
    clearBatchError: (state) => {
      state.batchError = null;
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
        state.loadingCourses = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loadingCourses = false;
        // Handle different response structures
        const coursesData =
          action.payload.data?.results || action.payload.data || action.payload || [];
        state.courses = Array.isArray(coursesData) ? coursesData : [];
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
        state.loadingOurCourses = true;
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
        state.loadingMegaCourses = true;
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
        state.loadingmyCourses = true;
        state.error = null;
      })
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.loadingmyCourses = false;
        // Transform enrollment data to extract course information
        // Handle different response structures
        const enrollments =
          action.payload.data?.results || action.payload.data || action.payload || [];

        if (!Array.isArray(enrollments)) {
          console.error('Enrollments data is not an array:', enrollments);
          state.myCourses = [];
          return;
        }

        state.myCourses = enrollments.map((enrollment) => {
          // Get batch info from the new batch_info field
          const batchInfo = enrollment.batch_info || {};

          return {
            id: enrollment.id,
            course_title: enrollment.course_title,
            course_slug: enrollment.course_slug,
            is_completed_status: enrollment.is_completed_status,
            imageUrl: enrollment.course_info?.header_image || '/placeholder-course.jpg',
            progress_percentage: enrollment.progress_percentage,
            // Updated batch handling - use batch_info from API
            batch: batchInfo.id || enrollment.batch || null,
            batch_id: batchInfo.id || null,
            batchName: batchInfo.batch_name || batchInfo.display_name || 'N/A',
            batchNumber: batchInfo.batch_number || null,
            batchSlug: batchInfo.slug || null,
            batchStartDate: batchInfo.start_date || null,
            batchEndDate: batchInfo.end_date || null,
            batchStatus: batchInfo.status || null,
            // Payment information
            order: enrollment.order || {},
            paymentStatus: enrollment.order?.payment_status || 'unknown',
            isInstallment: enrollment.order?.is_installment || false,
            installmentsPaid: enrollment.order?.installments_paid || 0,
            totalInstallments: enrollment.order?.installment_plan || 0,
            totalAmount: enrollment.order?.total_amount || 0,
            amountPaid: enrollment.order?.amount_paid || 0,
            nextPaymentDue: enrollment.order?.next_payment_due || null,
            nextPaymentAmount: enrollment.order?.next_payment_amount || null,
          };
        });
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

    // Fetch course batches
    builder
      .addCase(fetchCourseBatches.pending, (state) => {
        state.loadingBatches = true;
        state.batchError = null;
      })
      .addCase(fetchCourseBatches.fulfilled, (state, action) => {
        state.loadingBatches = false;
        state.batches = action.payload.data?.results || action.payload.data || action.payload || [];
      })
      .addCase(fetchCourseBatches.rejected, (state, action) => {
        state.loadingBatches = false;
        state.batchError = action.payload?.message || action.payload;
      });

    // Create batch
    builder
      .addCase(createCourseBatch.pending, (state) => {
        state.loadingBatches = true;
        state.batchError = null;
      })
      .addCase(createCourseBatch.fulfilled, (state, action) => {
        state.loadingBatches = false;
        state.batchMessage = 'Batch created successfully';
      })
      .addCase(createCourseBatch.rejected, (state, action) => {
        state.loadingBatches = false;
        state.batchError = action.payload?.message || action.payload;
      });

    // Update batch
    builder
      .addCase(updateCourseBatch.pending, (state) => {
        state.loadingBatches = true;
        state.batchError = null;
      })
      .addCase(updateCourseBatch.fulfilled, (state, action) => {
        state.loadingBatches = false;
        state.batchMessage = 'Batch updated successfully';
      })
      .addCase(updateCourseBatch.rejected, (state, action) => {
        state.loadingBatches = false;
        state.batchError = action.payload?.message || action.payload;
      });

    // Delete batch
    builder
      .addCase(deleteCourseBatch.pending, (state) => {
        state.loadingBatches = true;
        state.batchError = null;
      })
      .addCase(deleteCourseBatch.fulfilled, (state, action) => {
        state.loadingBatches = false;
        state.batchMessage = 'Batch deleted successfully';
      })
      .addCase(deleteCourseBatch.rejected, (state, action) => {
        state.loadingBatches = false;
        state.batchError = action.payload?.message || action.payload;
      });

    // Fetch single batch
    builder
      .addCase(fetchSingleBatch.pending, (state) => {
        state.loadingBatches = true;
        state.batchError = null;
      })
      .addCase(fetchSingleBatch.fulfilled, (state, action) => {
        state.loadingBatches = false;
        state.currentBatch = action.payload.data || action.payload;
      })
      .addCase(fetchSingleBatch.rejected, (state, action) => {
        state.loadingBatches = false;
        state.batchError = action.payload?.message || action.payload;
      });
  },
});

export const {
  setActiveCategory,
  clearCourse,
  clearMessage,
  clearError,
  clearBatchMessage,
  clearBatchError,
} = courseSlice.actions;
export default courseSlice.reducer;

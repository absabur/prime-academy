import { createSlice } from '@reduxjs/toolkit';
import {
  createBenefits,
  createCourse,
  createCourseDetails,
  createCourseModules,
  createCoursePrice,
  createSideSection,
  createSuccessStories,
  createTab,
  createTabContent,
  createTabSection,
  createWhyEnrollItem,
  deleteBenefits,
  deleteCourseModules,
  deleteSideSection,
  deleteSuccessStories,
  deleteTab,
  deleteTabContent,
  deleteWhyEnrollItem,
  singelCourse,
  updateBenefits,
  updateCourse,
  updateCourseModules,
  updateCoursePrice,
  updateSideSection,
  updateSuccessStories,
  updateTab,
  updateTabContent,
  updateWhyEnrollItem,
} from './courseWizardAction';

const initialState = {
  step: 1,
  maxStep: 9,
  courseData: {},
  courseWizardLoading: false,
  courseWizardMessage: null,
  courseWizardError: null,
};

const courseWizardSlice = createSlice({
  name: 'courseWizard',
  initialState,
  reducers: {
    clearCourse: (state) => {
      if (state.courseData.id) {
        state.courseData = {};
      }
    },
    prevStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },
    goToStep: (state, action) => {
      state.step = action.payload;
    },
    restoreFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    updateFormData: (state, action) => {
      const { key, data } = action.payload;
      state.formData[key] = data;
    },
    resetWizard: () => initialState,
  },
  extraReducers: (builder) => {
    // create course by rahadmondal
    builder.addCase(createCourse.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course created successfully';
    });
    builder.addCase(createCourse.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // create course price by rahadmondal
    builder.addCase(createCoursePrice.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(createCoursePrice.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course price created successfully';
    });
    builder.addCase(createCoursePrice.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // get single course by rahadmondal
    builder.addCase(singelCourse.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(singelCourse.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseData = action.payload.data;
    });
    builder.addCase(singelCourse.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // upate course by rahadmondal
    builder
      .addCase(updateCourse.pending, (state) => {
        state.courseWizardLoading = true;
        state.courseWizardError = null;
        state.courseWizardMessage = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.courseWizardLoading = false;
        state.courseWizardMessage = 'Course updated successfully';
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.courseWizardLoading = false;
        state.courseWizardError = action.payload?.message
          ? action.payload?.message
          : action.payload;
      });

    // update course price by rahadmondal

    builder
      .addCase(updateCoursePrice.pending, (state) => {
        state.courseWizardLoading = true;
        state.courseWizardError = null;
        state.courseWizardMessage = null;
      })
      .addCase(updateCoursePrice.fulfilled, (state, action) => {
        state.courseWizardLoading = false;
        state.courseWizardMessage = 'Course price updated successfully';
      })
      .addCase(updateCoursePrice.rejected, (state, action) => {
        state.courseWizardLoading = false;
        state.courseWizardError = action.payload?.message
          ? action.payload?.message
          : action.payload;
      });

    // create course details by rahadmondal

    builder.addCase(createCourseDetails.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(createCourseDetails.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details fetched successfully';
    });
    builder.addCase(createCourseDetails.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // create course moules by rahadmondal

    builder.addCase(createCourseModules.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(createCourseModules.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details fetched successfully';
    });
    builder.addCase(createCourseModules.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // update course modules by rahadmondal

    builder.addCase(updateCourseModules.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(updateCourseModules.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details fetched successfully';
    });
    builder.addCase(updateCourseModules.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // delete course modules by rahadmondal

    builder.addCase(deleteCourseModules.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(deleteCourseModules.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details fetched successfully';
    });
    builder.addCase(deleteCourseModules.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // why enroll section add by rahadmondal

    builder.addCase(createWhyEnrollItem.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(createWhyEnrollItem.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details fetched successfully';
    });
    builder.addCase(createWhyEnrollItem.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // why enroll section update by rahadmondal

    builder.addCase(updateWhyEnrollItem.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(updateWhyEnrollItem.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details Update successfully';
    });
    builder.addCase(updateWhyEnrollItem.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    builder.addCase(deleteWhyEnrollItem.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(deleteWhyEnrollItem.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details delete successfully';
    });
    builder.addCase(deleteWhyEnrollItem.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // benefits add , delete , update

    builder.addCase(createBenefits.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(createBenefits.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details fetched successfully';
    });
    builder.addCase(createBenefits.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // why enroll section update by rahadmondal

    builder.addCase(updateBenefits.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(updateBenefits.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details Update successfully';
    });
    builder.addCase(updateBenefits.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    builder.addCase(deleteBenefits.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(deleteBenefits.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details delete successfully';
    });
    builder.addCase(deleteBenefits.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // success stories add , update , delete by rahad mondal

    builder.addCase(createSuccessStories.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(createSuccessStories.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details fetched successfully';
    });
    builder.addCase(createSuccessStories.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    builder.addCase(updateSuccessStories.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(updateSuccessStories.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details Update successfully';
    });
    builder.addCase(updateSuccessStories.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    builder.addCase(deleteSuccessStories.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(deleteSuccessStories.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details delete successfully';
    });
    builder.addCase(deleteSuccessStories.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // success stories add , update , delete by rahad mondal

    builder.addCase(createSideSection.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(createSideSection.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details fetched successfully';
    });
    builder.addCase(createSideSection.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    builder.addCase(updateSideSection.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(updateSideSection.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details Update successfully';
    });
    builder.addCase(updateSideSection.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    builder.addCase(deleteSideSection.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(deleteSideSection.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details delete successfully';
    });
    builder.addCase(deleteSideSection.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // create content section by rahad mondal
    builder.addCase(createTabSection.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(createTabSection.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details fetched successfully';
    });
    builder.addCase(createTabSection.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // create update delete tab by rahad mondal

    builder.addCase(createTab.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(createTab.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details fetched successfully';
    });
    builder.addCase(createTab.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    builder.addCase(updateTab.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(updateTab.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details Update successfully';
    });
    builder.addCase(updateTab.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    builder.addCase(deleteTab.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(deleteTab.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details delete successfully';
    });
    builder.addCase(deleteTab.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // tab content create . update , delete

    builder.addCase(createTabContent.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(createTabContent.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details fetched successfully';
    });
    builder.addCase(createTabContent.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    builder.addCase(updateTabContent.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(updateTabContent.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details Update successfully';
    });
    builder.addCase(updateTabContent.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    builder.addCase(deleteTabContent.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(deleteTabContent.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details delete successfully';
    });
    builder.addCase(deleteTabContent.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });
  },
});

export const { clearCourse, prevStep, goToStep, updateFormData, resetWizard, restoreFormData } =
  courseWizardSlice.actions;

export default courseWizardSlice.reducer;

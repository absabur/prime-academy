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
  updateCourseDetails,
  updateCourseModules,
  updateCoursePrice,
  updateSideSection,
  updateSuccessStories,
  updateTab,
  updateTabContent,
  updateWhyEnrollItem,
  fetchCourseModules,
  fetchWhyEnrollItems,
  fetchBenefits,
  fetchSuccessStories,
  fetchSideSection,
  fetchTabSections,
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
      // Update courseData.pricing with the new pricing
      if (state.courseData) {
        state.courseData.pricing = action.payload.data || action.payload;
      }
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
        // Update courseData.pricing with the updated pricing
        if (state.courseData) {
          state.courseData.pricing = action.payload.data || action.payload;
        }
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
      // Update courseData.detail with the new detail
      if (state.courseData) {
        state.courseData.detail = action.payload.data || action.payload;
      }
    });
    builder.addCase(createCourseDetails.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload?.message ? action.payload?.message : action.payload;
    });

    // update course details
    builder.addCase(updateCourseDetails.pending, (state) => {
      state.courseWizardLoading = true;
      state.courseWizardError = null;
      state.courseWizardMessage = null;
    });
    builder.addCase(updateCourseDetails.fulfilled, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardMessage = 'Course details updated successfully';
      // Update courseData.detail with the updated detail
      if (state.courseData) {
        state.courseData.detail = action.payload.data || action.payload;
      }
    });
    builder.addCase(updateCourseDetails.rejected, (state, action) => {
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
      // Add new module to courseData.detail.modules
      if (state.courseData?.detail?.modules) {
        state.courseData.detail.modules.push(action.payload.data || action.payload);
      }
    });
    builder.addCase(createCourseModules.rejected, (state, action) => {
      state.courseWizardLoading = false;
      state.courseWizardError = action.payload;
    });

    // Fetch Course Modules
    builder.addCase(fetchCourseModules.pending, (state) => {
      // We don't necessarily want to show a full page loader for just fetching modules logic if it's secondary
      // but let's keep it consistent or simple
    });
    builder.addCase(fetchCourseModules.fulfilled, (state, action) => {
      if (state.courseData.detail) {
        // Update the modules array in the course detail
        state.courseData.detail.modules = action.payload.data?.results || action.payload.data || action.payload || [];
      }
    });
    builder.addCase(fetchCourseModules.rejected, (state, action) => {
      state.courseWizardError = action.payload;
    });

    // Fetch Why Enroll Items
    builder.addCase(fetchWhyEnrollItems.pending, (state) => {
      // similar to modules fetch
    });
    builder.addCase(fetchWhyEnrollItems.fulfilled, (state, action) => {
      if (state.courseData.detail) {
        state.courseData.detail.why_enrol = action.payload.data?.results || action.payload.data || action.payload || [];
      }
    });
    builder.addCase(fetchWhyEnrollItems.rejected, (state, action) => {
      state.courseWizardError = action.payload;
    });

    // Fetch Benefits
    builder.addCase(fetchBenefits.pending, (state) => {
      // similar to modules fetch
    });
    builder.addCase(fetchBenefits.fulfilled, (state, action) => {
      if (state.courseData.detail) {
        state.courseData.detail.benefits = action.payload.data?.results || action.payload.data || action.payload || [];
      }
    });
    builder.addCase(fetchBenefits.rejected, (state, action) => {
      state.courseWizardError = action.payload;
    });

    // Fetch Success Stories
    builder.addCase(fetchSuccessStories.pending, (state) => {
      // similar to modules fetch
    });
    builder.addCase(fetchSuccessStories.fulfilled, (state, action) => {
      if (state.courseData.detail) {
        state.courseData.detail.success_stories = action.payload.data?.results || action.payload.data || action.payload || [];
      }
    });
    builder.addCase(fetchSuccessStories.rejected, (state, action) => {
      state.courseWizardError = action.payload;
    });

    // Fetch Side Section
    builder.addCase(fetchSideSection.pending, (state) => {
      // similar to modules fetch
    });
    builder.addCase(fetchSideSection.fulfilled, (state, action) => {
      if (state.courseData.detail) {
        state.courseData.detail.side_image_sections = action.payload.data?.results || action.payload.data || action.payload || [];
      }
    });
    builder.addCase(fetchSideSection.rejected, (state, action) => {
      state.courseWizardError = action.payload;
    });

    // Fetch Tab Sections (Content Sections)
    builder.addCase(fetchTabSections.pending, (state) => {
      // similar to modules fetch
    });
    builder.addCase(fetchTabSections.fulfilled, (state, action) => {
      if (state.courseData.detail) {
        state.courseData.detail.content_sections = action.payload.data?.results || action.payload.data || action.payload || [];
      }
    });
    builder.addCase(fetchTabSections.rejected, (state, action) => {
      state.courseWizardError = action.payload;
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
      // Update module in courseData.detail.modules
      if (state.courseData?.detail?.modules) {
        const updatedModule = action.payload.data || action.payload;
        const index = state.courseData.detail.modules.findIndex(m => m.id === updatedModule.id);
        if (index !== -1) {
          state.courseData.detail.modules[index] = updatedModule;
        }
      }
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
      // Remove module from courseData.detail.modules
      if (state.courseData?.detail?.modules) {
        state.courseData.detail.modules = state.courseData.detail.modules.filter(m => m.id !== action.payload);
      }
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
      // Add new item to courseData.detail.why_enrol
      if (state.courseData?.detail) {
        if (!state.courseData.detail.why_enrol) state.courseData.detail.why_enrol = [];
        state.courseData.detail.why_enrol.push(action.payload.data || action.payload);
      }
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
      // Update item in courseData.detail.why_enrol
      if (state.courseData?.detail?.why_enrol) {
        const updated = action.payload.data || action.payload;
        const index = state.courseData.detail.why_enrol.findIndex(i => i.id === updated.id);
        if (index !== -1) state.courseData.detail.why_enrol[index] = updated;
      }
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
      // Remove item from courseData.detail.why_enrol
      if (state.courseData?.detail?.why_enrol) {
        const deletedData = action.payload.data || action.payload;
        const idToDelete = deletedData.id || deletedData;
        state.courseData.detail.why_enrol = state.courseData.detail.why_enrol.filter(i => i.id !== idToDelete);
      }
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
      // Add new benefit to courseData.detail.benefits
      if (state.courseData?.detail) {
        if (!state.courseData.detail.benefits) state.courseData.detail.benefits = [];
        state.courseData.detail.benefits.push(action.payload.data || action.payload);
      }
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
      // Update benefit in courseData.detail.benefits
      if (state.courseData?.detail?.benefits) {
        const updated = action.payload.data || action.payload;
        const index = state.courseData.detail.benefits.findIndex(i => i.id === updated.id);
        if (index !== -1) state.courseData.detail.benefits[index] = updated;
      }
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
      // Remove benefit from courseData.detail.benefits
      if (state.courseData?.detail?.benefits) {
        const deletedData = action.payload.data || action.payload;
        const idToDelete = deletedData.id || deletedData;
        state.courseData.detail.benefits = state.courseData.detail.benefits.filter(i => i.id !== idToDelete);
      }
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
      // Add new success story to courseData.detail.success_stories
      if (state.courseData?.detail) {
        if (!state.courseData.detail.success_stories) state.courseData.detail.success_stories = [];
        state.courseData.detail.success_stories.push(action.payload.data || action.payload);
      }
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
      // Update success story in courseData.detail.success_stories
      if (state.courseData?.detail?.success_stories) {
        const updated = action.payload.data || action.payload;
        const index = state.courseData.detail.success_stories.findIndex(i => i.id === updated.id);
        if (index !== -1) state.courseData.detail.success_stories[index] = updated;
      }
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
      // Remove success story from courseData.detail.success_stories
      if (state.courseData?.detail?.success_stories) {
        const deletedData = action.payload.data || action.payload;
        const idToDelete = deletedData.id || deletedData;
        state.courseData.detail.success_stories = state.courseData.detail.success_stories.filter(i => i.id !== idToDelete);
      }
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
      // Add new side section to courseData.detail.side_image_sections
      if (state.courseData?.detail) {
        if (!state.courseData.detail.side_image_sections) state.courseData.detail.side_image_sections = [];
        state.courseData.detail.side_image_sections.push(action.payload.data || action.payload);
      }
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
      // Update side section in courseData.detail.side_image_sections
      if (state.courseData?.detail?.side_image_sections) {
        const updated = action.payload.data || action.payload;
        const index = state.courseData.detail.side_image_sections.findIndex(i => i.id === updated.id);
        if (index !== -1) state.courseData.detail.side_image_sections[index] = updated;
      }
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
      // Remove side section from courseData.detail.side_image_sections
      if (state.courseData?.detail?.side_image_sections) {
        const deletedData = action.payload.data || action.payload;
        const idToDelete = deletedData.id || deletedData;
        state.courseData.detail.side_image_sections = state.courseData.detail.side_image_sections.filter(i => i.id !== idToDelete);
      }
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

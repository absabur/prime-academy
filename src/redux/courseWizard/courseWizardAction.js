import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import SwalUtils from '../../utils/sweetAlert';

export const createCourse = createAsyncThunk(
  'courseWizard/createCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      // API call to create course
      const response = await api.post(`${import.meta.env.VITE_API_URL}/api/courses/`, courseData);
      return response.data; // return created course data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create course');
    }
  }
);

export const singelCourse = createAsyncThunk(
  'courseWizard/singelCourse',
  async (courseIdOrSlug, { rejectWithValue }) => {
    try {
      // API call to get single course
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/courses/${courseIdOrSlug}/`
      );
      return response.data; // return course data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch course');
    }
  }
);

export const createCoursePrice = createAsyncThunk(
  'courseWizard/createCoursePrice',
  async (priceData, { rejectWithValue }) => {
    try {
      // API call to create course price
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/courses/prices/`,
        priceData
      );
      return response.data; // return created course price data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create course price');
    }
  }
);

export const updateCoursePrice = createAsyncThunk(
  'courseWizard/updateCoursePrice',
  async ({ id, priceData }, { rejectWithValue }) => {
    try {
      // API call to update course price
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/courses/prices/${id}/`,
        priceData
      );
      return response.data; // return updated course price data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update course price');
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courseWizard/updateCourse',
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      // API call to update course
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/courses/${id}/`,
        courseData
      );
      return response.data; // return updated course data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update course');
    }
  }
);

export const createCourseDetails = createAsyncThunk(
  'courseWizard/createCourseDetails',
  async (formData, { rejectWithValue }) => {
    try {
      // API call to get course details
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/courses/details/`,
        formData
      );
      return response.data; // return course details data
    } catch (error) {
      SwalUtils.error(error?.response?.data?.message || 'Failed to fetch course details');
      return rejectWithValue(error.response?.data || 'Failed to fetch course details');
    }
  }
);

export const updateCourseDetails = createAsyncThunk(
  'courseWizard/updateCourseDetails',
  async ({ id, detailData }, { rejectWithValue }) => {
    try {
      // API call to update course details
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/courses/details/${id}/`,
        detailData
      );
      return response.data; // return updated course details data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update course details');
    }
  }
);

export const createCourseModules = createAsyncThunk(
  'courseWizard/createCourseModules',
  async (modulesData, { rejectWithValue }) => {
    try {
      // API call to create course modules
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/courses/modules/`,
        modulesData
      );
      return response.data; // return created course modules data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create course modules');
    }
  }
);

export const updateCourseModules = createAsyncThunk(
  'courseWizard/updateCourseModules',
  async ({ id, modulesData }, { rejectWithValue }) => {
    try {
      // API call to update course modules
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/courses/modules/${id}/`,
        modulesData
      );
      return response.data; // return updated course modules data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update course modules');
    }
  }
);

export const deleteCourseModules = createAsyncThunk(
  'courseWizard/deleteCourseModules',
  async (id, { rejectWithValue }) => {
    try {
      // API call to delete course modules
      await api.delete(`${import.meta.env.VITE_API_URL}/api/courses/modules/${id}/`);
      return id; // return deleted module id
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete course modules');
    }
  }
);

export const createWhyEnrollItem = createAsyncThunk(
  'courseWizard/createWhyEnrollItem',
  async (itemData, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/courses/why-enrol/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create why enroll item');
    }
  }
);

export const updateWhyEnrollItem = createAsyncThunk(
  'courseWizard/updateWhyEnrollItem',
  async ({ id, itemData }, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/courses/why-enrol/${id}/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create why enroll item');
    }
  }
);

export const deleteWhyEnrollItem = createAsyncThunk(
  'courseWizard/deleteWhyEnrollItem',
  async (id, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/api/courses/why-enrol/${id}/`
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create why enroll item');
    }
  }
);

export const createBenefits = createAsyncThunk(
  'courseWizard/createBenefits',
  async (itemData, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/courses/benefits/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create benefitsitem');
    }
  }
);

export const updateBenefits = createAsyncThunk(
  'courseWizard/updateBenefits',
  async ({ id, itemData }, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/courses/benefits/${id}/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create benefits item');
    }
  }
);

export const deleteBenefits = createAsyncThunk(
  'courseWizard/deleteBenefits',
  async (id, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/api/courses/benefits/${id}/`
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create why enroll item');
    }
  }
);

export const createSuccessStories = createAsyncThunk(
  'courseWizard/createSuccessStories',
  async (itemData, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/courses/success-stories/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create benefitsitem');
    }
  }
);

export const updateSuccessStories = createAsyncThunk(
  'courseWizard/updateSuccessStories',
  async ({ id, itemData }, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/courses/success-stories/${id}/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create benefits item');
    }
  }
);

export const deleteSuccessStories = createAsyncThunk(
  'courseWizard/deleteSuccessStories',
  async (id, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/api/courses/success-stories/${id}/`
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create why enroll item');
    }
  }
);

export const createSideSection = createAsyncThunk(
  'courseWizard/createSideSection',
  async (itemData, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/courses/side-sections/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create benefitsitem');
    }
  }
);

export const updateSideSection = createAsyncThunk(
  'courseWizard/updateSideSection ',
  async ({ id, itemData }, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/courses/side-sections/${id}/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create benefits item');
    }
  }
);

export const deleteSideSection = createAsyncThunk(
  'courseWizard/deleteSideSection',
  async (id, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/api/courses/side-sections/${id}/`
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create why enroll item');
    }
  }
);

export const createTabSection = createAsyncThunk(
  'courseWizard/createTabSection',
  async (itemData, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/courses/content-sections/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create benefitsitem');
    }
  }
);

export const createTab = createAsyncThunk(
  'courseWizard/createTab',
  async (itemData, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/courses/section-tabs/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create benefitsitem');
    }
  }
);

export const updateTab = createAsyncThunk(
  'courseWizard/updateTab ',
  async ({ id, itemData }, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/courses/section-tabs/${id}/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create benefits item');
    }
  }
);

export const deleteTab = createAsyncThunk(
  'courseWizard/deleteTab',
  async (id, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/api/courses/section-tabs/${id}/`
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create why enroll item');
    }
  }
);

export const createTabContent = createAsyncThunk(
  'courseWizard/createTabContent',
  async (itemData, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/courses/tabbed-content/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create benefitsitem');
    }
  }
);

export const updateTabContent = createAsyncThunk(
  'courseWizard/updateTabContent ',
  async ({ id, itemData }, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.patch(
        `${import.meta.env.VITE_API_URL}/api/courses/tabbed-content/${id}/`,
        itemData
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create benefits item');
    }
  }
);

export const deleteTabContent = createAsyncThunk(
  'courseWizard/deleteTabContent',
  async (id, { rejectWithValue }) => {
    try {
      // API call to create why enroll item
      const response = await api.delete(
        `${import.meta.env.VITE_API_URL}/api/courses/tabbed-content/${id}/`
      );
      return response.data; // return created item data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create why enroll item');
    }
  }
);

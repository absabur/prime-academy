import api from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all batches for a specific course
export const fetchCourseBatches = createAsyncThunk(
    'course/fetchCourseBatches',
    async (courseSlug, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${import.meta.env.VITE_API_URL}/api/courses/batches/by-course/${courseSlug}/`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch batches');
        }
    }
);

// Create a new batch for a course
export const createCourseBatch = createAsyncThunk(
    'course/createCourseBatch',
    async (batchData, { rejectWithValue, dispatch }) => {
        try {
            const response = await api.post(
                `${import.meta.env.VITE_API_URL}/api/courses/batches/`,
                batchData
            );

            // Refresh batch list after creation
            if (batchData.course_slug) {
                dispatch(fetchCourseBatches(batchData.course_slug));
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to create batch');
        }
    }
);

// Update an existing batch
export const updateCourseBatch = createAsyncThunk(
    'course/updateCourseBatch',
    async ({ id, batchData, courseSlug }, { rejectWithValue, dispatch }) => {
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_API_URL}/api/courses/batches/${id}/`,
                batchData
            );

            // Refresh batch list after update
            if (courseSlug) {
                dispatch(fetchCourseBatches(courseSlug));
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update batch');
        }
    }
);

// Delete a batch
export const deleteCourseBatch = createAsyncThunk(
    'course/deleteCourseBatch',
    async ({ id, courseSlug }, { rejectWithValue, dispatch }) => {
        try {
            await api.delete(
                `${import.meta.env.VITE_API_URL}/api/courses/batches/${id}/`
            );

            // Refresh batch list after deletion
            if (courseSlug) {
                dispatch(fetchCourseBatches(courseSlug));
            }

            return { id };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to delete batch');
        }
    }
);

// Fetch single batch details
export const fetchSingleBatch = createAsyncThunk(
    'course/fetchSingleBatch',
    async (slug, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${import.meta.env.VITE_API_URL}/api/courses/batches/${slug}/`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch batch details');
        }
    }
);

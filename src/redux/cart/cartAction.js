import api from '@/api/axios';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCarts = createAsyncThunk('cart/fetchCarts', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(`${import.meta.env.VITE_API_URL}/api/cart/`);
    return response.data;
  } catch (error) {
    console.error('🛒 Cart fetch error:', error.response?.data || error);
    return rejectWithValue(error.response?.data || 'Something went wrong');
  }
});

export const createCart = createAsyncThunk(
  'cart/createCart',
  async (cartData, { rejectWithValue, dispatch, getState }) => {
    try {
      // Get current cart state
      const state = getState();
      const currentCart = state.cart.carts;
      
      // Check if cart already has items
      if (currentCart?.items && currentCart.items.length > 0) {
        const existingItem = currentCart.items[0];
        const existingCourseId = existingItem?.course?.id;
        const existingBatchId = existingItem?.batch?.id || existingItem?.batch_info?.id;
        
        // If trying to add the SAME course but DIFFERENT batch, allow it (will replace)
        const isSameCourse = existingCourseId === cartData.course_id;
        const isDifferentBatch = existingBatchId !== cartData.batch_id;
        
        // Allow if same course but different batch (backend should handle replacement)
        if (isSameCourse && isDifferentBatch) {
          // Continue with the add - backend should replace the item
        } else if (!isSameCourse) {
          // Different course - block it
          const existingCourse = existingItem?.course?.title || 'a course';
          
          return rejectWithValue({
            message: `You already have "${existingCourse}" in your cart. Please complete checkout or remove it before adding another course.`,
            type: 'cart_limit_reached'
          });
        } else {
          // Same course, same batch - already in cart
          const existingCourse = existingItem?.course?.title || 'a course';
          const existingBatch = existingItem?.batch_info?.batch_name || existingItem?.batch_info?.display_name || 'this batch';
          
          return rejectWithValue({
            message: `"${existingCourse} - ${existingBatch}" is already in your cart.`,
            type: 'already_in_cart'
          });
        }
      }

      const response = await api.post(`${import.meta.env.VITE_API_URL}/api/cart/add/`, cartData);
      
      // Wait a moment before fetching to ensure backend has processed
      await new Promise(resolve => setTimeout(resolve, 100));
      
      await dispatch(fetchCarts()); // Refresh cart after adding
      
      return response.data; // return the created cart data
    } catch (error) {
      console.error('🛒 Cart add error:', error.response?.data || error);
      
      // Handle specific backend errors
      const errorData = error.response?.data;
      if (errorData?.already_enrolled) {
        return rejectWithValue({
          message: errorData.error || errorData.detail || 'You are already enrolled in this course',
          type: 'already_enrolled'
        });
      }
      
      return rejectWithValue(error.response?.data || { message: 'Failed to create cart' });
    }
  }
);

export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`${import.meta.env.VITE_API_URL}/api/cart/remove/${id}/`);
      dispatch(fetchCarts());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete cart');
    }
  }
);

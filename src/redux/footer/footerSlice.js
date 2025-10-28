import { createSlice } from '@reduxjs/toolkit';
import { fetchFooters, updateFooter } from './footerAction';

const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    footer: {},
    loadingFooters: true,
    error: null,
    message: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // footer
    builder
      .addCase(fetchFooters.pending, (state) => {
        state.loadingFooters = true;
        state.error = null;
      })
      .addCase(fetchFooters.fulfilled, (state, action) => {
        state.loadingFooters = false;
        state.footer = action.payload.data;
      })
      .addCase(fetchFooters.rejected, (state, action) => {
        state.loadingFooters = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    builder
      .addCase(updateFooter.pending, (state) => {
        state.loadingFooters = true;
        state.error = null;
      })
      .addCase(updateFooter.fulfilled, (state, action) => {
        state.loadingFooters = false;
        state.footer = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(updateFooter.rejected, (state, action) => {
        state.loadingFooters = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { clearError, clearMessage } = footerSlice.actions;
export default footerSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { fetchFooters } from './footerAction';

const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    footer: {},
    loadingFooters: true,
    error: null,
  },
  reducers: {
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
        state.error = action.payload;
      });

  },
});

export const {  } = footerSlice.actions;
export default footerSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { fetchOverView } from './overviewAction';

const overviewSlice = createSlice({
  name: 'overview',
  initialState: {
    overview: {},
    loadingOverview: false,
    error: null,
    message: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOverView.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchOverView.fulfilled, (state, action) => {
        state.loadingOverview = false;
        state.overview = action.payload.data;
      })
      .addCase(fetchOverView.rejected, (state, action) => {
        state.loadingOverview = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload.message;
      });
  },
});

export default overviewSlice.reducer;

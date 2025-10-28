import { createSlice } from '@reduxjs/toolkit';
import { fetchSeos } from './seoAction';

const seoSlice = createSlice({
  name: 'seo',
  initialState: {
    seos: [],
    loadingSeos: true,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    // seos
    builder
      .addCase(fetchSeos.pending, (state) => {
        state.loadingSeos = true;
        state.error = null;
      })
      .addCase(fetchSeos.fulfilled, (state, action) => {
        state.loadingSeos = false;
        state.seos = action.payload.data;
      })
      .addCase(fetchSeos.rejected, (state, action) => {
        state.loadingSeos = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

  },
});

export const {  } = seoSlice.actions;
export default seoSlice.reducer;

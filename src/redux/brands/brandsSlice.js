import { createSlice } from '@reduxjs/toolkit';
import { fetchBrands } from './brandsAction';

const brandSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: [],
    loadingbrands: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // brands
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loadingbrands = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loadingbrands = false;
        state.brands = action.payload.data;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loadingbrands = false;
        state.error = action.payload;
      });
  },
});

export const {} = brandSlice.actions;
export default brandSlice.reducer;

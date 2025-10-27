import { createSlice } from '@reduxjs/toolkit';
import { createBrand, deleteBrand, fetchBrands, updateBrand } from './brandsAction';

const brandSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: [],
    loadingbrands: true,
    error: null,
    message: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
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

    // update brand
    builder
      .addCase(updateBrand.pending, (state) => {
        state.loadingbrands = true;
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loadingbrands = false;
        state.message = action.payload.message;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loadingbrands = false;
        state.error = action.payload;
      });

    // create brand
    builder
      .addCase(createBrand.pending, (state) => {
        state.loadingbrands = true;
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loadingbrands = false;
        console.log(action.payload);
        state.message = action.payload.message;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loadingbrands = false;
        console.log(action.payload);
        state.error = action.payload;
      });

    // create brand
    builder
      .addCase(deleteBrand.pending, (state) => {
        state.loadingbrands = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loadingbrands = false;
        state.message = 'Brand Deleted Successfully';
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loadingbrands = false;
        state.error = action.payload.message || 'Unable to delete';
      });
  },
});

export const { clearMessage, clearError } = brandSlice.actions;
export default brandSlice.reducer;

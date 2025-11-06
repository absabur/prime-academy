import { createSlice } from '@reduxjs/toolkit';
import { fetchImgIconContents, fetchOurValues } from './imgIconContentAction';

const imgIconContentSlice = createSlice({
  name: 'imgIconContent',
  initialState: {
    imgIconContents: [],
    loadingImgIconContents: true,
    ourValues: null,
    error: null,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ImgIconContents
    builder
      .addCase(fetchImgIconContents.pending, (state) => {
        state.loadingImgIconContents = true;
        state.error = null;
      })
      .addCase(fetchImgIconContents.fulfilled, (state, action) => {
        state.loadingImgIconContents = false;
        state.imgIconContents = action.payload.data.sections.sort((a, b) => a.order - b.order);
      })
      .addCase(fetchImgIconContents.rejected, (state, action) => {
        state.loadingImgIconContents = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // our values
    builder
      .addCase(fetchOurValues.pending, (state) => {
        state.loadingImgIconContents = true;
        state.error = null;
      })
      .addCase(fetchOurValues.fulfilled, (state, action) => {
        state.loadingImgIconContents = false;
        state.ourValues = action.payload.data;
      })
      .addCase(fetchOurValues.rejected, (state, action) => {
        state.loadingImgIconContents = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { setActiveCategory } = imgIconContentSlice.actions;
export default imgIconContentSlice.reducer;

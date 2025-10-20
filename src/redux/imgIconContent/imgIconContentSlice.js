import { createSlice } from '@reduxjs/toolkit';
import { fetchImgIconContents } from './imgIconContentAction';

const imgIconContentSlice = createSlice({
  name: 'imgIconContent',
  initialState: {
    imgIconContents: [],
    loadingImgIconContents: true,
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
        state.error = action.payload;
      });
  },
});

export const { setActiveCategory } = imgIconContentSlice.actions;
export default imgIconContentSlice.reducer;

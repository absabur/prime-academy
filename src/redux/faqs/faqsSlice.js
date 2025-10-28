import { createSlice } from '@reduxjs/toolkit';
import { fetchFaqs } from './faqsAction';

const faqSlice = createSlice({
  name: 'faq',
  initialState: {
    faqs: {},
    loadingFaqs: true,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    // faq
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.loadingFaqs = true;
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loadingFaqs = false;
        state.faqs = action.payload.data;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loadingFaqs = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

  },
});

export const {  } = faqSlice.actions;
export default faqSlice.reducer;

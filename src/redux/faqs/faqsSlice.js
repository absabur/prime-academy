import { createSlice } from '@reduxjs/toolkit';
import { addFaqs, deleteCategory, editFaq, fetchFaqs, updateFaqCategoryOrder } from './faqsAction';

const faqSlice = createSlice({
  name: 'faq',
  initialState: {
    faqs: {},
    loadingFaqs: true,
    loadingActionFaqs: false,
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
    // faq
    builder
      .addCase(fetchFaqs.pending, (state) => {
        // state.loadingFaqs = true;
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

    // add faq
    builder
      .addCase(addFaqs.pending, (state) => {
        state.loadingActionFaqs = true;
        state.error = null;
      })
      .addCase(addFaqs.fulfilled, (state, action) => {
        state.loadingActionFaqs = false;
        state.message = action.payload.message;
      })
      .addCase(addFaqs.rejected, (state, action) => {
        state.loadingActionFaqs = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // edit faq
    builder
      .addCase(editFaq.pending, (state) => {
        state.loadingActionFaqs = true;
        state.error = null;
      })
      .addCase(editFaq.fulfilled, (state, action) => {
        state.loadingActionFaqs = false;
        state.message = action.payload.message;
      })
      .addCase(editFaq.rejected, (state, action) => {
        state.loadingActionFaqs = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // faq cate order update
    builder
      .addCase(updateFaqCategoryOrder.pending, (state) => {
        state.loadingActionFaqs = true;
        state.error = null;
      })
      .addCase(updateFaqCategoryOrder.fulfilled, (state, action) => {
        state.loadingActionFaqs = false;
        state.message = action.payload.message;
      })
      .addCase(updateFaqCategoryOrder.rejected, (state, action) => {
        state.loadingActionFaqs = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // edit faq
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loadingActionFaqs = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loadingActionFaqs = false;
        state.message = 'FAQ Category Deleted!';
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loadingActionFaqs = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { clearMessage, clearError } = faqSlice.actions;
export default faqSlice.reducer;

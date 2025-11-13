import { createSlice } from '@reduxjs/toolkit';
import { fetchCarts, deleteCart, createCart } from './cartAction';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    carts: [],
    cart: {},
    loadingCarts: true,
    loadingActionCarts: false,
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
    // Carts
    builder
      .addCase(fetchCarts.pending, (state) => {
        // state.loadingCarts = true;
        state.error = null;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.loadingCarts = false;
        state.carts = action.payload;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.loadingCarts = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // create cart
    builder
      .addCase(createCart.pending, (state) => {
        state.loadingActionCarts = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.loadingActionCarts = false;
        state.message = 'Added to cart';
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loadingActionCarts = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload.message;
      });

    // delete cart
    builder
      .addCase(deleteCart.pending, (state) => {
        state.loadingActionCarts = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loadingActionCarts = false;
        state.message = action.payload.message || 'Course removed successfully';
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loadingActionCarts = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { clearMessage, clearError } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { fetchWishlist, deleteWishlist, createWishlist, moveToCart } from './wishlistAction';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlists: [],
    loadingWishlists: false,
    loadingActionWishlists: false,
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
    // Wishlists
    builder
      .addCase(fetchWishlist.pending, (state) => {
        // state.loadingWishlists = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loadingWishlists = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loadingWishlists = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // create wishlist
    builder
      .addCase(createWishlist.pending, (state) => {
        state.loadingActionWishlists = true;
        state.error = null;
      })
      .addCase(createWishlist.fulfilled, (state, action) => {
        state.loadingActionWishlists = false;
        state.message = 'Added to wishlist';
      })
      .addCase(createWishlist.rejected, (state, action) => {
        state.loadingActionWishlists = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload.message;
      });

    // move wishlist
    builder
      .addCase(moveToCart.pending, (state) => {
        state.loadingActionWishlists = true;
        state.error = null;
      })
      .addCase(moveToCart.fulfilled, (state, action) => {
        state.loadingActionWishlists = false;
        state.message = 'Added to Cart';
      })
      .addCase(moveToCart.rejected, (state, action) => {
        state.loadingActionWishlists = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload.message;
      });

    // delete wishlist
    builder
      .addCase(deleteWishlist.pending, (state) => {
        state.loadingActionWishlists = true;
        state.error = null;
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.loadingActionWishlists = false;
        state.message = action.payload.message || 'Course removed successfully';
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.loadingActionWishlists = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { clearMessage, clearError } = wishlistSlice.actions;
export default wishlistSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    sidebarIsOpen: false,
    couponState: {},
  },
  reducers: {
    onSidebarToggle: (state) => {
      state.sidebarIsOpen = !state.sidebarIsOpen;
    },
    SidebarClose: (state) => {
      state.sidebarIsOpen = false;
    },
    setCouponState: (state, action) => {
      state.couponState = action.payload;
    },
  },
});

export const { onSidebarToggle, SidebarClose, setCouponState } = commonSlice.actions;
export default commonSlice.reducer;

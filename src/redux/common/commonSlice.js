import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    sidebarIsOpen: false,
  },
  reducers: {
    onSidebarToggle: (state) => {
      state.sidebarIsOpen = !state.sidebarIsOpen;
    },
    SidebarClose: (state) => {
      state.sidebarIsOpen = false;
    },
  },
});

export const { onSidebarToggle, SidebarClose } = commonSlice.actions;
export default commonSlice.reducer;

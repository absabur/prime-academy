import { createSlice } from '@reduxjs/toolkit';
import { fetchHeros } from './heroAction';

const heroSlice = createSlice({
  name: 'hero',
  initialState: {
    heros: [],
    loadingHeros: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // heros
    builder
      .addCase(fetchHeros.pending, (state) => {
        state.loadingHeros = true;
        state.error = null;
      })
      .addCase(fetchHeros.fulfilled, (state, action) => {
        state.loadingHeros = false;
        state.heros = action.payload.data.results;
      })
      .addCase(fetchHeros.rejected, (state, action) => {
        state.loadingHeros = false;
        state.error = action.payload;
      });
  },
});

export const {} = heroSlice.actions;
export default heroSlice.reducer;

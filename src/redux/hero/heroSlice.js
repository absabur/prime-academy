import { createSlice } from '@reduxjs/toolkit';
import { fetchHeros, fetchHerosAdmin, updateHero } from './heroAction';

const heroSlice = createSlice({
  name: 'hero',
  initialState: {
    heros: [],
    adminPanelHeros: [],
    loadingHeros: true,
    loadingActionHeros: false,
    message: null,
    error: null,
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
    // heros
    builder
      .addCase(fetchHeros.pending, (state) => {
        // state.loadingHeros = true;
        state.error = null;
      })
      .addCase(fetchHeros.fulfilled, (state, action) => {
        state.loadingHeros = false;
        state.heros = action.payload.data.results;
      })
      .addCase(fetchHeros.rejected, (state, action) => {
        state.loadingHeros = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // heros admin
    builder
      .addCase(fetchHerosAdmin.pending, (state) => {
        // state.loadingHeros = true;
        state.error = null;
      })
      .addCase(fetchHerosAdmin.fulfilled, (state, action) => {
        state.loadingHeros = false;
        state.adminPanelHeros = action.payload.data.results;
      })
      .addCase(fetchHerosAdmin.rejected, (state, action) => {
        state.loadingHeros = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // update
    builder
      .addCase(updateHero.pending, (state) => {
        state.loadingActionHeros = true;
        state.error = null;
      })
      .addCase(updateHero.fulfilled, (state, action) => {
        state.loadingActionHeros = false;
        state.message = action.payload.message;
      })
      .addCase(updateHero.rejected, (state, action) => {
        state.loadingActionHeros = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload.message;
      });
  },
});

export const { clearMessage, clearError } = heroSlice.actions;
export default heroSlice.reducer;

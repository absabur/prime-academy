import { createSlice } from '@reduxjs/toolkit';
import { fetchPolicies } from './policiesAction';

const policiesSlice = createSlice({
  name: 'policies',
  initialState: {
    policies: [],
    loadingPolicies: true,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    // policies
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.loadingPolicies = true;
        state.error = null;
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.loadingPolicies = false;
        state.policies = action.payload.data;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.loadingPolicies = false;
        state.error = action.payload;
      });

  },
});

export const {  } = policiesSlice.actions;
export default policiesSlice.reducer;

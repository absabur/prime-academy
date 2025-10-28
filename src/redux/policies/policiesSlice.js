import { createSlice } from '@reduxjs/toolkit';
import { createPolicy, fetchPolicies, updatePolicy } from './policiesAction';

const policiesSlice = createSlice({
  name: 'policies',
  initialState: {
    policies: [],
    loadingPolicies: true,
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
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    // policies add
    builder
      .addCase(createPolicy.pending, (state) => {
        state.loadingPolicies = true;
        state.error = null;
      })
      .addCase(createPolicy.fulfilled, (state, action) => {
        console.log(action);
        state.loadingPolicies = false;
        state.message = action.payload.message;
      })
      .addCase(createPolicy.rejected, (state, action) => {
        state.loadingPolicies = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });

    // policies update
    builder
      .addCase(updatePolicy.pending, (state) => {
        state.loadingPolicies = true;
        state.error = null;
      })
      .addCase(updatePolicy.fulfilled, (state, action) => {
        state.loadingPolicies = false;
        state.message = action.payload.message;
      })
      .addCase(updatePolicy.rejected, (state, action) => {
        state.loadingPolicies = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { clearMessage, clearError } = policiesSlice.actions;
export default policiesSlice.reducer;

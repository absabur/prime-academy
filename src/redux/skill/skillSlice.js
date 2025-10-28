import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSkills,
  fetchSingleSkill,
  deleteSkill,
  createSkill,
  updateSkill,
} from './skillAction';

const skillSlice = createSlice({
  name: 'skill',
  initialState: {
    skills: [],
    skill: {},
    pageSize: 10,
    skillPagination: {},
    loadingSkills: true,
    loadingSkill: true,
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
    // Skills
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loadingSkills = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loadingSkills = false;
        state.skills = action.payload.data.results;
        state.skillPagination = {
          count: action.payload?.data?.count,
          next: action.payload?.data?.next,
          previous: action.payload?.data?.previous,
        };
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loadingSkills = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    //single skill
    builder
      .addCase(fetchSingleSkill.pending, (state) => {
        state.loadingSkill = true;
        state.error = null;
      })
      .addCase(fetchSingleSkill.fulfilled, (state, action) => {
        state.loadingSkill = false;
        state.skill = action.payload.data; // store single skill
      })
      .addCase(fetchSingleSkill.rejected, (state, action) => {
        state.loadingSkill = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    // create skill
    builder
      .addCase(createSkill.pending, (state) => {
        state.error = null;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.message = 'Skill created successfully';
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.error = action.payload?.message ? action.payload?.message : action.payload.message;
      });
    // delete skill
    builder
      .addCase(deleteSkill.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        if (action.payload.status === 204) {
          state.message = 'Skill deleted successfully';
        }
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
    builder
      .addCase(updateSkill.pending, (state) => {
        state.error = null;
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.message = 'Skill updated successfully';
      })
      .addCase(updateSkill.rejected, (state, action) => {
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { clearMessage, clearError } = skillSlice.actions;
export default skillSlice.reducer;

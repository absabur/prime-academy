import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 1,
  maxStep: 9,
  formData: {
    courseInfo: {},
    coursedetails: {},
    pricing: {},
    modules: [],
    benefits: [],
    whyEnrol: [],
    successStories: [],
  },
};

const courseWizardSlice = createSlice({
  name: 'courseWizard',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.step < state.maxStep) state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },
    goToStep: (state, action) => {
      state.step = action.payload;
    },
    restoreFormData: (state, action) => {
      console.log(action.payload);
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    updateFormData: (state, action) => {
      const { key, data } = action.payload;
      state.formData[key] = data;
    },
    resetWizard: () => initialState,
  },
});

export const { nextStep, prevStep, goToStep, updateFormData, resetWizard, restoreFormData } =
  courseWizardSlice.actions;

export default courseWizardSlice.reducer;

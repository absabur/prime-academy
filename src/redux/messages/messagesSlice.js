import { createSlice } from '@reduxjs/toolkit';
import { fetchMessages } from './messagesAction';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    loadingMessages: true,
    messagePagination: {},
    pageSize: 10,
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
    // messages
    builder
      .addCase(fetchMessages.pending, (state) => {
        // state.loadingMessages = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loadingMessages = false;
        state.messages = action.payload.results;
        state.messagePagination = {
          count: action.payload?.count,
          next: action.payload?.next,
          previous: action.payload?.previous,
        };
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingMessages = false;
        state.error = action.payload?.message ? action.payload?.message : action.payload;
      });
  },
});

export const { clearMessage, clearError } = messageSlice.actions;
export default messageSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { loginUser, refreshAccessToken, registerStudent, verifyEmail } from './authAction';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  authLoaded: false,
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth');
    },
    setCredentials: (state, { payload }) => {
      const { user, accessToken, refreshToken } = payload;
      state.user = user;
      if (accessToken) state.accessToken = accessToken;
      if (refreshToken) state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem('auth', JSON.stringify({ user, accessToken, refreshToken }));
    },
    loadUserFromStorage: (state) => {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (auth?.accessToken) {
        state.user = auth.user;
        state.accessToken = auth.accessToken;
        state.refreshToken = auth.refreshToken;
        state.isAuthenticated = true;
      }
      state.authLoaded = true;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    clearAuthMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = payload.data.user;
        state.accessToken = payload.data.tokens.access;
        state.refreshToken = payload.data.tokens.refresh;
        state.message = 'Logged In SuccessFull!';
        localStorage.setItem(
          'auth',
          JSON.stringify({
            user: payload.data.user,
            accessToken: payload.data.tokens.access,
            refreshToken: payload.data.tokens.refresh,
          })
        );
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = payload.message;
      })
      .addCase(refreshAccessToken.fulfilled, (state, { payload }) => {
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
        const auth = JSON.parse(localStorage.getItem('auth'));
        localStorage.setItem(
          'auth',
          JSON.stringify({ ...auth, accessToken: payload.access, refreshToken: payload.refresh })
        );
      });
    builder
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerStudent.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
      })
      .addCase(registerStudent.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      });
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload.message;
      })
      .addCase(verifyEmail.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      });
  },
});

export const { logout, setCredentials, loadUserFromStorage, clearAuthError, clearAuthMessage } =
  authSlice.actions;
export default authSlice.reducer;

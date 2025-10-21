import api from './axios';
import { logout, refreshAccessToken } from '../redux/auth/authSlice';
import axios from 'axios';

export const setupAxiosInterceptors = (store) => {
  // Attach access token
  api.interceptors.request.use((config) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  // Handle 401 (token expired)
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const { refreshToken } = store.getState().auth;
        if (!refreshToken) {
          store.dispatch(logout());
          return Promise.reject(error);
        }

        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
            { refresh: refreshToken },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );

          // Update Redux
          store.dispatch(refreshAccessToken(res.data));

          // Retry original request with new token
          const newAccessToken = res.data.access;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          store.dispatch(logout());
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

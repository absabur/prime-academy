// src/api/setupAxiosInterceptors.js

import api from "./axios";
import { logout } from "../redux/auth/authSlice";
import { refreshAccessToken } from "../redux/auth/authAction";

export const setupAxiosInterceptors = (store) => {
  // ✅ Attach access token
  api.interceptors.request.use((config) => {
    const { accessToken } = store.getState().auth;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  // ✅ Handle 401 (token expired)
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
          const res = await api.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            { refreshToken }
          );

          // update redux state manually
          store.dispatch(
            refreshAccessToken.fulfilled(res.data, "fulfilled", refreshToken)
          );

          originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return api(originalRequest);
        } catch {
          store.dispatch(logout());
        }
      }
      return Promise.reject(error);
    }
  );
};

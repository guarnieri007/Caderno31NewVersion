import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AuthAPI } from './auth';
import { getAccessToken, setAccessToken } from '../context/AuthTokenSingleton';
import { isAuthError } from './authError';

const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/`;

const api = axios.create({
  baseURL: backendURL,
  withCredentials: true
});

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (err: AxiosError) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error || !token) {
      reject(error!);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    const backendMessage = JSON.stringify(error.response?.data);
    const isAuthEndpoint = originalRequest.url?.includes('auth/');

    if (isAuthError(error.response?.status ?? 0, backendMessage)
      && !originalRequest._retry
      && !isAuthEndpoint) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers)
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject
          });
        });
      }

      isRefreshing = true;

      try {
        const { requestAccessTokenRefresh } = AuthAPI();
        const newToken = await requestAccessTokenRefresh();

        if (newToken) {
          setAccessToken(newToken);
          processQueue(null, newToken);
          if (originalRequest.headers)
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        // opcional: redirecionar logout
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

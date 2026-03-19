import { AxiosError, AxiosResponse } from 'axios';
import api from './axiosInstance';
import { CreatePostProps, Post } from '../interfaces/interfaces';
import { AuthAPI } from './auth';
import { setAccessToken } from '../context/AuthTokenSingleton';
import { isAuthError } from './authError';

export const PostAPI = () => {
  const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/posts`;

  async function requestWithAuthRetry<T>(
    request: () => Promise<AxiosResponse<T>>
  ): Promise<AxiosResponse<T>> {
    try {
      return await request();
    } catch (error) {
      if (error instanceof AxiosError) {
        const msg = error.response?.data?.message;
        const status = error.response?.status || 0;
        if (isAuthError(status, msg)) {
          const { requestAccessTokenRefresh } = AuthAPI();
          const newToken = await requestAccessTokenRefresh();
          if (newToken) {
            setAccessToken(newToken);
            return request();
          }
        }
      }
      throw error;
    }
  }

  const listPosts = async (): Promise<Post[] | null> => {
    try {
      const response = await requestWithAuthRetry(() => api.get<Post[]>(backendURL));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const msg = error.response?.data?.message ?? error.message;
        throw new Error(msg);
      }
      return null;
    }
  };

  const getPost = async (cd_post: number): Promise<Post | null> => {
    try {
      const response = await requestWithAuthRetry(() => api.get<Post>(`${backendURL}/${cd_post}`));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const msg = error.response?.data?.message ?? error.message;
        throw new Error(msg);
      }
      return null;
    }
  };

  const createPost = async (data: CreatePostProps): Promise<Post | undefined> => {
    try {
      const response = await requestWithAuthRetry(() => api.post<Post>(backendURL, data));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const msg = error.response?.data?.message ?? error.message;
        throw new Error(msg);
      }
    }
  };

  const updatePost = async (cd_post: number, data: CreatePostProps): Promise<Post | undefined> => {
    try {
      const response = await requestWithAuthRetry(() => api.put<Post>(`${backendURL}/${cd_post}`, data));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const msg = error.response?.data?.message ?? error.message;
        throw new Error(msg);
      }
    }
  };

  const deletePost = async (cd_post: number): Promise<void> => {
    try {
      await requestWithAuthRetry(() => api.delete(`${backendURL}/${cd_post}`));
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const msg = error.response?.data?.message ?? error.message;
        throw new Error(msg);
      }
    }
  };

  return { listPosts, getPost, createPost, updatePost, deletePost };
};


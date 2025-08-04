import { AxiosError } from 'axios';
import api from './axiosInstance';
import { CreatePostProps, Post } from '../interfaces';

export const PostAPI = () => {
  const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/posts`;

  const listPosts = async (): Promise<Post[] | null> => {
    try {
      const response = await api.get(backendURL);
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
      const response = await api.get(`${backendURL}/${cd_post}`);
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
      const response = await api.post(backendURL, data);
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
      const response = await api.put(`${backendURL}/${cd_post}`, data);
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
      await api.delete(`${backendURL}/${cd_post}`);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const msg = error.response?.data?.message ?? error.message;
        throw new Error(msg);
      }
    }
  };

  return { listPosts, getPost, createPost, updatePost, deletePost };
};


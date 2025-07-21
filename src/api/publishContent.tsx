import { AxiosError } from 'axios';
import api from './axiosInstance';
import { ResponseCategory, ResponseLanguage, ResponsePostType } from '../interfaces';

export const PublishContentAPI = () => {

    const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/`;

    const ListLanguage = async (): Promise<ResponseLanguage[] | null> => {
        try {
            const response = await api.get(`${backendURL}languages`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const msg = error.response?.data?.message ?? error.message;
                throw new Error(msg);
            }
            return null;
        }
    }

    const ListCategories = async (): Promise<ResponseCategory[] | null> => {
        try {
            const response = await api.get(`${backendURL}categories`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const msg = error.response?.data?.message ?? error.message;
                throw new Error(msg);
            }
            return null;
        }
    }

    const ListPostTypes = async (): Promise<ResponsePostType[] | null> => {
        try {
            const response = await api.get(`${backendURL}postTypes/`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                const msg = error.response?.data?.message ?? error.message;
                throw new Error(msg);
            }
            return null;
        }
    }


    return {
        ListLanguage,
        ListCategories,
        ListPostTypes    
    }
}
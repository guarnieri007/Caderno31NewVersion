import { AxiosError, AxiosResponse } from 'axios';
import api from './axiosInstance';
import { AuthAPI } from './auth';
import { setAccessToken } from '../context/AuthTokenSingleton';
import { isAuthError } from './authError';

export interface PriceTablePayload {
  tableId: string;
  layout?: string;
  title?: string;
  subtitle?: string;
  footer?: string;
  note?: string;
  templateId?: string;
  dotTemplateId?: string;
  bgImage?: string | null;
  bgOverlay?: number;
  avatar?: string | null;
  showCats?: boolean;
  categories?: {
    id: string;
    name: string;
    items: {
      id: string;
      name: string;
      price: string;
      priceText: string;
      description: string;
    }[];
  }[];
  fontSizes?: object;
  customDotColors?: object;
  customGridColors?: object;
}

export interface PriceTableResponse {
  _id: string;
  user: string;
  tableId: string;
  layout: string;
  title: string;
  subtitle: string;
  footer: string;
  note: string;
  templateId: string;
  dotTemplateId: string;
  bgImage: string | null;
  bgOverlay: number;
  avatar: string | null;
  showCats: boolean;
  categories: {
    id: string;
    name: string;
    items: {
      id: string;
      name: string;
      price: string;
      priceText: string;
      description: string;
    }[];
  }[];
  fontSizes?: object;
  customDotColors?: object;
  customGridColors?: object;
  createdAt: string;
  updatedAt: string;
}

export interface PriceTableListResponse {
  data: PriceTableResponse[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const PriceTableAPI = () => {
  const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/priceTables`;

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

  const listPriceTables = async (userId: string, page = 1, limit = 50): Promise<PriceTableListResponse | null> => {
    try {
      const response = await api.get<PriceTableListResponse>(backendURL, {
        params: { user: userId, page, limit },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const msg = error.response?.data?.message ?? error.message;
        throw new Error(msg);
      }
      return null;
    }
  };

  const getPriceTable = async (id: string): Promise<PriceTableResponse | null> => {
    try {
      const response = await api.get<PriceTableResponse>(`${backendURL}/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const msg = error.response?.data?.message ?? error.message;
        throw new Error(msg);
      }
      return null;
    }
  };

  const createPriceTable = async (data: PriceTablePayload): Promise<PriceTableResponse | undefined> => {
    try {
      const response = await requestWithAuthRetry(() =>
        api.post<PriceTableResponse>(backendURL, data)
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const msg = error.response?.data?.message ?? error.message;
        throw new Error(msg);
      }
    }
  };

  const updatePriceTable = async (id: string, data: Partial<Omit<PriceTablePayload, 'tableId'>>): Promise<PriceTableResponse | undefined> => {
    try {
      const response = await requestWithAuthRetry(() =>
        api.put<PriceTableResponse>(`${backendURL}/${id}`, data)
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const msg = error.response?.data?.message ?? error.message;
        throw new Error(msg);
      }
    }
  };

  const deletePriceTable = async (id: string): Promise<void> => {
    try {
      await requestWithAuthRetry(() => api.delete(`${backendURL}/${id}`));
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const msg = error.response?.data?.message ?? error.message;
        throw new Error(msg);
      }
    }
  };

  return { listPriceTables, getPriceTable, createPriceTable, updatePriceTable, deletePriceTable };
};

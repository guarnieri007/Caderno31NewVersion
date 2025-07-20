import { AxiosError } from 'axios';
import api from './axiosInstance';
import { AcessTokenResponse, CreateNewCredentialProps } from '../interfaces';

export const AuthAPI = () => {
  const backendURL = `${import.meta.env.VITE_BACKEND_PROTOCOAL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/api/`;

  const getJWTToken = async (email: string, password: string) => {
    try {
      const response: AcessTokenResponse = await api.post(`${backendURL}auth/login`, {
        email,
        password,
      }, {
        withCredentials: true // Garantir que os cookies sejam enviados
      });
      return response.data?.accessToken;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        const msg = err.response?.data?.message ?? err.message;
        throw new Error(msg);
      }
    }
  }

  const CreateNewCredential = async ({ data }: CreateNewCredentialProps) => {
    try {
      console.log("entrou no create credential");
      await api.post(`${backendURL}credentials`, {
        email: data.email,
        username: data.username,
        password: data.password,
      });
    }
    catch (error) {
      if (error instanceof AxiosError && error.response) {
        const backendErrors = error.response.data?.errors;

        if (!backendErrors) {
          console.error('Erro ao criar usuário:', error.response.data);
          throw new Error(error.response.data.message);
        }
        throw new Error(backendErrors);
      }
    }
  }

  async function requestAccessTokenRefresh(): Promise<string | undefined> {

    try {
      const res = await api.post(`${backendURL}auth/refresh`, {}, {
        withCredentials: true,
      });
      const accessToken: string = res.data!.accessToken;
      return accessToken;
    }
    catch (error) {
      console.error('Failed to refresh access token:', error);
    }
  }

  async function requestLogout() {
    try {
      await api.post(`${backendURL}auth/logout`, {}, { withCredentials: true, });
    } catch (error) {
      console.error('Failed to logout on server:', error);
    }
  }

  async function requestUserData(token: string) {

    try {
      const res = await api.get(`${backendURL}credentials`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: false,
      });
      return res.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }

  return {
    getJWTToken,
    CreateNewCredential,
    requestAccessTokenRefresh,
    requestUserData,
    requestLogout
  };

}





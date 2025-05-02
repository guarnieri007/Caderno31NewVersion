import axios from 'axios';

export interface AcessTokenResponse {
  data?: {
    accessToken: string;
  };
}

export interface CreateNewCredentialProps {
  data: {
    email: string;
    username: string;
    password: string;
  }
}

export const AuthAPI = () => {
  const getJWTToken = async (email: string, password: string) => {
    try {
      const response: AcessTokenResponse = await axios.post('http://192.168.100.149:3003/api/auth/login', {
        email,
        password,
      }, {
        withCredentials: true // Garantir que os cookies sejam enviados
      });
      return response.data?.accessToken;
    } catch (error) {
      console.error('Erro ao obter o CSRF token:', error);
    }
  }

  const CreateNewCredential = async ({ data }: CreateNewCredentialProps) => {
    try {
      await axios.post('http://192.168.100.149:3003/api/credentials/', {
        email: data.email,
        username: data.username,
        password: data.password,
      });
    }
    catch (error) {

      if (!axios.isAxiosError(error) || !error.response) {
        console.error('Erro desconhecido:', error);
        return;
      }

      const backendErrors = error.response.data.errors;

      if (!backendErrors) {
        console.error('Erro ao criar usuário:', error.response.data);
        return;
      }
    }
  }

  async function requestAccessTokenRefresh(): Promise<string | undefined> {

    try {
      const res = await axios.post('http://192.168.100.149:3003/api/auth/refresh', {}, {
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
      await axios.post('http://192.168.100.149:3003/api/auth/logout', {}, { withCredentials: true, });
    } catch (error) {
      console.error('Failed to logout on server:', error);
    }
  }

  async function requestUserData(token: string) {

    try {
      const res = await axios.get('http://192.168.100.149:3003/api/credentials', {
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





import axios, { AxiosError } from 'axios';

interface AcessTokenResponse {
    data?: {
        accessToken: string;
    };
}

async function getJWTToken(email: string, password: string) {
    try {
        const response: AcessTokenResponse = await axios.post('http://localhost:3003/api/auth/login', {
            email,
            password,
        }, {
            withCredentials: true // Garantir que os cookies sejam enviados
        });
        return response;
    } catch (error) {
        console.error('Erro ao obter o CSRF token:', error);
    }
}

export const login = async (email: string, password: string) => {
    try {
        // Primeiro, obtenha o token CSRF
        const response = await getJWTToken(email, password);

        if (response === undefined) {
            console.log('Response is null', response);
            return;
        }
        else if (response.data === undefined) {
            console.log('Response data is null', response.data);
            return;
        }
        
        return response?.data.accessToken;
    } catch (err: unknown) {
        const error = err as AxiosError;
        console.error('Erro ao fazer login:', error.response?.data);
    }
}

interface CreateNewCredentialProps {
    data: {
      email: string;
      username: string;
      password: string;
    }
  }
  
  export const CreateNewCredential = async ({ data}: CreateNewCredentialProps) => {
    try {
      await axios.post('http://localhost:3003/api/credentials/', {
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
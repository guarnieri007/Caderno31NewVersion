import { createContext, useContext, useState, useEffect } from 'react';
import { AuthAPI } from '../api/auth';
import { setAccessToken, getAccessToken } from './AuthTokenSingleton';
import { AuthContextType, CreateNewCredentialProps, User } from '../interfaces';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const {
    getJWTToken,
    requestAccessTokenRefresh,
    requestUserData,
    requestLogout,
    CreateNewCredential,
  } = AuthAPI();

  // Quando o app inicia, não tem token salvo, mas pode ter um refreshToken HttpOnly
  useEffect(() => {
    async function tryRecoverSession() {
      try {
        const token = await requestAccessTokenRefresh();
        if (!token) return;

        setAccessToken(token);
        await getUserData(token);

      } catch (error) {
        console.log('No active session found.', error);
      }
    }

    tryRecoverSession();
  }, []);

  async function login(email: string, password: string) {
    try {
      const token = await getJWTToken(email, password);
      if (token) {
        setAccessToken(token);
        await getUserData(token);
      } else {
        throw new Error('Email or password not found');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async function accessTokenRefresh() {
    try {
      const accessToken = await requestAccessTokenRefresh();
      if (accessToken) {
        setAccessToken(accessToken);
        await getUserData(accessToken);
      }
    }
    catch (error) {
      console.error('Failed to refresh token:', error);
    }
  }

  async function getUserData(tokenOverride?: string): Promise<User | undefined> {
    const tokenToUse = tokenOverride || getAccessToken();
    if (!tokenToUse) return;

    try {
      const userData: User = await requestUserData(tokenToUse);
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      //await logout(); // Se deu erro (ex: token expirado), já faz logout seguro
    }
  }

  async function logout() {
    try {
      await requestLogout();
    } catch (error) {
      console.error('Failed to logout on server:', error);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }

  async function createCredential(data: CreateNewCredentialProps) {
    try {
      await CreateNewCredential(data);
    } catch (error) {
      console.error('Failed to create a new user on server:', error);
    }
  }

  return (
    <AuthContext.Provider value={{
      access_Token: getAccessToken(),
      user,
      login,
      getUserData,
      logout,
      setAccessToken,
      accessTokenRefresh,
      createCredential
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

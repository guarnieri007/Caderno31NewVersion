import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function useLogin() {
  const { login } = useAuth();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const [successLogin, setSuccessLogin] = useState<boolean>(false);

  async function handleLogin(email: string, password: string) {
    setLoadingLogin(true);
    setErrorLogin(null);
    try {
      await login(email, password);
      setSuccessLogin(true);
    } catch (err) {
      setErrorLogin(`${err}`);
    } finally {
      setLoadingLogin(false);
    }
  }

  return { handleLogin, loadingLogin, errorLogin, successLogin, setSuccessLogin };
}
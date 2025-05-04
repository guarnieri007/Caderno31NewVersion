import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function useCredential() {
  const { getUserData } = useAuth();
  const [loadingCredential, setLoadingCredential] = useState(false);
  const [errorCredential, setErrorCredential] = useState<string | null>(null);
  const [successCredential, setSuccessCredential] = useState<boolean>(false);

  async function handleCredential() {
    setLoadingCredential(true);
    setErrorCredential(null);
    try {
      await getUserData();
      setSuccessCredential(true);
    } catch (err) {
      setErrorCredential(`Erro ao fazer Credential: ${err}`);
    } finally {
      setLoadingCredential(false);
    }
  }

  return { handleCredential, loadingCredential, errorCredential, successCredential, setSuccessCredential };
}
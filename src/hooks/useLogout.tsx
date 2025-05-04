import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function useLogout() {
    const { logout } = useAuth();
    const [loadingLogout, setLoadingLogout] = useState(false);
    const [errorLogout, setErrorLogout] = useState<string | null>(null);
    const [successLogout, setSuccessLogout] = useState<boolean>(false);

    async function handleLogout() {
        setLoadingLogout(true);
        setErrorLogout(null);
        try {
          await logout();
          setSuccessLogout(true);
        } catch (err) {
          setErrorLogout(`Erro ao fazer Logout: ${err}`);
        } finally {
          setLoadingLogout(false);
        }
      }

      return { handleLogout, loadingLogout, errorLogout, successLogout, setSuccessLogout };
}
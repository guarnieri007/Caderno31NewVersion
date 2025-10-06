import { useState } from 'react';
import { useForgotPw } from '../context/ForgotPasswordContext';

export function useForgotPassword() {
  const { forgotPwHandler } = useForgotPw();
  const [loadingForgotPassword, setLoadingForgotPassword] = useState(false);
  const [errorForgotPassword, setErrorForgotPassword] = useState<string | null>(null);
  const [successForgotPassword, setSuccessForgotPassword] = useState(false);

  async function handleForgotPassword(email: string) {
    setLoadingForgotPassword(true);
    setErrorForgotPassword(null);
    try {
      await forgotPwHandler(email);
      setSuccessForgotPassword(true);
    } catch (err) {
      setErrorForgotPassword(`${err}`);
      throw err;
    } finally {
      setLoadingForgotPassword(false);
    }
  }

  return { handleForgotPassword, loadingForgotPassword, errorForgotPassword, successForgotPassword, setSuccessForgotPassword };
}


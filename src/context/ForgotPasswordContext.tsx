import { createContext, ReactNode, useContext } from 'react';
import { AuthAPI } from '../api/auth';
import { ForgotPasswordContextType, } from '../interfaces';
import { useLanguage } from './Language';

const ForgotPasswordContext = createContext<ForgotPasswordContextType>({} as ForgotPasswordContextType);

export const ForgotPasswordProvider = ({ children }: { children: ReactNode }) => {
  const {
    forgotPassword,
  } = AuthAPI();

  const { getLanguage } = useLanguage();


  async function forgotPwHandler(email: string) {
    try {
      await forgotPassword(email, getLanguage());
    } catch (error) {
      throw new Error(`${error}`).message;
    }
  }

  return (
    <ForgotPasswordContext.Provider value={{
      forgotPwHandler,
    }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export function useForgotPw() {
  return useContext(ForgotPasswordContext);
}

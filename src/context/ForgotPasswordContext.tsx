import { createContext, ReactNode, useContext } from 'react';
import { AuthAPI } from '../api/auth';
import { ForgotPasswordContextType, } from '../interfaces';

const ForgotPasswordContext = createContext<ForgotPasswordContextType>({} as ForgotPasswordContextType);

export const ForgotPasswordProvider = ({ children }: { children: ReactNode }) => {
  const {
    forgotPassword,
  } = AuthAPI();


  async function forgotPwHandler(email: string) {
    try {
      await forgotPassword(email);
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

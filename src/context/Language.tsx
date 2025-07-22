import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface LanguageContextProps {
  language: string;
  changeLanguage: (lang: string) => void;
  getLanguage: () => string;
}

const LanguageContext = createContext<LanguageContextProps>({} as LanguageContextProps);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('lang') ?? 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('lang', language);
  }, [language]);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  const getLanguage = () => {
    return language;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, getLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

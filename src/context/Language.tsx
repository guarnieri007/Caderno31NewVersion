import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface LanguageContextProps {
  language: string;
  changeLanguage: (lang: string) => void;
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

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

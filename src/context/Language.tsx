import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface LanguageContextProps {
  language: string;
  changeLanguage: (lang: string) => void;
  getLanguage: () => string;
  cd_language: () => number | undefined;
}
export type Language = {
    cd_language: number;
    flag: string;
  };
  export const languages: Map<string, Language> = new Map([
    ["pt", { cd_language: 2, flag: "🇧🇷" }],
    ["en", { cd_language: 1, flag: "🇺🇸" }],
    ["es", { cd_language: 3, flag: "🇦🇷" }],
  ]);

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

  const cd_language = () =>languages.get(language)?.cd_language;

  return (
    <LanguageContext.Provider value={{ language, cd_language, changeLanguage, getLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

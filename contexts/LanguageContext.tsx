import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { translations } from '../translations';

type Language = 'ar' | 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const language: Language = 'ar'; // Hardcode to Arabic

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]); // Will run only once

  const t = (key: string) => {
    // Basic key-path navigation
    const keys = key.split('.');
    let result: any = translations[language];
    try {
      for (const k of keys) {
        result = result[k];
      }
    } catch (error) {
        return key;
    }
    return result || key;
  };

  // setLanguage is now a no-op function as language is fixed
  const setLanguage = () => {};

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
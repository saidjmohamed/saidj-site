import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../translations';

export type Language = 'ar' | 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const getInitialLanguage = (): Language => {
    // 1. Check local storage
    const storedLang = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    if (storedLang && ['ar', 'fr', 'en'].includes(storedLang)) {
        return storedLang as Language;
    }
    // 2. Check browser language
    const browserLang = typeof window !== 'undefined' ? navigator.language.split('-')[0] : 'ar';
    if (['ar', 'fr', 'en'].includes(browserLang)) {
        return browserLang as Language;
    }
    // 3. Default to Arabic
    return 'ar';
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string) => {
    const keys = key.split('.');
    let result: any = translations[language] || translations['ar'];
    try {
      for (const k of keys) {
        if (result === undefined) break;
        result = result[k];
      }
    } catch (error) {
        return key;
    }
    return result || key;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

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
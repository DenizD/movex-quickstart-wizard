
import React, { useState, useEffect } from 'react';
import { LanguageContext, Language, useTranslation } from '@/hooks/useLanguage';

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');
  const { t } = useTranslation(language);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('movex_language') as Language | null;
    if (savedLanguage && ['de', 'en', 'es', 'zh-TW'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('movex_language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

import { useLocalstorageState } from '@shared/utils';
import * as React from 'react';

type Languages = 'KG' | 'RU' | 'EN';

interface IStore {
   currentLanguage: Languages;
   setLanguage: (language: Languages) => void;
   t: {
      raw: <T = any>(key: string) => T;
      get: (key: string, params?: Record<string, string | number>) => string;
   };
}

const LanguageContext = React.createContext<IStore | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
   const [currentLanguage, setCurrentLanguage] = useLocalstorageState<Languages>('language', 'EN');
   const [messages, setMessages] = React.useState<Record<string, any>>({});

   React.useEffect(() => {
      fetch(`/locales/${currentLanguage.toLowerCase()}.json`)
         .then(res => res.json())
         .then(setMessages);
   }, [currentLanguage]);

   const setLanguage = React.useCallback((language: Languages) => setCurrentLanguage(language), []);

   const t = React.useMemo(
      () => ({
         raw: <T = any>(key: string): T => {
            const keys = key.split('.');
            return keys.reduce((result: any, k) => result?.[k], messages) as T;
         },
         get: (key: string, params?: Record<string, string | number>): string => {
            const keys = key.split('.');
            let value = keys.reduce((result: any, k) => result?.[k], messages) ?? key;

            if (typeof value === 'string' && params) {
               return Object.entries(params).reduce(
                  (str, [paramKey, paramValue]) => str.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue)),
                  value,
               );
            }
            return value;
         },
      }),
      [messages],
   );

   return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguages = () => {
   const context = React.useContext(LanguageContext);
   if (!context) throw new Error('useLanguages must be used within a LanguageProvider');
   return context;
};

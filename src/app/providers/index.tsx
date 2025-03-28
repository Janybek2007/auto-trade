import { ToastContainer } from '@features/toast';
import { QueryClientProvider } from './QueryClientProvider';
import { LanguageProvider } from '@shared/libs/intl';
import React from 'react';

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => (
   <>
      <LanguageProvider>
         <ToastContainer />
         <QueryClientProvider>{children}</QueryClientProvider>
      </LanguageProvider>
   </>
);

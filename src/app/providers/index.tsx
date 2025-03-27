import { ToastContainer } from '@features/toast';
import { QueryClientProvider } from './QueryClientProvider';
import React from 'react';

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => (
   <>
      <ToastContainer />
      <QueryClientProvider>{children}</QueryClientProvider>
   </>
);

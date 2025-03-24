import { QueryClientProvider } from './QueryClientProvider';
import React from 'react';

export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => (
   <>
      <QueryClientProvider>{children}</QueryClientProvider>
   </>
);

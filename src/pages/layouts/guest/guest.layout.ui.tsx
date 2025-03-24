import { Outlet } from '@tanstack/react-router'
import { Header } from '@widgets/header';
import React from 'react';

export const GuestLayout: React.FC = () => {
   return (
      <>
         <Header />
         <Outlet />
      </>
   );
};

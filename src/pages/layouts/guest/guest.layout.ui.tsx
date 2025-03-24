import { Header } from '@widgets/header';
import React from 'react';
import { Outlet } from 'react-router';

export const GuestLayout: React.FC = () => {
   return (
      <>
         <Header />
         <Outlet />
      </>
   );
};

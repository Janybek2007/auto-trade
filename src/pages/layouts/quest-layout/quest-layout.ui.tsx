import React from 'react';
import { Outlet } from '@tanstack/react-router';
import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';
import styles from './styles.module.scss';

export const GuestLayout: React.FC = () => {
   return (
      <div className={styles.layout}>
         <Header />
         <Outlet />
         <Footer />
      </div>
   );
};

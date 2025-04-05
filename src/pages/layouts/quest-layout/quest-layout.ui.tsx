import React from 'react';
import { Outlet, useLocation } from '@tanstack/react-router';
import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';
import styles from './styles.module.scss';

export const GuestLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      {!isHomePage && <Footer />}
    </div>
  );
};
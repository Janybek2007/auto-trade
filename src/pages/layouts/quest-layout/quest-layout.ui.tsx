import { Outlet } from '@tanstack/react-router';
import { Header } from '@widgets/header';

export const GuestLayout: React.FC = () => {
   return (
      <>
         <Header />
         <Outlet />
      </>
   );
};

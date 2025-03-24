import { lazy } from 'react';

const HomePage = lazy(() => import('./home-page.ui').then(module => ({ default: module.HomePage })));

export default HomePage;

import { lazy } from 'react';

const FiltrationPage = lazy(() => import('./filtration-page.ui').then(module => ({ default: module.FiltrationPage })));

export default FiltrationPage;

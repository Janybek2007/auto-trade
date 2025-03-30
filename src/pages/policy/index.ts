import { lazy } from 'react';

const PolicyPage = lazy(() => import('./policy-page.ui').then(module => ({ default: module.PolicyPage })));

export default PolicyPage;

import { lazy } from 'react';

const ComparePage = lazy(() => import('./compare-page.ui').then(module => ({ default: module.ComparePage })));

export default ComparePage;

import { createFileRoute } from 'node_modules/@tanstack/react-router/dist/cjs/fileRoute.cjs';
import { lazy } from 'react';

const ComparePage = lazy(() => import('./compare-page.ui').then(module => ({ default: module.ComparePage })));

export const Route = createFileRoute('/compare/compare-page')({
   component: ComparePage,
});

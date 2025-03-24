import { lazy } from 'react';

const Page404 = lazy(() =>
   import('./page-404.ui').then(module => ({
      default: module.Page404,
   })),
);

export default Page404;

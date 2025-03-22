import { lazy } from 'react';
import type { Route } from './+types/home-page.route'

const homePageLoader = (args: Route.ClientLoaderArgs) =>
   import('./home-page.model').then(module => module.HomeLoader.homePage(args));

const HomePage = lazy(() => import('./home-page.ui').then(module => ({ default: module.HomePage })));

export const clientLoader = homePageLoader;

export function HydrateFallback() {
   return <></>;
}

export default HomePage;

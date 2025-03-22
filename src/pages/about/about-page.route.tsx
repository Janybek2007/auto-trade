import { lazy } from 'react';
import type { Route } from './+types/about-page.route'

const aboutPageLoader = (args: Route.ClientLoaderArgs) =>
   import('./about-page.model').then(module => module.AboutLoader.aboutPage(args));

const AboutPage = lazy(() => import('./about-page.ui').then(module => ({ default: module.AboutPage })));

export const clientLoader = aboutPageLoader;

export function HydrateFallback() {
   return <></>;
}

export default AboutPage;

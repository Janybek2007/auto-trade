import { lazy } from 'react';
import type { Route } from './+types/car-detail-page.route'

const carDetailPageLoader = (args: Route.ClientLoaderArgs) =>
   import('./car-detail-page.model').then(module => module.CarDetailLoader.carDetialPage(args));

const CarDetailPage = lazy(() => import('./car-detail-page.ui').then(module => ({ default: module.CarDetailPage })));

export const clientLoader = carDetailPageLoader;

export function HydrateFallback() {
   return <></>;
}

export default CarDetailPage;

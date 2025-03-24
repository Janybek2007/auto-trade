import { lazy } from 'react';
import type { Route } from './+types/guest-layout.route'

const questLayoutLoader = (args: Route.ClientLoaderArgs) =>
   import('./guest-layout.model').then(module => module.GuestLoader.guestLayout(args));

const GuestLayout = lazy(() => import('./guest.layout.ui').then(module => ({ default: module.GuestLayout })));

export const clientLoader = questLayoutLoader;

export function HydrateFallback() {
   return <></>;
}

export default GuestLayout;

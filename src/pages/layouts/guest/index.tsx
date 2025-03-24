import { lazy } from 'react';

const GuestLayout = lazy(() =>
	import('./guest.layout.ui').then(module => ({ default: module.GuestLayout }))
);

export default GuestLayout;

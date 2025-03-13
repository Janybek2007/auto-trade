import { homePageRoute } from '@pages/home/home-page.route'
import { compose } from '@shared/libs/react';
import { pathKeys } from '@shared/libs/react-router/config';
import { createElement, lazy } from 'react';
import type { LoaderFunctionArgs, RouteObject } from 'react-router';

const guestLayoutLoader = (args: LoaderFunctionArgs) =>
	import('./guest-layout.model').then(module =>
		module.GuestLoader.guestLayout(args)
	);

const GuestLayout = lazy(() =>
	import('./guest.layout.ui').then(module => ({ default: module.GuestLayout }))
);

export const guestLayoutRoute: RouteObject = {
	path: pathKeys.root,
	element: createElement(compose()(GuestLayout)),
	loader: guestLayoutLoader,
	children: [homePageRoute]
};

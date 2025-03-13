import { lazy, createElement } from 'react';
import type { LoaderFunctionArgs, RouteObject } from 'react-router';
import { compose } from '@shared/libs/react';
import { pathKeys } from '@shared/libs/react-router/config';

const homePageLoader = (args: LoaderFunctionArgs) =>
	import('./home-page.model').then(module => module.HomeLoader.homePage(args));

const HomePage = lazy(() =>
	import('./home-page.ui').then(module => ({ default: module.HomePage }))
);

export const homePageRoute: RouteObject = {
	path: pathKeys.home(),
	element: createElement(compose()(HomePage)),
	loader: homePageLoader,
};

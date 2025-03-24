import { lazy, createElement } from 'react';
import type { LoaderFunctionArgs, RouteObject } from 'react-router';
import { compose } from '@shared/libs/react';
import { pathKeys } from '@shared/libs/react-router/config';

const aboutPageLoader = (args: LoaderFunctionArgs) =>
	import('./about-page.model').then(module => module.AboutLoader.aboutPage(args));

const AboutPage = lazy(() =>
	import('./about-page.ui').then(module => ({ default: module.AboutPage }))
);

export const aboutPageRoute: RouteObject = {
	path: pathKeys.about(),
	element: createElement(compose()(AboutPage)),
	loader: aboutPageLoader,
};

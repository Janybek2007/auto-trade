import { compose, withSuspense } from '@shared/libs/react';
import { pathKeys } from '@shared/libs/react-router/config';
import { createElement, lazy } from 'react';
import type { RouteObject } from 'react-router';

const Page404 = lazy(() =>
	import('./page-404.ui').then(module => ({
		default: module.Page404
	}))
);

const enhance = compose(component =>
	withSuspense(component, {
		fallback: <>Loading...</>
	})
);

export const page404Route: RouteObject = {
	path: pathKeys.page404(),
	element: createElement(enhance(Page404))
};

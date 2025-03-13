import { page404Route } from '@pages/404'
import { guestLayoutRoute } from '@pages/layouts'
import { pathKeys } from '@shared/libs/react-router/config';
import { createElement } from 'react';
import {
	Outlet,
	RouterProvider,
	createBrowserRouter,
	redirect,
	useRouteError
} from 'react-router';

export function BrowserRouter() {
	return <RouterProvider router={browserRouter} />;
}

const browserRouter = createBrowserRouter([
	{
		errorElement: <BubbleError />,
		children: [
			guestLayoutRoute,
			{
				element: createElement(Outlet),
				children: [page404Route]
			},
			{
				loader: async () => redirect(pathKeys.page404()),
				path: '*'
			}
		]
	}
]);

// https://github.com/remix-run/react-router/discussions/10166
function BubbleError() {
	const error = useRouteError();

	if (error) throw error;
	return null;
}

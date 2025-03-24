import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { CatchBoundary, NotFound } from '@shared/components';

export function createRouter() {
	const router = createTanStackRouter({
		routeTree,
		defaultPreload: 'intent',
		defaultErrorComponent: CatchBoundary,
		defaultNotFoundComponent: () => <NotFound />,
		scrollRestoration: true
	});

	return router;
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}

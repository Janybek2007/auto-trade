import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';
import '@shared/styles';
import { CatchBoundary, NotFound } from '@shared/components';

const router = createRouter({
   routeTree,
   defaultStaleTime: 5000,
   scrollRestoration: true,
   defaultPreload: 'intent',
   defaultErrorComponent: CatchBoundary,
   defaultNotFoundComponent: () => <NotFound />,
});

declare module '@tanstack/react-router' {
   interface Register {
      router: typeof router;
   }
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
   const root = ReactDOM.createRoot(rootElement);
   root.render(<RouterProvider router={router} />);
}

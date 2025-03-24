import { lazy } from 'react';
import type { Route } from './+types/home-page.route';

const homePageLoader = (args: Route.ClientLoaderArgs) =>
   import('./home-page.model').then(module => module.HomeLoader.homePage(args));

const HomePage = lazy(() => import('./home-page.ui').then(module => ({ default: module.HomePage })));

export const clientLoader = homePageLoader;

/*
export async function loader({ params }: Route.LoaderArgs) {
  let team = await fetchTeam(params.teamId);
  return { name: team.name };
}

export async function action({ request }) {
  const data = await request.formData();
  const todo = await fakeDb.addItem({
    title: data.get("title"),
  });
  return { ok: true };
}

export async function clientAction({ serverAction }) {
  fakeInvalidateClientSideCache();
  // can still call the server action if needed
  const data = await serverAction();
  return data;
}


import {
  isRouteErrorResponse,
  useRouteError,
} from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}

export function headers() {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}

export function links() {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: "https://example.com/some/styles.css",
    },
    {
      rel: "preload",
      href: "/images/banner.jpg",
      as: "image",
    },
  ];
}


export function meta() {
  return [
    { title: "Very cool app" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
}

*/

export function HydrateFallback() {
   return <p>Loading Game...</p>;
}

export default HomePage;

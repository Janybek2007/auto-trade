import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';
import { pathKeys } from '../shared/libs/react-router';

export default [
   route(pathKeys.page404(), '../pages/404/page-404.route.tsx'),
   layout('../pages/layouts/guest/guest-layout.route.tsx', [
      route(pathKeys.about(), '../pages/about/about-page.route.tsx'),
      index('../pages/home/home-page.route.tsx'),
      route(pathKeys.cars.detail(':id'), '../pages/car-details/car-detail-page.route.tsx'),
   ]),
] satisfies RouteConfig;

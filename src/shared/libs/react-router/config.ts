import type { SlugPageParams } from './react-router.types';

export const pathKeys = {
   root: '/',
   home() {
      return pathKeys.root;
   },
   about() {
      return pathKeys.root.concat('about/');
   },
   page404() {
      return '/404/';
   },
   cars: {
      root() {
         return pathKeys.root.concat('cars/');
      },
      detail(id: string) {
         return pathKeys.cars.root().concat(id + '/');
      },
   },
};

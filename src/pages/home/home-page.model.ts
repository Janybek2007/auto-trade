import type { Route } from './+types/home-page.route'

class HomeModel {}

export class HomeLoader {
   static async homePage(args: Route.ClientLoaderArgs) {}
}

export const homeModel = new HomeModel();

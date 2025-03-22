import type { Route } from './+types/car-detail-page.route'

export class CarDetailLoader {
   static async carDetialPage(args: Route.ClientLoaderArgs) {}
}

class CarDetailModel {}

export const carDetailModel = new CarDetailModel();

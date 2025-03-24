import type { Route } from './+types/about-page.route'

export class AboutLoader {
   static async aboutPage(args: Route.ClientLoaderArgs) {}
}

class AboutModel {}

export const aboutModel = new AboutModel();

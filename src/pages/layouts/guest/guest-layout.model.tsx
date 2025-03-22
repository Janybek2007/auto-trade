import type { Route } from './+types/guest-layout.route'

export class GuestLoader {
	static async guestLayout(args: Route.ClientLoaderArgs) {
		
	}
}

class GuestModel {
}

export const guestModel = new GuestModel();

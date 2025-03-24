import type { SlugPageParams } from './react-router.types';

export const pathKeys = {
	root: '/',
	home() {
		return pathKeys.root
	},
	about() {
		return pathKeys.root.concat('about/')
	},
	page404() {
		return pathKeys.root.concat('404/');
	}
};

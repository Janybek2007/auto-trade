import type { SlugPageParams } from './react-router.types';

export const pathKeys = {
	root: '/',
	home() {
		return pathKeys.root
	},
	page404() {
		return pathKeys.root.concat('404/');
	}
};

import { lazy } from 'react';

const CarDetailPage = lazy(() =>
	import('./car-detail-page.ui').then(module => ({
		default: module.CarDetailPage
	}))
);

export default CarDetailPage;

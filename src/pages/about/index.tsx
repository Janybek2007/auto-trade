import { lazy } from 'react';

const AboutPage = lazy(() =>
	import('./about-page.ui').then(module => ({ default: module.AboutPage }))
);

export default AboutPage;

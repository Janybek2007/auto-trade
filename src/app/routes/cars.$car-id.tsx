import CarDetailPage from '@pages/car-details'
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cars/$car-id')({
	component: CarDetailPage
});

import CarDetailPage from '@pages/car-details';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_guest-layout/cars/$car-id')({
   component: CarDetailPage,
   validateSearch: z.object({
      by: z.enum(['america', 'dubai', 'korea']),
   }),
});

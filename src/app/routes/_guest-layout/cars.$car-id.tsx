import CarDetailPage from '@pages/car-details';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest-layout/cars/$car-id')({
   component: CarDetailPage,
   validateSearch: (search: Record<string, any>) =>
      ({
         by: ['korea', 'dubai', 'america'].includes(search?.by) ? search.by : 'america',
      }) as { by: 'korea' | 'dubai' | 'america' },
});

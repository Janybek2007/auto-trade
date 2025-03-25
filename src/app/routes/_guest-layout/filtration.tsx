import FiltrationPage from '@pages/filtration';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest-layout/filtration')({
   component: FiltrationPage,
   validateSearch: (search: Record<string, any>) => ({
      by: ['korea', 'dubai', 'america'].includes(search?.by) ? search.by : 'america',
   }),
});

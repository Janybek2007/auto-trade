import { ComparesProvider } from '@features/compares';
import ComparePage from '@pages/compare';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest-layout/compare')({
   component: Page,
   validateSearch: (search: Record<string, any>) =>
      ({
         by: ['korea', 'dubai', 'america'].includes(search?.by) ? search.by : 'america',
      }) as { by: 'korea' | 'dubai' | 'america' },
});

function Page() {
   return (
      <ComparesProvider>
         <ComparePage />
      </ComparesProvider>
   );
}

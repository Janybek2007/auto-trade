import FiltrationPage from '@pages/filtration';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_guest-layout/filtration')({
   component: FiltrationPage,
   validateSearch: z.object({
      by: z.enum(['america', 'dubai', 'korea']),
   }),
});

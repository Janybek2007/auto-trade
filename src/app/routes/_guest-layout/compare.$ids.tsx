import ComparePage from '@pages/compare';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_guest-layout/compare/$ids')({
   component: ComparePage,
   validateSearch: z.object({
      by: z.enum(['america', 'dubai', 'korea']),
      // ids: z.array(z.number()).optional(),
   }),
});

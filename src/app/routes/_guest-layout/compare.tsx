import ComparePage from '@pages/compare';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest-layout/compare')({
   component: ComparePage,
});

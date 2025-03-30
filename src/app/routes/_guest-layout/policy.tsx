import PolicyPage from '@pages/policy';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest-layout/policy')({
   component: PolicyPage,
});

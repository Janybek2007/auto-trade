import HomePage from '@pages/home'
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest-layout/_home/')({
   component: HomePage,
});

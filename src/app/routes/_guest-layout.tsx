import GuestLayout from '@pages/layouts/guest';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest-layout')({
	component: GuestLayout
});

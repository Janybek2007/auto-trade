import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@shared/libs/react-query';

export function QueryClientProvider(props: React.PropsWithChildren) {
	const { children } = props;

	return (
		<TanStackQueryClientProvider client={queryClient}>
			{children}
		</TanStackQueryClientProvider>
	);
}

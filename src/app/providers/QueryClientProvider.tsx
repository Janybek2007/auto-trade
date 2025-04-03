import { queryClient } from '@shared/libs/tanstack';
import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query';

export function QueryClientProvider(props: React.PropsWithChildren) {
   const { children } = props;

   return <TanStackQueryClientProvider client={queryClient}>{children}</TanStackQueryClientProvider>;
}

import { compose } from '@shared/libs/react';
import { withErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from './QueryClientProvider';
import { BrowserRouter } from './RouteProvider';
import { ErrorHandler, logError } from '@shared/components'

const enhance = compose(component =>
	withErrorBoundary(component, {
		FallbackComponent: ErrorHandler,
		onError: logError
	})
);

export const Provider = enhance(() => (
	<>
			<QueryClientProvider>
				<BrowserRouter />
			</QueryClientProvider>
	</>
));

import { compose } from '@shared/libs/react';
import { withErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from './QueryClientProvider';
import { ErrorHandler, logError } from '@shared/components';
import { Outlet } from 'react-router';

const enhance = compose(component =>
   withErrorBoundary(component, {
      FallbackComponent: ErrorHandler,
      onError: logError,
   }),
);

export const Provider = enhance(() => (
   <>
      <QueryClientProvider>
         <Outlet />
      </QueryClientProvider>
   </>
));

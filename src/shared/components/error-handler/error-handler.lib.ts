const isDevelopment = import.meta.env.DEV;

export function logError(
	error: Error,
	info: { componentStack?: string | null }
) {
	if (!isDevelopment) {
	} else {
		console.log('Caught error:', error);
		console.log('Error details:', info);
	}
}

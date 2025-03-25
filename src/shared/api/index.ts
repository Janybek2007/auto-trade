import { HttpClient } from '@shared/libs/http';
import { HTTPError } from '@shared/libs/http/http-error';
import { z } from 'zod';
import { ApiUrl } from './url'

export const http = new HttpClient(ApiUrl, {}, true);

export function handleGenericError(error: HTTPError): HTTPError {
	const validation = GenericErrorSchema.safeParse(error.response?.data);
	if (validation.error) {
		return error;
	}

	const message = formatValidationErrors(validation.data);
	return new HTTPError(
		message,
		error.status,
		error.code,
		error.config,
		error.request,
		error.response
	);
}

const GenericErrorSchema = z.object({
	errors: z.record(z.string(), z.array(z.string()))
});

type GenericError = z.infer<typeof GenericErrorSchema>;

function formatValidationErrors(data: GenericError): string {
	return Object.entries(data.errors)
		.map(([field, messages]) =>
			messages.map(message => `${field}: ${message}`).join('\n')
		)
		.join('\n');
}

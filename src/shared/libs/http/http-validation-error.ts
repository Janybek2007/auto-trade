import type { ZodIssue } from 'zod';
import { HTTPError } from './http-error';
import type { HTTPRequestConfig, HTTPResponse } from './http.types';

export class HTTPValidationError<T = unknown, D = any> extends HTTPError {
	static readonly ERR_BAD_VALIDATION = 'ERR_BAD_VALIDATION';

	constructor(
		config?: HTTPRequestConfig<D>,
		request?: any,
		response?: HTTPResponse<T, D>,
		readonly errors?: ZodIssue[]
	) {
		super(
			'The provided data does not meet the required criteria.',
			404,
			'ERR_BAD_VALIDATION',
			config,
			request,
			response
		);
	}
}

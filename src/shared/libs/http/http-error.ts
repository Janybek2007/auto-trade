import type { HTTPRequestConfig, HTTPResponse } from './http.types';

export class HTTPError extends Error {
	status: number;
	code?: string;
	config?: HTTPRequestConfig;
	request?: any;
	response?: HTTPResponse;

	constructor(
		message: string,
		status: number,
		code?: string,
		config?: HTTPRequestConfig,
		request?: any,
		response?: Response
	) {
		super(message);
		this.status = status;
		this.code = code;
		this.config = config;
		this.request = request;
		this.response = response;

		this.name = 'HTTPError';
	}
}

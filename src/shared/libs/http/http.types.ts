export type RequestParams<T> = {
	url: string;
	method: string;
	body?: any;
	headers?: HeadersInit;
	parser?: (response: Response) => Promise<T>;
	onProgress?: (progress: number) => void;
};

export type RequestCallback<T> = (
	params: RequestParams<T>
) => RequestParams<T> | Promise<RequestParams<T>>;
export type ResponseCallback<T> = (response: T) => T | Promise<T>;

export type HTTPResponse<T = any, D = any> = any;

type HTTPParams = Record<string, string | number | boolean>;

export type HTTPRequestConfig<T = any, P = HTTPParams, SP = HTTPParams> = {
	headers?: HeadersInit;
	parser?: (response: Response) => Promise<T>;
	timeout?: number;
	onProgress?: (progress: number) => void;
	signal?: AbortSignal;
	params?: P;
};

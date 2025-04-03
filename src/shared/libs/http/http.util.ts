import type { RequestCallback, ResponseCallback, RequestParams, HTTPRequestConfig, IResponse } from './http.types';

export class HttpClient<T> {
   private baseUrl: string;
   private defaultHeaders: HeadersInit;
   private withCredentials: boolean;

   constructor(baseUrl: string, defaultHeaders: HeadersInit = {}, withCredentials = false) {
      this.baseUrl = baseUrl;
      this.defaultHeaders = defaultHeaders;
      this.withCredentials = withCredentials;
   }

   private requestMiddlewares: RequestCallback<T>[] = [];
   private responseMiddlewares: ResponseCallback<T>[] = [];

   addRequestMiddleware(middleware: RequestCallback<T>) {
      this.requestMiddlewares.push(middleware);
   }

   addResponseMiddleware(middleware: ResponseCallback<T>) {
      this.responseMiddlewares.push(middleware);
   }

   private async applyRequestMiddlewares(params: RequestParams<T>): Promise<RequestParams<T>> {
      let currentParams = params;
      for (const mw of this.requestMiddlewares) {
         currentParams = await mw(currentParams);
      }
      return currentParams;
   }

   private async applyResponseMiddlewares(response: T): Promise<T> {
      let currentResponse = response;
      for (const mw of this.responseMiddlewares) {
         currentResponse = await mw(currentResponse);
      }
      return currentResponse;
   }

   private buildUrl(url: string, params?: Record<string, string | number | boolean>): string {
      if (!params) return url;
      const query = new URLSearchParams(params as any);
      return url + (url.includes('?') ? '&' : '?') + query.toString();
   }

   private async fetchRequest(url: string, init: RequestInit): Promise<Response> {
      return await fetch(url, init);
   }

   async request<R>(method: string, url: string, body?: any, config: HTTPRequestConfig = {}): Promise<IResponse<R>> {
      const { headers, parser, timeout = 0, onProgress, signal, params } = config;

      let requestParams: RequestParams<T> = {
         url,
         method,
         body,
         headers,
         parser,
         onProgress,
      };
      requestParams = await this.applyRequestMiddlewares(requestParams);

      const fullUrl = this.baseUrl + this.buildUrl(requestParams.url, params);
      const reqHeaders = new Headers({
         ...this.defaultHeaders,
         ...requestParams.headers,
      });
      let requestInit: RequestInit = {
         method: requestParams.method,
         headers: reqHeaders,
         signal,
      };
      if (requestParams.body) {
         requestInit.body = JSON.stringify(requestParams.body);
      }
      if (this.withCredentials) {
         requestInit.credentials = 'include';
      }

      let controller: AbortController | undefined;
      if (timeout > 0 && !signal) {
         controller = new AbortController();
         setTimeout(() => controller?.abort(), timeout);
         requestInit.signal = controller.signal;
      }

      const response = await this.fetchRequest(fullUrl, requestInit);
      if (!response.ok) {
         let errorData;
         try {
            errorData = await response.json();
         } catch (e) {
            errorData = await response.text();
         }
         return {
            ...errorData,
            status: response.status,
            statusText: response.statusText,
         };
      }
      let data = await (requestParams.parser ? requestParams.parser(response) : response.json());
      data = await this.applyResponseMiddlewares(data);
      return data;
   }

   get<R = any>(url: string, config: HTTPRequestConfig = {}): Promise<IResponse<R>> {
      return this.request<R>('GET', url, undefined, config);
   }

   post<R = any>(url: string, body: any, config: HTTPRequestConfig = {}): Promise<IResponse<R>> {
      return this.request<R>('POST', url, body, config);
   }

   put<R = any>(url: string, body: any, config: HTTPRequestConfig = {}): Promise<IResponse<R>> {
      return this.request<R>('PUT', url, body, config);
   }

   delete<R = any>(url: string, config: HTTPRequestConfig = {}): Promise<IResponse<R>> {
      return this.request<R>('DELETE', url, undefined, config);
   }
}

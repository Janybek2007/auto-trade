import { ZodType } from 'zod';
import type { HTTPResponse } from './http.types';
import { HTTPValidationError } from './http-validation-error';

export class HTTPContracts {
   static responseContract<Data>(schema: ZodType<Data>) {
      return (response: HTTPResponse<unknown>): HTTPResponse<Data> => {
         const validation = schema.safeParse(response);
         if (validation.error) {
            throw new HTTPValidationError(response.config, response.request, response, validation.error.errors);
         }

         return validation;
      };
   }

   static requestContract<Data>(schema: ZodType<Data>, data: unknown) {
      const validation = schema.safeParse(data);

      if (validation.error) {
         throw new HTTPValidationError({ headers: new Headers() }, undefined, undefined, validation.error.errors);
      }

      return validation.data;
   }
}

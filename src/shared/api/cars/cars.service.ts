import { HTTPContracts, HTTPRequestConfig, IResponse } from '@shared/libs/http';
import { http } from '..';
import { queryOptions } from '@tanstack/react-query';
import { queryClient } from '@shared/libs/tanstack';
import { CarDtoSchema, CarsDtoSchema, CountryDtoSchema } from './cars.contractors';
import { CarsDto, PropsWithCountry } from './cars.types';

export class CarsService {
   static readonly keys = {
      root: ['cars'] as const,
   };

   private static GetCarsByCountry(config: HTTPRequestConfig & PropsWithCountry): Promise<IResponse<CarsDto>> {
      const parsedCountry = HTTPContracts.requestContract(CountryDtoSchema, config.country);
      return http.get(`/api/${parsedCountry}/cars/`, config).then(HTTPContracts.responseContract(CarsDtoSchema));
   }

   private static GetCarsById(config: HTTPRequestConfig & PropsWithCountry & { id: number }) {
      const parsedCountry = HTTPContracts.requestContract(CountryDtoSchema, config.country);
      return http
         .get(`/api/${parsedCountry}/cars/${config.id}`, config)
         .then(HTTPContracts.responseContract(CarDtoSchema));
   }

   static carsByIdQuery(props: PropsWithCountry & { id: number }) {
      return queryOptions({
         queryKey: [...this.keys.root, props.id, props.country],
         queryFn: async ({ signal }) => {
            const response = await CarsService.GetCarsById({ signal, ...props });
            return response;
         },
         // @ts-expect-error FIXME: https://github.com/TanStack/query/issues/7341
         initialData: () => queryClient.getQueryData<CarDtoSchema>([...this.keys.root]),
         initialDataUpdatedAt: () => queryClient.getQueryState([...this.keys.root])?.dataUpdatedAt,
      });
   }

   static carsByCountryQuery(props: PropsWithCountry) {
      return queryOptions({
         queryKey: [...this.keys.root, props.country],
         queryFn: async ({ signal }) => {
            const response = await CarsService.GetCarsByCountry({ signal, ...props });
            return response.data;
         },
         initialData: () => queryClient.getQueryData<CarsDto>([...this.keys.root]),
         initialDataUpdatedAt: () => queryClient.getQueryState([...this.keys.root])?.dataUpdatedAt,
      });
   }
}

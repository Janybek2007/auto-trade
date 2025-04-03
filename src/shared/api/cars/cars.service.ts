import { HTTPContracts, HTTPRequestConfig, IResponse } from '@shared/libs/http';
import { http } from '..';
import { queryOptions } from '@tanstack/react-query';
import { queryClient } from '@shared/libs/tanstack';
import { CarDtoSchema, CarsDtoSchema, CountryDtoSchema } from './cars.contractors';
import { CarDto, CarsDto, PropsWithCountry } from './cars.types';

export class CarsService {
   static readonly keys = {
      root: ['cars'] as const,
   };

   private static GetCarsByCountry(config: HTTPRequestConfig & PropsWithCountry): Promise<IResponse<CarsDto>> {
      const parsedCountry = HTTPContracts.requestContract(CountryDtoSchema, config.country);
      return http.get(`/api/${parsedCountry}/cars/`, config).then(HTTPContracts.responseContract(CarsDtoSchema));
   }

   private static GetCarsById(
      config: HTTPRequestConfig & PropsWithCountry & { id: number },
   ): Promise<IResponse<CarDto>> {
      const parsedCountry = HTTPContracts.requestContract(CountryDtoSchema, config.country);
      return http
         .get(`/api/${parsedCountry}/cars/${config.id}`, config)
         .then(HTTPContracts.responseContract(CarDtoSchema));
   }

   static carsByIdsQuery(props: PropsWithCountry & { ids: number[] }) {
      return queryOptions({
         queryKey: [...this.keys.root, props.ids, props.country],
         queryFn: async ({ signal }) => {
            const responses = await Promise.all(
               props.ids.map(id => CarsService.GetCarsById({ signal, id, country: props.country })),
            );
            return responses.map(response => response.data) as CarDto[];
         },
         initialData: () =>
            queryClient
               .getQueriesData<CarDto>({ queryKey: [...this.keys.root] })
               .filter(([_, data]) => data && props.ids.includes(data.id))
               .map(([_, data]) => data),
         initialDataUpdatedAt: () =>
            Math.max(
               ...queryClient
                  .getQueriesData<CarDto>({ queryKey: [...this.keys.root] })
                  .map(([key]) => queryClient.getQueryState(key)?.dataUpdatedAt || 0),
            ),
      });
   }

   static carsByIdQuery(props: PropsWithCountry & { id: number }) {
      return queryOptions({
         queryKey: [...this.keys.root, props.id, props.country],
         queryFn: async ({ signal }) => {
            const response = await CarsService.GetCarsById({ signal, ...props });
            return response.data;
         },
         initialData: () => queryClient.getQueryData<CarDto>([...this.keys.root]),
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

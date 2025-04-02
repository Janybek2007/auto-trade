import { HTTPContracts } from '@shared/libs/http'
import { queryClient } from '@shared/libs/tanstack'
import { queryOptions } from '@tanstack/react-query'
import { http } from '..'
import { BrandsDtoSchema } from './brands.contractors'

export class BrandsService {
   static readonly keys = {
      root: ['brands'] as const,
   };

   private static GetBrands(config: { signal?: AbortSignal }) {
      return http.get('/api/america/cars-brands/', config).then(HTTPContracts.responseContract(BrandsDtoSchema));
   }

   static brandsQuery() {
      return queryOptions({
         queryKey: [...this.keys.root],
         queryFn: async ({ signal }) => {
            const response = await BrandsService.GetBrands({ signal });
            return response;
         },
         // @ts-expect-error FIXME: https://github.com/TanStack/query/issues/7341
         initialData: () => queryClient.getQueryData<Profile>([...this.keys.root]),
         initialDataUpdatedAt: () => queryClient.getQueryState([...this.keys.root])?.dataUpdatedAt,
      });
   }
}

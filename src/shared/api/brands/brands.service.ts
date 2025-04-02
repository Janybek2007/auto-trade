import { HTTPContracts, IResponse } from '@shared/libs/http';
import { queryClient } from '@shared/libs/tanstack';
import { queryOptions } from '@tanstack/react-query';
import { http } from '..';
import { BrandsDtoSchema } from './brands.contractors';
import { BrandDto, BrandsDto } from './brands.types';

export class BrandsService {
   static readonly keys = {
      root: ['brands'] as const,
   };

   private static GetBrands(config: { signal?: AbortSignal }): Promise<IResponse<BrandsDto>> {
      return http.get('/api/america/cars-brands/', config).then(HTTPContracts.responseContract(BrandsDtoSchema));
   }

   static brandsQuery() {
      return queryOptions({
         queryKey: [...this.keys.root],
         queryFn: async ({ signal }) => {
            const response = await BrandsService.GetBrands({ signal });
            return response.data;
         },
         initialData: () => queryClient.getQueryData<BrandsDto>([...this.keys.root]),
         initialDataUpdatedAt: () => queryClient.getQueryState([...this.keys.root])?.dataUpdatedAt,
      });
   }
}

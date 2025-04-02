import { z } from 'zod'
import { BrandDtoSchema, BrandsDtoSchema } from './brands.contractors'

export type BrandDto = z.infer<typeof BrandDtoSchema>;
export type BrandsDto = z.infer<typeof BrandsDtoSchema>;

import { z } from 'zod';

export const BrandDtoSchema = z.object({
   id: z.number(),
   name: z.string(),
   logo: z.string().url(),
});

export const BrandsDtoSchema = z.array(BrandDtoSchema);

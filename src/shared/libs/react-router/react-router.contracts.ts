import { z } from 'zod';

export const SlugPageParamsSchema = z.object({ slug: z.string() });

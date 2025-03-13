import { z } from 'zod';
import { SlugPageParamsSchema } from './react-router.contracts';

export type SlugPageParams = z.infer<typeof SlugPageParamsSchema>;

import { z } from 'zod';
import { CarDtoSchema, CarsDtoSchema, CountryDtoSchema } from './cars.contractors';

export type CarDto = z.infer<typeof CarDtoSchema>;
export type CarsDto = z.infer<typeof CarsDtoSchema>;
export type CountryDto = z.infer<typeof CountryDtoSchema>;

export type PropsWithCountry = { country: CountryDto };

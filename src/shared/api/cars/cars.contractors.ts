import { z } from 'zod';

export const CountryDtoSchema = z.enum(['america', 'dubai', 'korea']);

export const CarDtoSchema = z.object({
   id: z.number(),
   manager: z.object({
      id: z.number(),
      full_name: z.string(),
      phone_number: z.string(),
      whatsapp_url: z.string().url(),
   }),
   brand: z.object({
      id: z.number(),
      name: z.string(),
      logo: z.string().url(),
   }),
   model: z.object({
      id: z.number(),
      name: z.string(),
   }),
   year: z.number(),
   mileage: z.number(),
   engine_volume: z.string(),
   power: z.number(),
   configuration: z.string(),
   color: z.object({
      id: z.number(),
      name: z.string(),
      hex_code: z.string(),
   }),
   body_type: z.object({
      id: z.number(),
      name: z.string(),
   }),
   fuel_type: z.string(),
   transmission_type: z.string(),
   start_price: z.number(),
   end_price: z.number(),
   auction_start_time: z.string(),
   interior: z.object({
      id: z.number(),
      steering_wheel: z.string(),
      interior_color: z.object({
         id: z.number(),
         name: z.string(),
         hex_code: z.string(),
      }),
      seat_material: z.string(),
   }),
   car_history: z.object({
      id: z.number(),
      carfax_status: z.string(),
      vin_code: z.string(),
   }),
   photos: z.array(
      z.object({
         id: z.number(),
         image: z.string().transform(img => (img.startsWith('http') ? img : `http://109.73.207.12:800${img}`)),
         is_main: z.boolean(),
      }),
   ),
   url: z.string().optional(),
   time_left: z.string(),
});

export const CarsDtoSchema = z.array(CarDtoSchema);

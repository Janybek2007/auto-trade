import { useMemo } from 'react';
import type { CarDto } from '@shared/api/cars';
import { useFiltrations } from './context';

export const useFilteredCars = (cars: CarDto[] | undefined) => {
   const { filters, activeBrands } = useFiltrations();

   const filteredCars = useMemo(() => {
      if (!cars || !Array.isArray(cars)) return [];

      return cars.filter(car => {
         if (filters.price) {
            const [minPriceStr, maxPriceStr] = filters.price.split('-');
            const minPrice = parseFloat(minPriceStr);
            const maxPrice = parseFloat(maxPriceStr);

            const startPrice = parseFloat(String(car.start_price));
            const endPrice = parseFloat(String(car.end_price));

            if (startPrice > maxPrice || endPrice < minPrice) {
               return false;
            }
         }

         if (filters.year_of_production) {
            const [minYearStr, maxYearStr] = filters.year_of_production.split('-').map(String);
            let minYear: number, maxYear: number;

            minYear = parseFloat(minYearStr);
            maxYear = parseFloat(maxYearStr);

            if ((minYear && car.year < minYear) || (maxYear && car.year > maxYear)) {
               return false;
            }
         }

         if (filters.mileage) {
            const [minMileageStr, maxMileageStr] = filters.mileage.split('-').map(String);
            let minMileage: number, maxMileage: number;

            minMileage = parseFloat(minMileageStr);
            maxMileage = parseFloat(maxMileageStr);

            const carMileage = car.mileage;

            if ((minMileage && carMileage < minMileage) || (maxMileage && carMileage > maxMileage)) {
               return false;
            }
         }

         if (filters?.kpp_type && car.transmission_type !== filters.kpp_type) {
            return false;
         }

         if (filters?.fuel_type && car.fuel_type !== filters.fuel_type) {
            return false;
         }

         if (
            filters?.bodywork &&
            car.body_type?.name &&
            car.body_type.name.toLowerCase() !== filters.bodywork.toLowerCase()
         ) {
            return false;
         }

         if (activeBrands?.length > 0) {
            const carBrand = car.brand.name.toLowerCase();
            if (!activeBrands.some(brand => brand.name.toLowerCase() === carBrand)) {
               return false;
            }
         }

         return true;
      });
   }, [cars, filters, activeBrands]);

   return filteredCars;
};

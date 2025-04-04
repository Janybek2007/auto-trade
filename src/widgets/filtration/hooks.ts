import { useMemo } from 'react';
import type { CarDto } from '@shared/api/cars';
import { useFiltrations } from './context';

export const useFilteredCars = (cars: CarDto[] | undefined) => {
   const { filters, activeBrands } = useFiltrations();

   const filteredCars = useMemo(() => {
      if (!cars || !Array.isArray(cars)) return [];

      return cars.filter(car => {
         // Price filter
         if (filters?.price && typeof filters.price === 'string' && filters.price !== '') {
            const [minPriceStr, maxPriceStr] = (filters.price.split('-') || []).map(str => str || '0');
            const minPrice = Number.parseFloat(minPriceStr) * (minPriceStr?.length <= 2 ? 1000 : 1);
            const maxPrice = Number.parseFloat(maxPriceStr) * (maxPriceStr?.length <= 2 ? 1000 : 1);
            const startPrice = Number.parseFloat(car.start_price || '0') * 1000;
            const endPrice = Number.parseFloat(car.end_price || '0') * 1000;

            if ((minPrice && startPrice < minPrice) || (maxPrice && endPrice > maxPrice) || startPrice > endPrice) {
               return false;
            }
         }

         // Year filter
         if (
            filters?.year_of_production &&
            typeof filters.year_of_production === 'string' &&
            filters.year_of_production !== ''
         ) {
            const [minYearStr, maxYearStr] = (filters.year_of_production.split('-') || []).map(str => str || '0');
            const minYear =
               Number.parseInt(minYearStr) < 100 ? 2000 + Number.parseInt(minYearStr) : Number.parseInt(minYearStr);
            const maxYear =
               Number.parseInt(maxYearStr) < 100 ? 2000 + Number.parseInt(maxYearStr) : Number.parseInt(maxYearStr);
            const carYear = car.year < 100 ? 2000 + (car.year || 0) : car.year || 0;

            if ((minYear && carYear < minYear) || (maxYear && carYear > maxYear)) {
               return false;
            }
         }

         // Mileage filter
         if (filters?.mileage && typeof filters.mileage === 'string' && filters.mileage !== '') {
            const [minMileageStr, maxMileageStr] = (filters.mileage.split('-') || []).map(str => str || '0');
            const minMileage = Number.parseInt(minMileageStr) * (minMileageStr?.length <= 2 ? 1000 : 1);
            const maxMileage = Number.parseInt(maxMileageStr) * (maxMileageStr?.length <= 2 ? 1000 : 1);
            const carMileage = car.mileage || 0;

            if ((minMileage && carMileage < minMileage) || (maxMileage && carMileage > maxMileage)) {
               return false;
            }
         }

         // Transmission filter
         if (filters?.kpp_type && car.transmission_type !== filters.kpp_type) {
            return false;
         }

         // Fuel type filter
         if (filters?.fuel_type && car.fuel_type !== filters.fuel_type) {
            return false;
         }

         // Body type filter
         if (
            filters?.bodywork &&
            car.body_type?.name &&
            car.body_type.name.toLowerCase() !== filters.bodywork.toLowerCase()
         ) {
            return false;
         }

         // Brand filter - Fixed to safely handle undefined values
         if (activeBrands && Array.isArray(activeBrands) && activeBrands?.length > 0) {
            const carBrand = car.brand?.name?.toLowerCase();
            if (!carBrand) return false;

            // Safely check if any active brand matches the car brand
            const brandMatch = activeBrands.some(
               brand => brand && typeof brand === 'object' && brand.name && brand.name.toLowerCase() === carBrand,
            );

            if (!brandMatch) return false;
         }

         return true;
      });
   }, [cars, filters, activeBrands]);

   return filteredCars;
};

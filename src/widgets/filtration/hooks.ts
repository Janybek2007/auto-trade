import { useMemo } from 'react';
import { useFiltrations } from './context';
import { CarDto } from '@shared/api/cars';

export const useFilteredCars = (cars: CarDto[] | undefined) => {
   const { filters, activeBrands } = useFiltrations();

   const filteredCars = useMemo(() => {
      if (!cars) return [];

      return cars.filter(car => {
         // Фильтр по цене (диапазон)
         if (filters.price) {
            const [minPriceStr, maxPriceStr] = filters.price.split('-');
            const minPrice = parseFloat(minPriceStr);
            const maxPrice = parseFloat(maxPriceStr);

            const startPrice = parseFloat(car.start_price);
            const endPrice = parseFloat(car.end_price);

            console.log(minPrice, maxPrice, 'MinMax');
            console.log(startPrice, endPrice, 'StartEnd');

            // Проверка: не входит в указанный диапазон
            if (startPrice > maxPrice || endPrice < minPrice) {
               return false;
            }
         }

         // Фильтр по году (диапазон)
         if (filters.year_of_production) {
            const [minYearStr, maxYearStr] = filters.year_of_production.split('-').map(String);
            let minYear: number, maxYear: number;

            if (minYearStr?.length <= 2 && maxYearStr?.length <= 2) {
               // Сокращенный формат (19-20 → 2019-2020)
               minYear = parseInt(minYearStr) < 100 ? 2000 + parseInt(minYearStr) : parseInt(minYearStr);
               maxYear = parseInt(maxYearStr) < 100 ? 2000 + parseInt(maxYearStr) : parseInt(maxYearStr);
            } else {
               // Полный формат (2000-2015)
               minYear = parseInt(minYearStr);
               maxYear = parseInt(maxYearStr);
            }

            const carYear = car.year < 100 ? 2000 + car.year : car.year;

            if ((minYear && carYear < minYear) || (maxYear && carYear > maxYear)) {
               return false;
            }
         }

         // Фильтр по пробегу (диапазон)
         if (filters.mileage) {
            const [minMileageStr, maxMileageStr] = filters.mileage.split('-').map(String);
            let minMileage: number, maxMileage: number;

            if (minMileageStr?.length <= 2 && maxMileageStr?.length <= 2) {
               // Сокращенный формат (0-30 → 0-30000)
               minMileage = parseInt(minMileageStr) * 1000;
               maxMileage = parseInt(maxMileageStr) * 1000;
            } else {
               // Полный формат (0-30000)
               minMileage = parseInt(minMileageStr);
               maxMileage = parseInt(maxMileageStr);
            }

            const carMileage = car.mileage;

            if ((minMileage && carMileage < minMileage) || (maxMileage && carMileage > maxMileage)) {
               return false;
            }
         }

         // Фильтр по типу КПП
         if (filters.kpp_type && car.transmission_type !== filters.kpp_type) {
            return false;
         }

         // Фильтр по типу топлива
         if (filters.fuel_type && car.fuel_type !== filters.fuel_type) {
            return false;
         }

         // Фильтр по типу кузова
         if (filters.bodywork && car.body_type.name.toLowerCase() !== filters.bodywork.toLowerCase()) {
            return false;
         }

         // Фильтр по бренду
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

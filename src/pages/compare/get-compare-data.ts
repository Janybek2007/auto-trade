import { CarDto } from '@shared/api/cars';

export const getCompareData = (data: CarDto[] = []) => {
   const historyData = {
      titleKey: 'history',
      data: [
         { labelKey: 'carfaxStatus', values: data.map(car => car?.car_history.carfax_status) || [] },
         { labelKey: 'vinCode', values: data.map(car => car?.car_history.vin_code) || [] },
      ],
   };

   const techSpecsData = {
      titleKey: 'specs',
      data: [
         {
            labelKey: 'engine',
            values: data.map(car => `${car?.fuel_type}, ${car?.engine_volume}L`) || [],
         },
         { labelKey: 'color', values: data.map(car => car?.color.name) || [] },
         { labelKey: 'gearbox', values: data.map(car => car?.transmission_type) || [] },
         { labelKey: 'year', values: data.map(car => `${car?.year} год`) || [] },
      ],
   };

   const interiorData = {
      titleKey: 'interior',
      data: [
         { labelKey: 'wheel', values: data.map(car => car?.interior.steering_wheel) || [] },
         { labelKey: 'interiorColor', values: data.map(car => car?.interior.interior_color.name) || [] },
         { labelKey: 'seatMaterial', values: data.map(car => car?.interior.seat_material) || [] },
      ],
      showContact: true,
   };

   return { historyData, techSpecsData, interiorData };
};

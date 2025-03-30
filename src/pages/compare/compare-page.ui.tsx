import React from 'react';
import s from './styles.module.scss';
import { useLanguages } from '@shared/libs/intl';
import { CompareActions, CompareCarList, CompareTable } from '@widgets/compare';

interface CarSpec {
   id: number;
   carfaxStatus: string;
   vin: string;
   engine: string;
   color: string;
   gearbox: string;
   wheelDrive: string;
   year: string;
   trim: string;
   steeringWheel: string;
   interiorColor: string;
   seatMaterial: string;
}

const carsData: CarSpec[] = [
   {
      id: 1,
      carfaxStatus: 'Не чистый',
      vin: '4T1B1IHK7JU505475',
      engine: 'Бензин, 2.5л',
      color: 'Серебристый',
      gearbox: 'Робот',
      wheelDrive: 'Передний',
      year: '2022 год',
      trim: 'xDrive30d AT Exclusive',
      steeringWheel: 'Левый',
      interiorColor: 'Коричневый',
      seatMaterial: 'Кожанный велюр',
   },
   {
      id: 2,
      carfaxStatus: 'Чистый',
      vin: '4T1B1IHK7JU505475',
      engine: 'Бензин, 2.5л',
      color: 'Серебристый',
      gearbox: 'Робот',
      wheelDrive: 'Передний',
      year: '2023 год',
      trim: 'xDrive30d AT Exclusive',
      steeringWheel: 'Левый',
      interiorColor: 'Белый',
      seatMaterial: 'Кожанный велюр',
   },
   {
      id: 3,
      carfaxStatus: 'Чистый',
      vin: '4T1B1IHK7JU505475',
      engine: 'Бензин, 2.5л',
      color: 'Серебристый',
      gearbox: 'Робот',
      wheelDrive: 'Передний',
      year: '2024 год',
      trim: 'xDrive30d AT Exclusive',
      steeringWheel: 'Левый',
      interiorColor: 'Черный',
      seatMaterial: 'Кожанный велюр',
   },
];

export const ComparePage: React.FC = () => {
   const { t } = useLanguages();

   const handleAddCar = () => {
      console.log('Add car clicked');
   };

   const handleRemoveAll = () => {
      console.log('Remove all clicked');
   };

   const handleRemoveCar = (index: number) => {
      console.log(`Remove car at index ${index}`);
   };

   const historyData = {
      titleKey: 'history',
      data: [
         { labelKey: 'carfaxStatus', values: carsData.map(car => car.carfaxStatus) },
         { labelKey: 'vinCode', values: carsData.map(car => car.vin) },
      ],
   };

   const techSpecsData = {
      titleKey: 'specs',
      data: [
         { labelKey: 'engine', values: carsData.map(car => car.engine) },
         { labelKey: 'color', values: carsData.map(car => car.color) },
         { labelKey: 'gearbox', values: carsData.map(car => car.gearbox) },
         { labelKey: 'drive', values: carsData.map(car => car.wheelDrive) },
         { labelKey: 'year', values: carsData.map(car => car.year) },
         { labelKey: 'trim', values: carsData.map(car => car.trim) },
      ],
   };

   const interiorData = {
      titleKey: 'interior',
      data: [
         { labelKey: 'wheel', values: carsData.map(car => car.steeringWheel) },
         { labelKey: 'interiorColor', values: carsData.map(car => car.interiorColor) },
         { labelKey: 'seatMaterial', values: carsData.map(car => car.seatMaterial) },
      ],
      showContact: true,
   };

   return (
      <section className={s.Main}>
         <div className={s.container}>
            <div className={s.content}>
               <div className={s.cards_for_compare}>
                  <h1>{t.get('compare.title')}</h1>
                  <CompareActions onAdd={handleAddCar} onRemoveAll={handleRemoveAll} />
               </div>

               <CompareCarList count={3} onRemove={handleRemoveCar} />

               <CompareTable {...historyData} />
               <CompareTable {...techSpecsData} />
               <CompareTable {...interiorData} />
               <button className={`${s['contact-btn']} ${s['mobile']}`}>
                  <img src={'/icons/det-icon3.svg'} alt={''} />
                  <p>Написать менеджеру</p>
               </button>
            </div>
         </div>
      </section>
   );
};

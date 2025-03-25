import { Filters } from './store';

interface Filtration {
   label: string;
   value: string;
   key: keyof Filters;
   options: { label: string; value: string }[];
}

export const filtrations: Filtration[] = [
   {
      label: 'Цена, $',
      value: 'price',
      key: 'price',
      options: [
         { label: '$8тыс-20тыс', value: '8000-20000' },
         { label: '$20тыс-40тыс', value: '20000-40000' },
         { label: '$40тыс-60тыс', value: '40000-60000' },
         { label: '$60тыс-80тыс', value: '60000-80000' },
         { label: '$80тыс-100тыс', value: '80000-100000' },
      ],
   },
   {
      label: 'Год производства',
      value: 'year_of_production',
      key: 'year_of_production',
      options: [
         { label: '2000г-2005г', value: '2000-2005' },
         { label: '2005-2010г', value: '2005-2010' },
         { label: '2010-2015г', value: '2010-2015' },
         { label: '2015-2020г', value: '2015-2020' },
         { label: '2020-2024г', value: '2020-2024' },
      ],
   },
   {
      label: 'Пробег, км',
      value: 'mileage',
      key: 'mileage',
      options: [
         { label: 'До 30 000', value: '0-30000' },
         { label: '30тыс-60тыс', value: '30000-60000' },
         { label: '60тыс-90тыс', value: '60000-90000' },
         { label: '90тыс-150тыс', value: '90000-150000' },
         { label: 'Более 150 000', value: '150000+' },
      ],
   },
   {
      label: 'Тип КПП',
      value: 'kpp_type',
      key: 'kpp_type',
      options: [
         { label: 'Автомат', value: 'automatic' },
         { label: 'Механика', value: 'manual' },
         { label: 'Вариатор', value: 'variator' },
         { label: 'Робот', value: 'robot' },
      ],
   },
   {
      label: 'Тип топлива',
      value: 'fuel_type',
      key: 'fuel_type',
      options: [
         { label: 'Любой', value: '' },
         { label: 'Бензин', value: 'petrol' },
         { label: 'Дизель', value: 'diesel' },
         { label: 'Гибрид', value: 'hybrid' },
      ],
   },
   {
      label: 'Кузов',
      value: 'bodywork',
      key: 'bodywork',
      options: [
         { label: 'Седан', value: 'sedan' },
         { label: 'Хэтчбек', value: 'hatchback' },
         { label: 'Кроссовер', value: 'crossover' },
         { label: 'Внедорожник', value: 'suv' },
         { label: 'Минивен', value: 'minivan' },
         { label: 'Микроавтобус', value: 'microbus' },
      ],
   },
];

export const brands = [
   { name: 'KIA', logo: '/car-brands/kia.svg' },
   { name: 'Toyota', logo: '/car-brands/toyota.svg' },
   { name: 'Hyundai', logo: '/car-brands/hyundai.svg' },
   { name: 'Honda', logo: '/car-brands/honda.svg' },
   { name: 'Porsche', logo: '/car-brands/porsche.svg' },
   { name: 'Lexus', logo: '/car-brands/lexus.svg' },
   { name: 'BMW', logo: '/car-brands/bmw.svg' },
   { name: 'BYD', logo: '/car-brands/byd.svg' },
   { name: 'Mercedes', logo: '/car-brands/mercedes.svg' },
   { name: 'Audi', logo: '/car-brands/audi.svg' },
   { name: 'Dodge', logo: '/car-brands/dodge.svg' },
   { name: 'Mazda', logo: '/car-brands/mazda.svg' },
   { name: 'Tesla', logo: '/car-brands/tesla.svg' },
   { name: 'Subaru', logo: '/car-brands/subaru.svg' },
   { name: 'Nissan', logo: '/car-brands/nissan.svg' },
   { name: 'Hummer', logo: '/car-brands/hummer.svg' },
   { name: 'Ford', logo: '/car-brands/ford.svg' },
   { name: 'Acura', logo: '/car-brands/acura.svg' },
];

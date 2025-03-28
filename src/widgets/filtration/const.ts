export interface Filters {
   price: string;
   year_of_production: string;
   mileage: string;
   kpp_type: string;
   fuel_type: string;
   bodywork: string;
}

interface Filtration {
   label: string;
   value: string;
   key: keyof Filters;
   options: { label: string; value: string }[];
}

export const filtrations: Filtration[] = [
   {
      label: 'Price',
      value: 'price',
      key: 'price',
      options: [
         { label: '$8k-20k', value: '8000-20000' },
         { label: '$20k-40k', value: '20000-40000' },
         { label: '$40k-60k', value: '40000-60000' },
         { label: '$60k-80k', value: '60000-80000' },
         { label: '$80k-100k', value: '80000-100000' },
      ],
   },
   {
      label: 'Year of Production',
      value: 'year_of_production',
      key: 'year_of_production',
      options: [
         { label: '2000-2005', value: '2000-2005' },
         { label: '2005-2010', value: '2005-2010' },
         { label: '2010-2015', value: '2010-2015' },
         { label: '2015-2020', value: '2015-2020' },
         { label: '2020-2024', value: '2020-2024' },
      ],
   },
   {
      label: 'Mileage, Ascending',
      value: 'mileage',
      key: 'mileage',
      options: [
         { label: 'Up to 30,000', value: '0-30000' },
         { label: '30k-60k', value: '30000-60000' },
         { label: '60k-90k', value: '60000-90000' },
         { label: '90k-150k', value: '90000-150000' },
         { label: 'Over 150,000', value: '150000+' },
      ],
   },
   {
      label: 'Transmission Type',
      value: 'kpp_type',
      key: 'kpp_type',
      options: [
         { label: 'Automatic', value: 'automatic' },
         { label: 'Manual', value: 'manual' },
         { label: 'Variator', value: 'variator' },
         { label: 'Robot', value: 'robot' },
      ],
   },
   {
      label: 'Fuel Type',
      value: 'fuel_type',
      key: 'fuel_type',
      options: [
         { label: 'Any', value: '' },
         { label: 'Petrol', value: 'petrol' },
         { label: 'Diesel', value: 'diesel' },
         { label: 'Hybrid', value: 'hybrid' },
      ],
   },
   {
      label: 'Body Type',
      value: 'bodywork',
      key: 'bodywork',
      options: [
         { label: 'Sedan', value: 'sedan' },
         { label: 'Hatchback', value: 'hatchback' },
         { label: 'Crossover', value: 'crossover' },
         { label: 'SUV', value: 'suv' },
         { label: 'Minivan', value: 'minivan' },
         { label: 'Microbus', value: 'microbus' },
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

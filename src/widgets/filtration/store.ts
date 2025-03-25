import { createStore } from '@shared/libs/zustand';

interface FilterUpdatePayload<T> {
   field: keyof T;
   value: string;
}

export interface Filters {
   price: string;
   year_of_production: string;
   mileage: string;
   kpp_type: string;
   fuel_type: string;
   bodywork: string;
}

interface State {
   compares: string[];
   item_type: 'card' | 'list';
   filters: Filters;
   brand: null | {
      name: string;
      logo: string;
   };
}

export const filtrationStore = createStore({
   state: {
      compares: [],
      item_type: 'card',
      filters: {
         price: '',
         year_of_production: '',
         mileage: '',
         kpp_type: '',
         fuel_type: '',
         bodywork: '',
      },
      brand: null,
   } as State,
   actions: {
      setBrand: (state, brand) => {
         state.brand = brand;
      },
      onCompares: (state, car_id: string) => {
         if (state.compares.includes(car_id)) {
            state.compares = state.compares.filter(id => id !== car_id);
         } else {
            state.compares = [...state.compares, car_id];
         }
      },
      toggleItemType: state => {
         state.item_type = state.item_type === 'card' ? 'list' : 'card';
      },
      updateFilter: (state, { field, value }: FilterUpdatePayload<(typeof state)['filters']>) => {
         state.filters[field] = value;
      },
      resetFilters: state => {
         state.filters = {
            price: '',
            year_of_production: '',
            mileage: '',
            kpp_type: '',
            fuel_type: '',
            bodywork: '',
         };
      },
      setAllFilters: (state, newFilters) => {
         state.filters = { ...state.filters, ...newFilters };
      },
   },
});

export const { useStore: useFiltrations, actions } = filtrationStore;

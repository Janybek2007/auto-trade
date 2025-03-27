import { toast } from '@features/toast';
import { ButtonProps } from '@shared/components';
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
      onCompares: (state, car_id: string, actions?: ButtonProps[]) => {
         if (state.compares.includes(car_id)) {
            state.compares = state.compares.filter(id => id !== car_id);
            toast('Авто удалено из сравнения', {
               actions: actions,
               description: `Авто для сравнения: ${state.compares.length}`,
            });
         } else {
            if (state.compares.length == 6) {
               alert('Не больше 6 сравнений!');
            }
            state.compares = [...state.compares, car_id];
            toast('Авто добавлено к сравнения', {
               actions: actions,
               description: `Авто для сравнения: ${state.compares.length}`,
            });
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

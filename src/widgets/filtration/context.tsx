import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { toast } from '@features/toast';
import { useLanguages } from '@shared/libs/intl';
import { ButtonProps } from '@shared/components';

interface Filters {
   price: string;
   year_of_production: string;
   mileage: string;
   kpp_type: string;
   fuel_type: string;
   bodywork: string;
}

interface Brand {
   name: string;
   logo: string;
}

interface FiltrationContextType {
   compares: string[];
   itemType: 'card' | 'list';
   filters: Filters;
   brand: Brand | null;
   setBrand: (brand: Brand | null) => void;
   onCompares: (car_id: string, actions?: any[]) => void;
   toggleItemType: () => void;
   updateFilter: (field: keyof Filters, value: string) => void;
   resetFilters: () => void;
   setAllFilters: (newFilters: Partial<Filters>) => void;
}

const FiltrationContext = createContext<FiltrationContextType | null>(null);

interface FiltrationProviderProps {
   children: ReactNode;
}

export const FiltrationProvider: React.FC<FiltrationProviderProps> = ({ children }) => {
   const { t } = useLanguages();
   const [compares, setCompares] = useState<string[]>([]);
   const [itemType, setItemType] = useState<'card' | 'list'>('card');
   const [filters, setFilters] = useState<Filters>({
      price: '',
      year_of_production: '',
      mileage: '',
      kpp_type: '',
      fuel_type: '',
      bodywork: '',
   });
   const [brand, setBrand] = useState<Brand | null>(null);

   const onCompares = useCallback(
      (car_id: string, actions?: ButtonProps[]) => {
         setCompares(prev => {
            const updatedCompares = prev.includes(car_id)
               ? prev.filter(id => id !== car_id)
               : prev.length < 6
                 ? [...prev, car_id]
                 : prev;

            toast(prev.includes(car_id) ? t.get('comparison.removed') : t.get('comparison.added'), {
               actions,
               description: `${t.get('comparison.count')}: ${updatedCompares.length}`,
            });

            if (prev.length >= 6 && !prev.includes(car_id)) {
               alert(t.get('comparison.limit'));
            }
            return updatedCompares;
         });
      },
      [t],
   );

   const toggleItemType = useCallback(() => {
      setItemType(prev => (prev === 'card' ? 'list' : 'card'));
   }, []);

   const updateFilter = useCallback((field: keyof Filters, value: string) => {
      setFilters(prev => ({ ...prev, [field]: value }));
   }, []);

   const resetFilters = useCallback(() => {
      setFilters({
         price: '',
         year_of_production: '',
         mileage: '',
         kpp_type: '',
         fuel_type: '',
         bodywork: '',
      });
   }, []);

   const setAllFilters = useCallback((newFilters: Partial<Filters>) => {
      setFilters(prev => ({ ...prev, ...newFilters }));
   }, []);

   const contextValue = useMemo(
      () => ({
         compares,
         itemType,
         filters,
         brand,
         setBrand,
         onCompares,
         toggleItemType,
         updateFilter,
         resetFilters,
         setAllFilters,
      }),
      [compares, itemType, filters, brand, onCompares, toggleItemType, updateFilter, resetFilters, setAllFilters],
   );

   return <FiltrationContext.Provider value={contextValue}>{children}</FiltrationContext.Provider>;
};

export const useFiltrations = (): FiltrationContextType => {
   const context = useContext(FiltrationContext);
   if (!context) {
      throw new Error('useFiltrations must be used within a FiltrationProvider');
   }
   return context;
};

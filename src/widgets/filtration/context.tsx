import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { toast } from '@features/toast';
import { useLanguages } from '@shared/libs/intl';
import { ButtonProps } from '@shared/components';
import { FiltrationContextType, Filters, ModalOpenType } from './types';
import { BrandDto } from '@shared/api/brands';

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
   const [activeBrands, setActiveBrands] = useState<BrandDto[]>([]);
   const [modalOpen, setModalOpen] = useState<ModalOpenType>(null);

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

   const contextValue: FiltrationContextType = {
      compares,
      itemType,
      filters,
      activeBrands,
      setActiveBrands,
      onCompares,
      toggleItemType,
      updateFilter,
      resetFilters,
      setAllFilters,
      modalOpen,
      setModalOpen,
   };

   return <FiltrationContext.Provider value={contextValue}>{children}</FiltrationContext.Provider>;
};

export const useFiltrations = (): FiltrationContextType => {
   const context = useContext(FiltrationContext);
   if (!context) {
      throw new Error('useFiltrations must be used within a FiltrationProvider');
   }
   return context;
};

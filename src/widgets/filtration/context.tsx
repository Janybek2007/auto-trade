import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { FiltrationContextType, Filters, ModalOpenType } from './types';
import { BrandDto } from '@shared/api/brands';

const FiltrationContext = createContext<FiltrationContextType | null>(null);

interface FiltrationProviderProps {
   children: ReactNode;
}

export const FiltrationProvider: React.FC<FiltrationProviderProps> = ({ children }) => {
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

   const toggleItemType = useCallback(() => {
      setItemType(prev => (prev === 'card' ? 'list' : 'card'));
   }, []);

   const updateFilter = useCallback((field: keyof Filters, value: string) => {
      setFilters(prev => ({
         ...prev,
         [field]: prev[field] === value ? undefined : value,
      }));
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
      itemType,
      filters,
      activeBrands,
      setActiveBrands,
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

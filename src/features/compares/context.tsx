import React, { createContext, useContext, useCallback } from 'react';
import { toast } from '@features/toast';
import { useLanguages } from '@shared/libs/intl';
import { ButtonProps } from '@shared/components';
import { useLocalstorageState } from '@shared/utils';
import { useLocation, useSearch } from '@tanstack/react-router';
import { CountryDto } from '@shared/api/cars';

interface ComparesContextType {
   compares: Record<CountryDto, number[]>;
   comparesWithBy: number[];
   onCompares: (car_id: number, actions?: ButtonProps[]) => void;
   clearCompares: (country?: CountryDto) => void;
}

const ComparesContext = createContext<ComparesContextType | null>(null);

export const ComparesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
   const { t } = useLanguages();
   const { pathname } = useLocation();
   const fromPath = `/_guest-layout/${pathname.includes('filtration') ? 'filtration' : 'compare'}`;

   const { by } = useSearch({
      from: fromPath as '/_guest-layout/filtration',
   });

   const [compares, setCompares] = useLocalstorageState<ComparesContextType['compares']>('compares', {
      america: [],
      korea: [],
      dubai: [],
   });

   const onCompares = useCallback(
      (car_id: number, actions?: ButtonProps[]) => {
         setCompares(prev => {
            const currentCompares = prev[by];
            const updatedCompares = currentCompares.includes(car_id)
               ? currentCompares.filter(id => id !== car_id)
               : currentCompares.length < 6
                 ? [...currentCompares, car_id]
                 : currentCompares;

            const newCompares = {
               ...prev,
               [by]: updatedCompares,
            };

            toast(currentCompares.includes(car_id) ? t.get('comparison.removed') : t.get('comparison.added'), {
               actions,
               description: `${t.get('comparison.count')}: ${updatedCompares.length}`,
            });

            if (currentCompares.length >= 4 && !currentCompares.includes(car_id)) {
               toast(t.get('comparison.limit'));
            }

            return newCompares;
         });
      },
      [t, by, setCompares],
   );

   const clearCompares = React.useCallback((country?: CountryDto) => {
      if (country) {
         setCompares(p => ({ ...p, [country]: [] }));
      } else {
         setCompares({ america: [], dubai: [], korea: [] });
      }
   }, []);

   const contextValue: ComparesContextType = {
      compares: compares,
      comparesWithBy: compares[by],
      onCompares,
      clearCompares,
   };

   return <ComparesContext.Provider value={contextValue}>{children}</ComparesContext.Provider>;
};

export const useCompares = (): ComparesContextType => {
   const context = useContext(ComparesContext);
   if (!context) {
      throw new Error('useCompares must be used within a Compares');
   }
   return context;
};

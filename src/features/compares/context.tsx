import React, { createContext, useContext, useCallback, PropsWithChildren } from 'react';
import { toast } from '@features/toast';
import { useLanguages } from '@shared/libs/intl';
import { ButtonProps } from '@shared/components';
import { useLocation, useSearch, useNavigate } from '@tanstack/react-router';
import { CountryDto } from '@shared/api/cars';
import { useLocalStorageState } from '@shared/utils';

interface ComparesContextType {
   compares: Record<CountryDto, number[]>;
   comparesWithBy: number[];
   onCompares: (car_id: number, actions?: ButtonProps[]) => void;
}

const ComparesContext = createContext<ComparesContextType | null>(null);

export const ComparesProvider: React.FC<PropsWithChildren> = ({ children }) => {
   const { t } = useLanguages();

   const { by } = useSearch({
      from: '/_guest-layout/filtration',
   });

   const [compares, setCompares] = useLocalStorageState<ComparesContextType['compares']>('compares', {
      defaultValue: {
         america: [],
         korea: [],
         dubai: [],
      },
   });

   const onCompares = useCallback(
      (car_id: number, actions?: ButtonProps[]) => {
         setCompares(prev => {
            const current = prev?.[by] || [];
            const alreadyAdded = current.includes(car_id);
            const updated = alreadyAdded
               ? current.filter(id => id !== car_id)
               : current.length < 6
                 ? [...current, car_id]
                 : current;

            const newCompares = {
               ...prev,
               [by]: updated,
            };

            toast(alreadyAdded ? t.get('comparison.removed') : t.get('comparison.added'), {
               actions,
               description: `${t.get('comparison.count')}: ${updated.length}`,
            });

            if (!alreadyAdded && current.length >= 4) {
               toast(t.get('comparison.limit'));
            }

            return newCompares;
         });
      },
      [by, t],
   );

   const contextValue: ComparesContextType = {
      compares,
      comparesWithBy: compares?.[by] || [],
      onCompares,
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

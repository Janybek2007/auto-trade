import { BrandSelector, CompareSwitch, FilterPanel, CarList } from '@widgets/filtration';
import s from './styles.module.scss';
import React from 'react';
import { FiltrationProvider } from '@widgets/filtration/context';

export const FiltrationPage: React.FC = () => {
   return (
      <main className={s.main}>
         <div className={`${s['container']} container`}>
            <FiltrationProvider>
               <BrandSelector />
               <CompareSwitch />
               <div className={s.bottom}>
                  <FilterPanel />
                  <CarList />
               </div>
            </FiltrationProvider>
         </div>
      </main>
   );
};

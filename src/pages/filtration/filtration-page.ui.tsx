import { BrandSelector, CompareSwitch, FilterPanel, CarList, FilterControl } from '@widgets/filtration';
import s from './styles.module.scss';
import React from 'react';
import { FiltrationProvider } from '@widgets/filtration/context';
import { ComparesProvider } from '@features/compares';

export const FiltrationPage: React.FC = () => {
   return (
      <main className={s.main}>
         <div data-container className={`${s['container']} container`}>
            <ComparesProvider>
               <FiltrationProvider>
                  <BrandSelector />
                  <CompareSwitch />
                  <FilterControl />
                  <div className={s.bottom}>
                     <FilterPanel />
                     <CarList />
                  </div>
               </FiltrationProvider>
            </ComparesProvider>
         </div>
      </main>
   );
};

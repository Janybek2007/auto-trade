import React from 'react';
import s from './styles.module.scss';
import { useFiltrations, actions } from '../store';
import { useSearch } from '@tanstack/react-router';
import { brands } from '../const';

export const BrandSelector: React.FC = () => {
   const brand = useFiltrations(s => s.brand);
   const search = useSearch({ from: '/_guest-layout/filtration' });
   const region = search.by || 'america';
   const title = region === 'korea' ? 'Корея' : region === 'dubai' ? 'Дубай' : 'Америка';
   
   return (
      <div className={s.brandSelector}>
         <h1 className={s.title}>{title}</h1>
         <div className={s.brandList}>
            {brands.map(b => (
               <button
                  onClick={() => actions.setBrand(b)}
                  key={b.name}
                  className={`${s.brandButton} ${brand?.name === b.name && s.active}`}
               >
                  <img src={b.logo} alt={b.name} className={s.brandLogo} />
                  <span>{b.name}</span>
               </button>
            ))}
         </div>
      </div>
   );
};

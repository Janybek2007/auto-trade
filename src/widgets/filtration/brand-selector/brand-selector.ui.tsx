import { useLanguages } from '@shared/libs/intl';
import { useSearch } from '@tanstack/react-router';
import React from 'react';
import { brands } from '../const';
import { useFiltrations } from '../context';
import s from './styles.module.scss';

export const BrandSelector: React.FC = () => {
   const { brand, setBrand } = useFiltrations();
   const search = useSearch({ from: '/_guest-layout/filtration' });
   const { currentLanguage } = useLanguages();
   const region = search.by || 'america';
   const isRuOrKg = currentLanguage === 'RU' || currentLanguage === 'KG';
   const title =
      region === 'korea'
         ? isRuOrKg
            ? 'Корея'
            : 'Korea'
         : region === 'dubai'
           ? isRuOrKg
              ? 'Дубай'
              : 'Dubai'
           : isRuOrKg
             ? 'Америка'
             : 'America';

   return (
      <div className={s.brandSelector}>
         <h1 className={s.title}>{title}</h1>
         <div className={s.brandList}>
            {brands.map(b => (
               <button
                  onClick={() => setBrand(b)}
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

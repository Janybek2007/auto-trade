import { useLanguages } from '@shared/libs/intl';
import { useSearch } from '@tanstack/react-router';
import React, { useCallback } from 'react';
import { brands } from '../const';
import { useFiltrations } from '../context';
import s from './styles.module.scss';
import { Icon } from '@shared/components';
import { Brand } from '../types';
import { useQuery } from '@tanstack/react-query';
import { BrandsService } from '@shared/api/brands';

export const BrandSelector: React.FC = React.memo(() => {
   const { data, isLoading } = useQuery(BrandsService.brandsQuery());
   const { activeBrands, setActiveBrands, modalOpen, setModalOpen } = useFiltrations();
   const { by: region = 'america' } = useSearch({ from: '/_guest-layout/filtration' });
   const { currentLanguage } = useLanguages();
   const regionaleTitle = {
      korea: currentLanguage === 'RU' || currentLanguage === 'KG' ? 'Корея' : 'Korea',
      dubai: currentLanguage === 'RU' || currentLanguage === 'KG' ? 'Дубай' : 'Dubai',
      america: currentLanguage === 'RU' || currentLanguage === 'KG' ? 'Америка' : 'America',
   };

   const toggleBrand = useCallback(
      (brand: Brand) => {
         setActiveBrands(prev => {
            const exists = prev.some(v => v.name === brand.name);
            return exists ? prev.filter(v => v.name !== brand.name) : [...prev, brand];
         });
      },
      [setActiveBrands],
   );

   return (
      <div data-brand-selector className={`${s[`om-${modalOpen}`]} ${s.brandSelector}`}>
         <h1 className={s.title}>{regionaleTitle[region]}</h1>
         <div className={`filtration-head ${s.head}`}>
            <button onClick={() => setModalOpen(null)} aria-label='close' className='flexCenter'>
               <Icon name='lucide:x' />
            </button>
            <span>Марки</span>
            <button onClick={() => setActiveBrands([])}>Сбросить</button>
         </div>
         <div className={s.brandList}>
            {brands.map(brand => {
               const isActive = activeBrands.some(v => v.name === brand.name);
               return (
                  <button
                     key={brand.name}
                     onClick={() => toggleBrand(brand)}
                     className={`${s.brandButton} ${isActive ? s.active : ''}`}
                  >
                     <img src={brand.logo} alt={brand.name} className={s.brandLogo} />
                     <span>{brand.name}</span>
                  </button>
               );
            })}
         </div>
      </div>
   );
});

BrandSelector.displayName = 'BrandSelector';

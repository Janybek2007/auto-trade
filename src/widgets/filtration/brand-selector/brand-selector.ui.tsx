import { useLanguages } from '@shared/libs/intl';
import { useSearch } from '@tanstack/react-router';
import React, { useCallback } from 'react';
import { useFiltrations } from '../context';
import { Icon, Loading } from '@shared/components';
import { useQuery } from '@tanstack/react-query';
import { BrandDto, BrandsService } from '@shared/api/brands';
import s from './styles.module.scss';
import { regionaleTitle } from '@shared/constants';

export const BrandSelector: React.FC = React.memo(() => {
   const { data: brands, isLoading } = useQuery(BrandsService.brandsQuery());
   const { activeBrands, setActiveBrands, modalOpen, setModalOpen } = useFiltrations();
   const { by: region = 'america' } = useSearch({ from: '/_guest-layout/filtration' });
   const { currentLanguage } = useLanguages();

   const toggleBrand = useCallback(
      (brand: BrandDto) => {
         setActiveBrands(prev => {
            const exists = prev.some(v => v.name === brand.name);
            return exists ? prev.filter(v => v.name !== brand.name) : [...prev, brand];
         });
      },
      [setActiveBrands],
   );

   React.useEffect(()=>{
      document.querySelector('[data-container]')?.setAttribute(`data-loading`, JSON.stringify(isLoading))
   },[isLoading])

   return (
      <div data-brand-selector className={`${s[`om-${modalOpen}`]} ${s.brandSelector}`}>
         <h1 className={s.title}>{regionaleTitle(currentLanguage)[region]}</h1>
         <div className={`filtration-head ${s.head}`}>
            <button onClick={() => setModalOpen(null)} aria-label='close' className='flexCenter'>
               <Icon name='lucide:x' />
            </button>
            <span>Марки</span>
            <button onClick={() => setActiveBrands([])}>Сбросить</button>
         </div>
         {isLoading ? (
            <Loading />
         ) : (
            <div className={s.brandList}>
               {brands &&
                  brands.map(brand => {
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
         )}
      </div>
   );
});

BrandSelector.displayName = 'BrandSelector';

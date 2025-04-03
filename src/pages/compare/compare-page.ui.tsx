import React from 'react';
import s from './styles.module.scss';
import { useLanguages } from '@shared/libs/intl';
import { CompareActions, CompareCarList, CompareTable } from '@widgets/compare';
import { useQuery } from '@tanstack/react-query';
import { CarDto, CarsService } from '@shared/api/cars';
import { Link, useSearch } from '@tanstack/react-router';
import { getCompareData } from './get-compare-data';
import { Loading } from '@shared/components';
import { useCompares } from '@features/compares';

export const ComparePage: React.FC = () => {
   const { t } = useLanguages();
   const { by } = useSearch({ from: '/_guest-layout/compare' });
   const { compares, onCompares, clearCompares } = useCompares();

   const { data, isLoading } = useQuery(CarsService.carsByIdsQuery({ country: by, ids: compares[by] || [] }));

   const { historyData, techSpecsData, interiorData } = getCompareData(data as CarDto[]);

   const handleRemoveAll = React.useCallback(() => {
      clearCompares(by);
   }, [by, clearCompares, t]);

   const handleRemoveCar = React.useCallback(
      (id: number) => {
         onCompares(id);
      },
      [by, t],
   );

   return (
      <section className={s.Main}>
         <div className={s.container}>
            <div className={s.content}>
               {isLoading ? (
                  <Loading />
               ) : data && data.length > 0 ? (
                  <>
                     <div className={s.cards_for_compare}>
                        <h1>{t.get('compare.title')}</h1>
                        <CompareActions by={by} onRemoveAll={handleRemoveAll} />
                     </div>
                     <CompareCarList cars={(data as CarDto[]) || []} onRemove={handleRemoveCar} />
                     <CompareTable {...historyData} />
                     <CompareTable {...techSpecsData} />
                     <CompareTable {...interiorData} />
                  </>
               ) : (
                  <div className={s.emptyState}>
                     <p>{t.get('compare.noCars')}</p>
                     <Link to='/filtration' search={{ by }}>
                        {t.get('compare.addCar')}
                     </Link>
                  </div>
               )}

               <button className={`${s['contact-btn']} ${s['mobile']}`}>
                  <img src={'/icons/det-icon3.svg'} alt={''} />
                  <p>{t.get('compare.contactManager')}</p>
               </button>
            </div>
         </div>
      </section>
   );
};

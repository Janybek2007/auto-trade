import React from 'react';
import s from './styles.module.scss';
import { useLanguages } from '@shared/libs/intl';
import { CompareActions, CompareCarList, CompareTable } from '@widgets/compare';
import { useQuery } from '@tanstack/react-query';
import { CarDto, CarsService } from '@shared/api/cars';
import { Link, useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { getCompareData } from './get-compare-data';
import { Loading } from '@shared/components';

export const ComparePage: React.FC = () => {
   const { t } = useLanguages();
   const { by } = useSearch({ from: '/_guest-layout/compare/$ids' });
   const { ids } = useParams({ from: '/_guest-layout/compare/$ids' });

   const parseIds = React.useMemo(() => (ids ? ids.split(',').map(Number).filter(Boolean) : []), [ids]);

   const navigate = useNavigate();

   const RemoveAll = React.useCallback(() => {
      navigate({
         from: '/compare/$ids',
         search: { by },
         replace: true,
         params: { ids: `[]` },
      });
   }, [by, navigate]);

   const OnRemove = React.useCallback(
      (id: number) => {
         navigate({
            from: '/compare/$ids',
            search: { by },
            replace: true,
            params: { ids: `${parseIds.filter(v => v !== id)}` },
         });
      },
      [by, parseIds, navigate],
   );

   const { data, isLoading, isFetching } = useQuery(
      CarsService.carsByIdsQuery({
         country: by,
         ids: parseIds,
      }),
   );

   const { historyData, techSpecsData, interiorData } = getCompareData(data as CarDto[]);

   if (isLoading || isFetching) {
      return <Loading />;
   }
   console.log(data)
   return (
      <section className={s.Main}>
         <div className={s.container}>
            <div className={s.content}>
               {data && data.length > 0 ? (
                  <>
                     <div className={s.cards_for_compare}>
                        <h1>{t.get('compare.title')}</h1>
                        <CompareActions by={by} onRemoveAll={RemoveAll} />
                     </div>
                     <CompareCarList cars={(data as CarDto[]) || []} onRemove={OnRemove} />
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

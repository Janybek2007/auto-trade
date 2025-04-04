import { Button, CarItem, Icon, Loading } from '@shared/components';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import React, { useState, useCallback } from 'react';
import { useFiltrations } from '../context';
import s from './styles.module.scss';
import { useLanguages } from '@shared/libs/intl';
import { useSize } from '@shared/utils';
import { useQuery } from '@tanstack/react-query';
import { CarsService } from '@shared/api/cars';
import { useFilteredCars } from '../hooks';
import { useCompares } from '@features/compares';

const getTranslationByLanguage = (key: string, language: string) => {
   switch (language) {
      case 'RU':
         return key === 'return'
            ? 'Вернуть'
            : key === 'loadMore'
              ? 'Загрузить еще'
              : key === 'empty'
                ? 'Нет автомобилей'
                : key === 'emptyDescription'
                  ? 'Попробуйте изменить фильтры или сбросить их'
                  : key;
      case 'KG':
         return key === 'return'
            ? 'Кайтаруу'
            : key === 'loadMore'
              ? 'Жана жүктөө'
              : key === 'empty'
                ? 'Унаалар жок'
                : key === 'emptyDescription'
                  ? 'Фильтрлерди өзгөртүп же тазалап көрүңүз'
                  : key;
      default:
         return key === 'return'
            ? 'Return'
            : key === 'loadMore'
              ? 'Load More'
              : key === 'empty'
                ? 'No cars found'
                : key === 'emptyDescription'
                  ? 'Try adjusting or resetting the filters'
                  : key;
   }
};

const BaseActionProps = {
   color: 'secondary' as 'secondary',
   className: s.button,
};

const PAGE_SIZE = 9;

export const CarList: React.FC = () => {
   const { itemType } = useFiltrations();
   const { onCompares } = useCompares();
   const { by } = useSearch({ from: '/_guest-layout/filtration' });
   const { data: cars, isLoading } = useQuery(CarsService.carsByCountryQuery({ country: by }));
   const [page, setPage] = useState(1);
   const { currentLanguage } = useLanguages();
   const { width } = useSize();
   const navigate = useNavigate();
   const filteredCars = useFilteredCars(cars);

   const handleLoadMore = useCallback(() => setPage(prev => prev + 1), []);
   const visibleCars = filteredCars?.slice(0, page * PAGE_SIZE) || [];
   const hasMore = filteredCars && visibleCars.length < filteredCars.length;

   const compareClick = useCallback(
      (v: number) => {
         onCompares(v, [
            {
               children: (
                  <>
                     <img src='/icons/compare-white-icon.svg' alt='Compare Icon' />
                     {getTranslationByLanguage('return', currentLanguage)}
                  </>
               ),
               ...BaseActionProps,
               onClick: () => onCompares(v),
            },
         ]);
      },
      [currentLanguage],
   );

   return (
      <div className={s['content']}>
         {isLoading ? (
            <Loading />
         ) : cars?.length === 0 ? (
            <div className={'empty'}>
               <Icon name='lucide:car' c_size={64} className={'emptyIcon'} />
               <h2 className={'emptyTitle'}>{getTranslationByLanguage('empty', currentLanguage)}</h2>
               <p className={'emptyDescription'}>{getTranslationByLanguage('emptyDescription', currentLanguage)}</p>
            </div>
         ) : (
            <motion.div
               className={`${s.list} ${s[`type-${itemType}`]}`}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.5 }}
            >
               {cars?.map((car, i) => (
                  <motion.div
                     key={`${itemType}-${car.id}`}
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.02, duration: 0.3 }}
                  >
                     <CarItem
                        item={car}
                        type={width <= 768 ? (width >= 560 ? 'list' : 'card') : itemType}
                        actions={[
                           {
                              type: 'more',
                              button: { onClick: () => navigate({ to: `/cars/${car.id}`, search: { by } }) },
                           },
                           { type: 'compare', button: { onClick: () => compareClick(car.id) } },
                        ]}
                     />
                  </motion.div>
               ))}
            </motion.div>
         )}
         {hasMore && (
            <Button size='lg' color='neutral' className={s.moreButton} onClick={handleLoadMore}>
               {getTranslationByLanguage('loadMore', currentLanguage)}
               <Icon name='line-md:arrow-down' c_size={20} />
            </Button>
         )}
      </div>
   );
};

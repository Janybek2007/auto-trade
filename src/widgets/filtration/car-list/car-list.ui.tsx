import { Button, CarItem, Icon } from '@shared/components';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useFiltrations } from '../context';
import s from './styles.module.scss';
import { useLanguages } from '@shared/libs/intl';

const getTranslationByLanguage = (key: string, language: string) => {
   switch (language) {
      case 'RU':
         return key === 'return' ? 'Вернуть' : key === 'loadMore' ? 'Загрузить еще' : key;
      case 'KG':
         return key === 'return' ? 'Кайтаруу' : key === 'loadMore' ? 'Жана жүктөө' : key;
      default:
         return key === 'return' ? 'Return' : key === 'loadMore' ? 'Load More' : key;
   }
};

const baseCarData = [
   { model: 'Kia K5', range: '38 000', year: 2024, price: '24 410' },
   { model: 'Toyota Camry', range: '42 000', year: 2023, price: '28 150' },
   { model: 'Honda Civic', range: '35 000', year: 2022, price: '22 990' },
   { model: 'Ford Mustang', range: '45 000', year: 2025, price: '35 600' },
   { model: 'BMW X5', range: '50 000', year: 2023, price: '48 300' },
];

const BaseActionProps = {
   color: 'secondary' as 'secondary',
   className: s.button,
};

export const CarList: React.FC = () => {
   const { onCompares, itemType } = useFiltrations();
   const [visibleCount, setVisibleCount] = useState(9);
   const { t, currentLanguage } = useLanguages();

   const HandleLoadMore = React.useCallback(() => setVisibleCount(prev => prev + 9), []);
   const Navigate = useNavigate();

   const CompareClick = React.useCallback(
      (v: number) => {
         onCompares(String(v), [
            {
               children: (
                  <>
                     <img src='/icons/compare-white-icon.svg' alt='Compare Icon' />
                     {getTranslationByLanguage('return', currentLanguage)}
                  </>
               ),
               ...BaseActionProps,
               onClick: () => onCompares(String(v)),
            },
         ]);
      },
      [currentLanguage],
   );

   return (
      <div className={s['content']}>
         <motion.div
            className={`${s.list} ${s[`type-${itemType}`]}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
         >
            {Array.from({ length: visibleCount }).map((_, i) => {
               const carData = baseCarData[i % baseCarData.length];
               return (
                  <motion.div
                     key={`${itemType}-${i}`}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.02, duration: 0.3 }}
                  >
                     <CarItem
                        item={{
                           image: '/image/askar-img.svg',
                           ...carData,
                        }}
                        type={itemType}
                        actions={[
                           { type: 'more', button: { onClick: () => Navigate({ to: `/cars/${i}` }) } },
                           { type: 'compare', button: { onClick: () => CompareClick(i) } },
                        ]}
                     />
                  </motion.div>
               );
            })}
         </motion.div>
         {visibleCount < 100 && (
            <Button size='lg' color='neutral' className={s.moreButton} onClick={HandleLoadMore}>
               {getTranslationByLanguage('loadMore', currentLanguage)}
               <Icon name='line-md:arrow-down' c_size={20} />
            </Button>
         )}
      </div>
   );
};

import React, { useState } from 'react';
import s from './styles.module.scss';
import { Button, CarItem, Icon } from '@shared/components';
import { useFiltrations } from '../store';
import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';

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
   const { item_type, onCompares } = useFiltrations();
   const [visibleCount, setVisibleCount] = useState(9);

   const HandleLoadMore = React.useCallback(() => setVisibleCount(prev => prev + 9), []);
   const Navigate = useNavigate();

   const CompareClick = React.useCallback((v: number) => {
      onCompares(String(v), [
         {
            children: (
               <>
                  <img src='/icons/compare-white-icon.svg' alt='Compare Icon' /> Вернуть
               </>
            ),
            ...BaseActionProps,
            onClick: () => onCompares(String(v))
         },
      ]);
   }, []);

   return (
      <div className={s['content']}>
         <motion.div
            className={`${s.list} ${s[`type-${item_type}`]}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
         >
            {Array.from({ length: visibleCount }).map((_, i) => {
               const carData = baseCarData[i % baseCarData.length];
               return (
                  <motion.div
                     key={`${item_type}-${i}`}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.02, duration: 0.3 }}
                  >
                     <CarItem
                        item={{
                           image: '/image/askar-img.svg',
                           ...carData,
                        }}
                        type={item_type}
                        actions={[
                           { type: 'Подробнее', button: { onClick: () => Navigate({ to: `/cars/${i}` }) } },
                           { type: 'Сравнение', button: { onClick: () => CompareClick(i) } },
                        ]}
                     />
                  </motion.div>
               );
            })}
         </motion.div>
         {visibleCount < 100 && (
            <Button size='lg' color='neutral' className={s.moreButton} onClick={HandleLoadMore}>
               Загрузить еще
               <Icon name='line-md:arrow-down' c_size={20} />
            </Button>
         )}
      </div>
   );
};

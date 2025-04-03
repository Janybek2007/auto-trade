import React from 'react';
import s from './styles.module.scss';
import { Button, Icon } from '@shared/components';
import { useNavigate } from '@tanstack/react-router';
import { useFiltrations } from '../context';

export const FilterControl: React.FC = React.memo(() => {
   const navigate = useNavigate();
   const { modalOpen, setModalOpen } = useFiltrations();

   const NavigateTo = React.useCallback((by: string) => {
      return () => {
         // @ts-ignore
         navigate({ to: '/filtration', search: { by } });
      };
   }, []);

   return (
      <div data-filter-control className={s.filterControl}>
         <div className={s.locationFilter}>
            <Button onClick={NavigateTo('amerika')} color='neutral' variant='solid' className={s.btn}>
               Америка
            </Button>
            <Button onClick={NavigateTo('dubai')} color='neutral' variant='solid' className={s.btn}>
               Дубай
            </Button>
            <Button onClick={NavigateTo('korea')} color='neutral' variant='solid' className={s.btn}>
               Корея
            </Button>
         </div>

         <div className={s.searchContainer}>
            <input type='text' placeholder='Поиск' className={s.searchInput} />
         </div>

         <div className={s.parameters}>
            <Button
               onClick={() => setModalOpen(modalOpen == 'parameters' ? null : 'parameters')}
               color='neutral'
               variant='solid'
               className={`${s.btn}`}
            >
               <Icon name='lucide:sliders-horizontal' />
               Параметры
            </Button>
            <Button
               onClick={() => setModalOpen(modalOpen == 'stamp' ? null : 'stamp')}
               color='neutral'
               variant='solid'
               className={`${s.btn}`}
            >
               Марка
            </Button>
            <Button
               onClick={() => navigate({ to: '/compare' })}
               color='neutral'
               variant='solid'
               className={`${s.btn} ${s.compare}`}
            >
               <img src='/icons/compare-icon.svg' alt='' />
               Сравнение
            </Button>
         </div>
      </div>
   );
});

FilterControl.displayName = 'FilterControl';

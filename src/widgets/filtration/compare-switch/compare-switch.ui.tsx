import React from 'react';
import { Button, Icon } from '@shared/components';
import { useFiltrations } from '../store';
import s from './styles.module.scss';
import { useNavigate } from '@tanstack/react-router';

export const CompareSwitch: React.FC = () => {
   const { compares, item_type, toggleItemType } = useFiltrations();
   const navigate = useNavigate();

   const ToCompare = React.useCallback(() => {
      if (compares.length > 1) {
         navigate({ to: '/compare' });
      }
   }, [compares]);

   return (
      <div className={s.compire_switch}>
         <Button onClick={ToCompare} className={s.compare} variant='outline'>
            <img src='/icons/compare-icon.svg' alt='' />
            <span>Cравнение</span>
            {compares.length > 0 && <span className={s['badge']}>{compares.length}</span>}
         </Button>
         <Button onClick={toggleItemType} className={s.item_type} variant='outline'>
            {item_type == 'list' ? (
               <Icon c_size={28} name='ph:list-bold' />
            ) : (
               <Icon c_size={28} name='lucide:layout-dashboard' />
            )}
         </Button>
      </div>
   );
};

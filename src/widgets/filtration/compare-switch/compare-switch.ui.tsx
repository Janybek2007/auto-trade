import { Button, Icon } from '@shared/components'
import { useLanguages } from '@shared/libs/intl'
import { useNavigate } from '@tanstack/react-router'
import React from 'react'
import { useFiltrations } from '../context'
import s from './styles.module.scss'

export const CompareSwitch: React.FC = () => {
   const { compares, itemType, toggleItemType } = useFiltrations();
   const navigate = useNavigate();
   const { currentLanguage } = useLanguages();

   const ToCompare = React.useCallback(() => {
      if (compares.length > 1) {
         navigate({ to: '/compare' });
      }
   }, [compares]);

   const compareText =
      currentLanguage === 'KG' ? 'Салыштыруу' :
      currentLanguage === 'RU' ? 'Сравнение' :
      'Compare';

   return (
      <div className={s.compire_switch}>
         <Button onClick={ToCompare} className={s.compare} variant='outline'>
            <img src='/icons/compare-icon.svg' alt='' />
            <span>{compareText}</span>
            {compares.length > 0 && <span className={s['badge']}>{compares.length}</span>}
         </Button>
         <Button onClick={toggleItemType} className={s.item_type} variant='outline'>
            {itemType === 'list' ? (
               <Icon c_size={28} name='ph:list-bold' />
            ) : (
               <Icon c_size={28} name='lucide:layout-dashboard' />
            )}
         </Button>
      </div>
   );
};

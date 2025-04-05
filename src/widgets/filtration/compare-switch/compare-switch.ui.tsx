import { Button, Icon } from '@shared/components';
import { useLanguages } from '@shared/libs/intl';
import { useNavigate, useSearch } from '@tanstack/react-router';
import React from 'react';
import { useFiltrations } from '../context';
import s from './styles.module.scss';
import { toast } from '@features/toast';
import { useCompares } from '@features/compares';

export const CompareSwitch: React.FC = () => {
   const { itemType, toggleItemType } = useFiltrations();
   const { comparesWithBy, compares } = useCompares();
   const navigate = useNavigate();
   const { by } = useSearch({ from: '/_guest-layout/filtration' });
   const { currentLanguage, t } = useLanguages();

   const ToCompare = React.useCallback(() => {
      if (comparesWithBy.length > 1) {
         navigate({ to: `/compare/${compares[by]}`, search: { by } });
      } else {
         toast(t.get('compare.minimumRequirement'), {
            description: t.get('compare.minimumDescription'),
         });
      }
   }, [comparesWithBy, navigate, by, t]);

   const compareText = currentLanguage === 'KG' ? 'Салыштыруу' : currentLanguage === 'RU' ? 'Сравнение' : 'Compare';
   return (
      <div data-compare-switch className={s.compire_switch}>
         <Button onClick={ToCompare} className={s.compare} variant='outline'>
            <img src='/icons/compare-icon.svg' alt='Compare Icon' />
            <span>{compareText}</span>
            {comparesWithBy.length > 0 && <span className={s['badge']}>{comparesWithBy.length}</span>}
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

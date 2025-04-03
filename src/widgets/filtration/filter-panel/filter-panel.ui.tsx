import { Collapsible, Icon } from '@shared/components';
import { useLanguages } from '@shared/libs/intl';
import React, { useState } from 'react';
import { filtrations } from '../const';
import s from './styles.module.scss';
import { useFiltrations } from '../context';

export const FilterPanel: React.FC = () => {
   const [openSections, setOpenSections] = useState<string[]>([]);
   const { t } = useLanguages();

   const { filters, updateFilter, modalOpen, setModalOpen } = useFiltrations();

   React.useEffect(() => {
      setOpenSections(filtrations.map(f => f.value));
   }, []);

   const toggleSection = React.useCallback((section: string) => {
      setOpenSections(prev => (prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]));
   }, []);

   return (
      <aside data-filter-panel className={`${s[`om-${modalOpen}`]} ${s.panel}`}>
         <div className={`filtration-head ${s.head}`}>
            <button onClick={() => setModalOpen(null)} aria-label='close' className='flexCenter'>
               <Icon name='lucide:x' />
            </button>
            <span>Параметры</span>
            <button>Сбросить</button>
         </div>
         <div className={s['f-block']}>
            <div className={`${s.block} ${s.trigger} ${s.filter_block}`}>
               <Icon name='mage:filter' />
               <span>{t.get('filterPanel.filters')}</span>
            </div>
            {filtrations.map(filtration => (
               <Collapsible
                  key={filtration.value}
                  className={s.block}
                  trigger={
                     <FiltrationTrigger
                        filtration={filtration}
                        toggleSection={toggleSection}
                        openSections={openSections}
                        t={t.get}
                     />
                  }
                  value={openSections.includes(filtration.value)}
               >
                  <div className={s.optionsList}>
                     {filtration.options.map(option => (
                        <div
                           key={option.value}
                           className={`${s.option} ${filters[filtration.key] === option.value ? s.active : ''}`}
                           onClick={() => {
                              updateFilter(filtration.key, option.value);
                           }}
                        >
                           {t.get(`filterPanel.${filtration.value}.options.${option.value}`)}
                        </div>
                     ))}
                  </div>
               </Collapsible>
            ))}
         </div>
      </aside>
   );
};

interface FiltrationTriggerProps {
   filtration: (typeof filtrations)[0];
   openSections: string[];
   toggleSection(v: string): void;
   t: (key: string) => string;
}

const FiltrationTrigger: React.FC<FiltrationTriggerProps> = React.memo(
   ({ filtration, openSections, toggleSection, t }) => {
      const [focus, setFocus] = useState<string | null>(null);
      const { updateFilter, filters } = useFiltrations();

      const isEditable =
         ['price', 'year_of_production', 'mileage'].includes(filtration.value) && focus === filtration.label;

      const limits: Record<string, { min: number; max: number; maxLength: number }> = {
         price: { min: 0, max: 999999, maxLength: 6 },
         year_of_production: { min: 1900, max: 2025, maxLength: 4 },
         mileage: { min: 0, max: 999999, maxLength: 6 },
      };

      const handleChange = React.useCallback(
         (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;
            const limit = limits[filtration.value];

            if (isEditable && limit) {
               const cleanedValue = value.replace(/[^0-9-]/g, '').replace(/(-.*)-/g, '$1');
               const parts = cleanedValue.split('-');

               value = parts.map(v => v.slice(0, limit.maxLength)).join('-');

               updateFilter(filtration.key, value);
            }
         },
         [updateFilter, filtration.value, isEditable],
      );

      return (
         <div
            className={`${s.trigger}`}
            onClick={() => {
               if (!focus) toggleSection(filtration.value);
            }}
         >
            <span>{t(`filterPanel.${filtration.value}.label`)}</span>
            <div className={`${openSections.includes(filtration.value) && s['active']} ${s.choose}`}>
               <input
                  onChange={handleChange}
                  onFocus={() => setFocus(filtration.label)}
                  onBlur={() => setFocus(null)}
                  type={isEditable ? 'text' : 'button'}
                  value={isEditable ? filters[filtration.key] || '' : t('filterPanel.choose')}
                  placeholder={limits[filtration.value] ? '(от - до)' : 'Выберите'}
               />
               <Icon name='ep:arrow-up' />
            </div>
         </div>
      );
   },
);

FiltrationTrigger.displayName = 'FiltrationTrigger';

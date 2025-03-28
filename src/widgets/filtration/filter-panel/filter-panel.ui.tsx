import { Collapsible, Icon } from '@shared/components';
import { useLanguages } from '@shared/libs/intl';
import React, { useState } from 'react';
import { filtrations } from '../const';
import s from './styles.module.scss';
import { useFiltrations } from '../context';

export const FilterPanel: React.FC = () => {
   const [openSections, setOpenSections] = useState<string[]>([]);
   const { t } = useLanguages();

   const { filters, updateFilter } = useFiltrations();

   React.useEffect(() => {
      setOpenSections(filtrations.map(f => f.value));
   }, []);

   const toggleSection = React.useCallback((section: string) => {
      setOpenSections(prev => (prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]));
   }, []);

   return (
      <aside className={s.panel}>
         <div>
            <div className={`${s.block} ${s.trigger} ${s.filter_block}`}>
               <Icon name='mage:filter' />
               <span>{t.get('filterPanel.filters')}</span>
            </div>
            {filtrations.map(filtration => (
               <Collapsible
                  key={filtration.value}
                  className={s.block}
                  trigger={
                     <div className={`${s.trigger}`} onClick={() => toggleSection(filtration.value)}>
                        <span>{t.get(`filterPanel.${filtration.value}.label`)}</span>
                        <button className={`${openSections.includes(filtration.value) && s['active']} ${s.choose}`}>
                           <span>{t.get('filterPanel.choose')}</span>
                           <Icon name='ep:arrow-up' />
                        </button>
                     </div>
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

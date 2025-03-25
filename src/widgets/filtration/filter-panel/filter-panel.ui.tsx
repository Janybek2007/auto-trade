import React, { useState } from 'react';
import s from './styles.module.scss';
import { filtrationStore } from '../store';
import { Collapsible, Icon } from '@shared/components';
import { filtrations } from '../const';

export const FilterPanel: React.FC = () => {
   const { actions, useStore } = filtrationStore;
   const [openSections, setOpenSections] = useState<string[]>([]);

   const filters = useStore(state => state.filters);

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
               <span>Фильтры</span>
            </div>
            {filtrations.map(filtration => (
               <Collapsible
                  key={filtration.value}
                  className={s.block}
                  trigger={
                     <div className={`${s.trigger}`} onClick={() => toggleSection(filtration.value)}>
                        <span>{filtration.label}</span>
                        <button className={`${openSections.includes(filtration.value) && s['active']} ${s.choose}`}>
                           <span>Выбрать</span>
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
                              actions.updateFilter({ field: filtration.key, value: option.value });
                           }}
                        >
                           {option.label}
                        </div>
                     ))}
                  </div>
               </Collapsible>
            ))}
         </div>
      </aside>
   );
};

'use client';
import React from 'react';
import Collapsible from '../collapsible/collapsible.ui';
import s from './styles.module.scss';
import { AccordionItemProps } from './accordion.types';
import { Icon } from '../icon';

const AccordionItem: React.FC<AccordionItemProps> = ({
   content,
   icon,
   label,
   value,
   disabled = false,
   trailingContent,
   isActive,
   toggleItem,
   isLast,
}) => {
   return (
      <div className={`${s['accordion-item']} ${isLast && s.isLast} ${isActive && s.isActive}`} data-accordion-item>
         <Collapsible
            value={isActive}
            trigger={
               <div
                  className={`${s['accordion-header']} ${disabled && s.disabled}`}
                  data-accordion-header
                  onClick={() => !disabled && toggleItem(value)}
               >
                  <div className={`${s['row']} ${disabled && s['disabled']}`} data-accordion-row>
                     {icon && (
                        <span data-accordion-icon>
                           <Icon
                              {...icon}
                              c_size={icon.c_size}
                              className={`flexCenter ${isActive && s['rotate-180']} ${s['accordion-icon']} ${icon.className}`}
                           />
                        </span>
                     )}
                     <span data-accordion-label className={s.label}>
                        {label}
                     </span>
                  </div>

                  {trailingContent}
               </div>
            }
         >
            <div data-accordion-content className={s['accordion-content']}>
               {content}
            </div>
         </Collapsible>
      </div>
   );
};

export default AccordionItem;

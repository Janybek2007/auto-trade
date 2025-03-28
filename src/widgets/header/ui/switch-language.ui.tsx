import React from 'react';
import s from '../styles.module.scss';
import { useLanguages } from '@shared/libs/intl';

export const SwitchLanguage: React.FC = React.memo(() => {
   const { currentLanguage, setLanguage } = useLanguages();
   const languages: (typeof currentLanguage)[] = ['KG', 'RU', 'EN'];
   const [isOpen, setIsOpen] = React.useState(false);

   return (
      <div className={s.switch_language}>
         <button className={s.toggle_button} onClick={() => setIsOpen(!isOpen)}>
            {currentLanguage.toUpperCase()}
            <svg
               style={{ transform: isOpen ? 'rotateX(180deg)' : '' }}
               width='10'
               height='5'
               viewBox='0 0 10 5'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path d='M5 5L0 0H10L5 5Z' fill='white' />
            </svg>
         </button>
         {isOpen && (
            <div className={s.dropdown}>
               {languages.map(lang => (
                  <button
                     key={lang}
                     className={`${s.lang_button} ${currentLanguage === lang ? s.active : ''}`}
                     onClick={() => {
                        setLanguage(lang);
                        setIsOpen(false);
                     }}
                  >
                     {lang}
                  </button>
               ))}
            </div>
         )}
      </div>
   );
});

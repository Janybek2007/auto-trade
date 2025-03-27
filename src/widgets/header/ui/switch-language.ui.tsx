import React from 'react';
import s from '../styles.module.scss';

export const SwitchLanguage: React.FC = React.memo(() => {
   const languages = ['KG', 'RU', 'EN'];
   const [activeLang, setActiveLang] = React.useState('EN');
   const [isOpen, setIsOpen] = React.useState(false);

   return (
      <div className={s.switch_language}>
         <button className={s.toggle_button} onClick={() => setIsOpen(!isOpen)}>
            {activeLang}
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
                     className={`${s.lang_button} ${activeLang === lang ? s.active : ''}`}
                     onClick={() => {
                        setActiveLang(lang);
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

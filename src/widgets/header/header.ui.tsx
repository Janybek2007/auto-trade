import React from 'react';
import s from './styles.module.scss';
import AskarLogo from '../../../public/icons/Askar-logo.svg';
import { Link } from '@tanstack/react-router';
import { NavLinks } from './ui/nav-links.ui';
import { SwitchLanguage } from './ui/switch-language.ui';
import { property } from '@shared/utils';

export const Header: React.FC = () => {
   return (
      <header
         className={s.Header}
         ref={el => {
            property(el).global('--header-height', `${el?.clientHeight}px`);
         }}
      >
         <div className={s.container}>
            <div className={s.content}>
               <div className={s.logo}>
                  <img src={AskarLogo} alt='Askar traid logo' />
               </div>

               <div className={s.right_place}>
                  <NavLinks />
                  <div className={s.right}>
                     <Link to='/about'>О нас</Link>
                     <SwitchLanguage />

                     <div className={s.jylas_logo}>
                        <img src={'/image/jylas-tuning.svg'} alt='' />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
};

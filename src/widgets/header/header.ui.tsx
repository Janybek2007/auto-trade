import React from 'react';
import s from './styles.module.scss';
import AskarLogo from '../../../public/icons/Askar-logo.svg';
import { Link } from '@tanstack/react-router';
import { NavLinks } from './ui/nav-links.ui';
import { SwitchLanguage } from './ui/switch-language.ui';
import { property, useSize } from '@shared/utils';
import { useLanguages } from '@shared/libs/intl';
import { Icon } from '@shared/components';

export const Header: React.FC = () => {
   const { currentLanguage } = useLanguages();
   const AboutText = currentLanguage === 'KG' ? 'Биз жөнүндө' : currentLanguage === 'RU' ? 'О нас' : 'About';
   const { width } = useSize();
   return (
      <header
         className={s.Header}
         ref={el => {
            property(el).global('--header-height', `${el?.clientHeight}px`);
         }}
      >
         <div className={`container ${s.container}`}>
            <div className={s.content}>
               <Link to='/' className={s.logo}>
                  <img src={AskarLogo} alt='Askar traid logo' />
               </Link>

               <div className={s.right_place}>
                  {width > 860 ? (
                     <>
                        <NavLinks currentLanguage={currentLanguage} />
                        <div className={s.right}>
                           <Link className={s.aboutLink} to='/about'>
                              {AboutText}
                           </Link>
                           <SwitchLanguage />
                           <div className={s.jylas_logo}>
                              <img src={'/image/jylas-tuning.svg'} alt='' />
                           </div>
                        </div>
                     </>
                  ) : (
                     <>
                        {width >= 600 && (
                           <>
                              <Link className={s.aboutLink} to='/about'>
                                 {AboutText}
                              </Link>
                              <SwitchLanguage />
                           </>
                        )}
                        <div className={s.jylas_logo}>
                           <img src={'/image/jylas.svg'} alt='' />
                        </div>
                        {width <= 600 && (
                           <button className={`${s.menu} flexCenter`}>
                              <Icon name='lucide:menu' />
                           </button>
                        )}
                     </>
                  )}
               </div>
            </div>
         </div>
      </header>
   );
};

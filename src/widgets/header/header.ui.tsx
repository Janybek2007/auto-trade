import React from 'react';
import s from './styles.module.scss';
import AskarLogo from '../../../public/icons/Askar-logo.svg';
import { Link } from '@tanstack/react-router';
import { NavLinks } from './ui/nav-links.ui';
import { SwitchLanguage } from './ui/switch-language.ui';
import { property, useSize } from '@shared/utils';
import { useLanguages } from '@shared/libs/intl';
import { Icon } from '@shared/components';
import { MenuBar } from './ui/MenuBar';
import { AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
   const { currentLanguage } = useLanguages();
   const [open, setOpen] = React.useState(false);
   const AboutText = currentLanguage === 'KG' ? 'Биз жөнүндө' : currentLanguage === 'RU' ? 'О нас' : 'About';
   const { width } = useSize();
   return (
      <>
         <AnimatePresence initial={false} mode='sync'>
            {open && <MenuBar onClose={() => setOpen(false)} />}
         </AnimatePresence>
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
                           <NavLinks />
                           <div className={s.right}>
                              <Link className={s.aboutLink} to='/about'>
                                 {AboutText}
                              </Link>
                              <SwitchLanguage />
                              <figure className={s.jylas_logo}>
                                 <img src={'/image/jylas-tuning.svg'} alt='' />
                              </figure>
                           </div>
                        </>
                     ) : (
                        <>
                           {width >= 860 && (
                              <>
                                 <Link className={s.aboutLink} to='/about'>
                                    {AboutText}
                                 </Link>
                              </>
                           )}
                           <SwitchLanguage />
                           {width >= 600 && (
                              <figure className={s.jylas_logo}>
                                 <img src={'/image/jylas.svg'} alt='' />
                              </figure>
                           )}
                           <button onClick={() => setOpen(p => !p)} className={`${s.menu} flexCenter`}>
                              <Icon name='lucide:menu' />
                           </button>
                        </>
                     )}
                  </div>
               </div>
            </div>
         </header>
      </>
   );
};

import React from 'react';
import s from '../styles.module.scss';
import { Link, useLocation } from '@tanstack/react-router';
import { useLanguages } from '@shared/libs/intl';

export const NavLinks: React.FC<{ direction?: 'row' | 'col' }> = React.memo(({ direction = "row" }) => {
   const { currentLanguage } = useLanguages();

   const isRuOrKg = currentLanguage === 'RU' || currentLanguage === 'KG';
   const { pathname } = useLocation();
   return (
      <nav>
         <ul className={`${pathname !== '/' && s.bg} ${s.nav_list} ${s[`d-${direction}`]}`}>
            <li>
               <Link
                  className={`${pathname !== '/' && s.bg}`}
                  activeProps={{ className: s.active }}
                  to='/filtration'
                  search={{ by: 'america' }}
               >
                  {' '}
                  <img src={'/icons/usa-logo.svg'} alt='USA' />
                  {isRuOrKg ? 'Америка' : 'America'}
               </Link>
            </li>
            <li>
               <Link
                  className={`${pathname !== '/' && s.bg}`}
                  activeProps={{ className: s.active }}
                  to='/filtration'
                  search={{ by: 'dubai' }}
               >
                  {' '}
                  <img src={'/icons/oae-logo.svg'} alt='OAE' />
                  {isRuOrKg ? 'Дубай' : 'Dubai'}
               </Link>
            </li>
            <li>
               <Link
                  className={`${pathname !== '/' && s.bg}`}
                  activeProps={{ className: s.active }}
                  to='/filtration'
                  search={{ by: 'korea' }}
               >
                  {' '}
                  <img src={'/icons/kor-logo.svg'} alt='KOR' />
                  {isRuOrKg ? 'Корея' : 'Korea'}
               </Link>
            </li>
         </ul>
      </nav>
   );
});

NavLinks.displayName = 'NavLinks';

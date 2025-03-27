import React from 'react';
import s from '../styles.module.scss';
import { Link } from '@tanstack/react-router';

export const NavLinks: React.FC = React.memo(() => {
   return (
      <nav>
         <ul className={s.nav_list}>
            <li>
               <Link activeProps={{ className: s.active }} to='/filtration' search={{ by: 'america' }}>
                  {' '}
                  <img src={'/icons/usa-logo.svg'} alt='USA' />
                  Америка
               </Link>
            </li>
            <li>
               <Link activeProps={{ className: s.active }} to='/filtration' search={{ by: 'dubai' }}>
                  {' '}
                  <img src={'/icons/oae-logo.svg'} alt='OAE' />
                  Дубай
               </Link>
            </li>
            <li>
               <Link activeProps={{ className: s.active }} to='/filtration' search={{ by: 'korea' }}>
                  {' '}
                  <img src={'/icons/kor-logo.svg'} alt='KOR' />
                  Кореа
               </Link>
            </li>
         </ul>
      </nav>
   );
});

NavLinks.displayName = 'NavLinks';

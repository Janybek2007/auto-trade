import React from 'react';
import s from './styles.module.scss';
import { useLanguages } from '@shared/libs/intl';

export const PolicyPage: React.FC = () => {
   const { t } = useLanguages();

   return (
      <main>
         <section className={s.policy}>
            <div className='container'>
               <h1>{t.get('policy.title')}</h1>
               <p>{t.get('policy.content')}</p>
            </div>
         </section>
      </main>
   );
};

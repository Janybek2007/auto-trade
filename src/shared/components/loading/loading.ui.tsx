import React from 'react';
import s from './styles.module.scss';
import { useLanguages } from '@shared/libs/intl';

export const Loading: React.FC = React.memo(() => {
   const { currentLanguage } = useLanguages();

   const loadingText = {
      RU: 'Загрузка...',
      KG: 'Жүктөлүү...',
      EN: 'Loading...',
   };

   return <div className={s['loading']}>{loadingText[currentLanguage] || 'Loading...'}</div>;
});

Loading.displayName = 'Loading';

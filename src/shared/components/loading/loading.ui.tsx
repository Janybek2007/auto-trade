import React from 'react';
import s from './styles.module.scss';
import { useLanguages } from '@shared/libs/intl';

export const Loading: React.FC<{ className?: string }> = React.memo(({className}) => {
   const { currentLanguage } = useLanguages();

   const loadingText = {
      RU: 'Загрузка...',
      KG: 'Жүктөлүү...',
      EN: 'Loading...',
   };

   return <div className={`${s['loading']} ${className}`}>{loadingText[currentLanguage] || 'Loading...'}</div>;
});

Loading.displayName = 'Loading';

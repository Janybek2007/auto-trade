import React from 'react';
import styles from './styles.module.scss';
import logo from '../../../public/askar-auto-logo.svg';
import america from '../../../public/image/flagImages/America.svg';
import korea from '../../../public/image/flagImages/Korea.svg';
import dubai from '../../../public/image/flagImages/Dubai.svg';
import { Button } from '@shared/components/button/button.ui';
import { useNavigate } from '@tanstack/react-router';

export const Hero: React.FC = () => {
   const router = useNavigate();
   return (
      <>
         <video className={styles.background} autoPlay loop muted>
            <source src='/video/hero.mp4' type='video/mp4' />
         </video>
         <div className={styles.leftSideDarkening}></div>
         <div className={styles.heroContainer}>
            <div className={`${styles.content}`}>
               <img src={logo} alt='Askar Auto Logo' className={styles.logo} />
               <h1 className={styles.title}>
                  <span>Подбор и доставка авто </span>
                  <br />
                  Из Америки, Кореи и ОАЭ
               </h1>
               <h3 className={styles.subtitle}>Выберите страну</h3>
               <div className={styles.languageButtons}>
                  <Button
                     onClick={() => router({ to: '/filtration', search: { by: 'america' } })}
                     color='neutral'
                     className={styles.languageButton}
                  >
                     <span className={styles.flag}>
                        <img src={america} alt='America Flag' className={styles.flagImage} />
                     </span>
                     Америка
                  </Button>
                  <Button
                     onClick={() => router({ to: '/filtration', search: { by: 'korea' } })}
                     color='neutral'
                     className={styles.languageButton}
                  >
                     <span className={styles.flag}>
                        <img src={korea} alt='Korea Flag' className={styles.flagImage} />
                     </span>
                     Корея
                  </Button>
                  <Button
                     onClick={() => router({ to: '/filtration', search: { by: 'dubai' } })}
                     color='neutral'
                     className={styles.languageButton}
                  >
                     <span className={styles.flag}>
                        <img src={dubai} alt='Dubai Flag' className={styles.flagImage} />
                     </span>
                     Дубай
                  </Button>
               </div>
            </div>
         </div>
      </>
   );
};

import React from 'react';
import styles from './styles.module.scss';
import { Icon } from '@iconify/react';

interface InstagramAccount {
   name: string;
   link: string;
}

interface Country {
   name: string;
   logo: string;
   alt: string;
}

// Instagram аккаунттары үчүн массив
const instagramAccounts: InstagramAccount[] = [
   { name: '@askar_auto_america', link: 'https://www.instagram.com/askar_auto_america' },
   { name: '@askar_korea', link: 'https://www.instagram.com/askar_korea' },
   { name: '@jylas_tuning', link: 'https://www.instagram.com/jylas_tuning' },
];

// Өлкөлөрдүн маалыматы үчүн массив
const countries: Country[] = [
   { name: 'Америка', logo: '/icons/usa-logo.svg', alt: 'USA Logo' },
   { name: 'Дубай', logo: '/icons/oae-logo.svg', alt: 'OAE Flag' },
   { name: 'Корея', logo: '/icons/kor-logo.svg', alt: 'South Korea Flag' },
];

const Footer: React.FC = () => {
   return (
      <footer className={styles.footer}>
         <div className='container'>
            <div className={styles.content}>
               <div className={styles.first}>
                  <img src='/image/jylas-tuning.svg' alt='Jylas Tuning Logo' className={styles.logo} />

                  <img
                     src='/icons/Askar-auto.svg'
                     alt='Askar Auto Logo'
                     data-second
                     className={`${styles.logo}`}
                  />
                  <div className={styles.head}>
                     {countries.map((country, index) => (
                        <React.Fragment key={country.name}>
                           <div className={styles.blog}>
                              <img src={country.logo} alt={country.alt} className={styles.flag} />
                              <p>{country.name}</p>
                           </div>
                           {index < countries.length - 1 && <hr />}
                        </React.Fragment>
                     ))}
                  </div>
               </div>

               <div className={styles.second}>
                  <img src='/icons/Askar-auto.svg' alt='Askar Auto Logo' className={styles.logoAskar} />
                  <div className={styles.block}>
                     <div className={styles.box}>
                        <h4>
                           <Icon icon='mdi:map-marker' className={styles.icons} /> Адрес
                        </h4>
                        <p>г. Бишкек, EURASIA Киевская улица, офис; 4 этаж</p>
                        <p>г. Ош, EURASIA Киевская улица, офис; 4 этаж</p>
                     </div>
                     <ul>
                        <li>
                           <Icon icon='mdi:phone' className={styles.icons} /> Телефон
                        </li>
                        <li>+996 995-20-08-92</li>
                        <li>+996 700-90-00-82</li>
                        <li>+996 508-00-00-01</li>
                     </ul>
                     <ul>
                        <li>
                           <Icon icon='mdi:instagram' className={styles.icons} /> Instagram
                        </li>
                        {instagramAccounts.map(account => (
                           <li key={account.name}>
                              <a href={account.link} target='_blank' rel='noopener noreferrer'>
                                 {account.name}
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>

               {/* Акыркы бөлүк: Логотип */}
               <div className={styles.end}>
                  <img src='/icons/iant-logo.png' alt='IANT Logo' className={styles.logoEnd} />
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;

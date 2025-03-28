import s from './styles.module.scss';
import logo1 from '../../../public/icons/jylas-logo1.svg';
import logo2 from '../../../public/icons/jylas-logo2.svg';
import logo3 from '../../../public/icons/jylas-logo3.svg';
import logo4 from '../../../public/icons/jylas-logo4.svg';
import { useLanguages } from '@shared/libs/intl';

const cardData = [
   { id: 1, icon: logo1, titleKey: 'about.whyUs.cards.individualSelection' },
   { id: 2, icon: logo2, titleKey: 'about.whyUs.cards.qualityReliability' },
   { id: 3, icon: logo3, titleKey: 'about.whyUs.cards.transparentConditions' },
   { id: 4, icon: logo4, titleKey: 'about.whyUs.cards.fastDelivery' },
];

export const WhyUs = () => {
   const { t } = useLanguages();
   return (
      <section className={s.Main}>
         <div className={s.container}>
            <div className={s.content}>
               <h1>{t.get('about.whyUs.title')}</h1>
               <div className={s.main_card}>
                  {cardData.map(item => (
                     <div className={s.card} key={item.id}>
                        <img src={item.icon} alt='' />
                        <p>{t.get(item.titleKey)}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

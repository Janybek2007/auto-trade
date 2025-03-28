import s from './styles.module.scss';
import carImg from '../../../public/image/jylas-car-img.svg?url';
import { useLanguages } from '@shared/libs/intl';

export const AboutInfo = () => {
   const { t } = useLanguages();
   return (
      <section className={s.Main}>
         <div className={s.container}>
            <div className={s.content}>
               <div className={s.right}>
                  <h1>{t.get('about.info.title')}</h1>
                  <p>{t.get('about.info.desc1')}</p>
                  <p>{t.get('about.info.desc2')}</p>
               </div>
               <div className={s.left}>
                  <img src={carImg} alt='' />
                  <div className={s.back_div}></div>
               </div>
            </div> 
         </div>
      </section>
   ); 
};

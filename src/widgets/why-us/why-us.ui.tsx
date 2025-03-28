import s from './styles.module.scss';
import logo1 from '../../../public/icons/jylas-logo1.svg';
import logo2 from '../../../public/icons/jylas-logo2.svg';
import logo3 from '../../../public/icons/jylas-logo3.svg';
import logo4 from '../../../public/icons/jylas-logo4.svg';

const cardData = [
   {
      id: 1,
      icon: logo1,
      title: 'Индивидуальный подбор авто',
   },
   {
      id: 2,
      icon: logo2,
      title: 'Качество и надежность для вас',
   },
   {
      id: 3,
      icon: logo3,
      title: 'Прозрачные условия сделки',
   },
   {
      id: 4,
      icon: logo4,
      title: 'Быстрая доставка в любую точку',
   },
];

export const WhyUs = () => { 
   return (
      <section className={s.Main}>
         <div className={s.container}>
            <div className={s.content}>
               <h1>Почему мы?</h1>

               <div className={s.main_card}>
                  {cardData.map(item => (
                     <div className={s.card} key={item.id}>
                        <img src={item.icon} alt='' />
                        <p>{item.title}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
};

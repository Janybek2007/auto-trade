import s from './styles.module.scss';
import carImg from '../../../public/image/jylas-car-img.svg?url';

export const AboutInfo = () => {
   return (
      <section className={s.Main}>
         <div className={s.container}>
            <div className={s.content}>
               <div className={s.right}>
                  <h1>О нас</h1>
                  <p><span>Аскар Авто Трейд</span> – ваш надежный партнер в мире автомобильного бизнеса! Мы специализируемся на участии в автоаукционах ОАЭ и США, а также на выкупе автомобилей из этих стран и Южной Кореи.</p>
                  <p>Наша компания предлагает полный цикл услуг – от подбора и покупки автомобиля до его доставки в Кыргызстан. Мы тщательно проверяем каждое транспортное средство, чтобы обеспечить клиентам только лучшие варианты по выгодным ценам.</p>
                  <p>С <span>Аскар Авто Трейд</span> покупка авто за границей становится простой и безопасной!</p>
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

import s from '../style.module.scss';
import { CarItemPops } from '../card-item.types';

export const ListItem: React.FC<Omit<CarItemPops, 'actions'>> = ({ item, children }) => {
   return (
      <>
         <div className={`${s.car} ${s['t-list']}`}>
            <div className={s.content}>
               <div className={s.card_img}>
                  <img className={s.image} src={item.image} alt='Car Image' />
               </div>

               <div className={s.left_cont}>
                  <div className={s.card_content}>
                     <div className={s.card_title}>
                        <h1>{item.model}</h1>
                        <div className={s.car_specs}>
                           <p>{item.range}km</p>
                           <p>.</p>
                           <p>{item.year}</p>
                        </div>
                     </div>
                     <h3>${item.price}</h3>
                  </div>

                  {children}
               </div>
            </div>
         </div>
      </>
   );
};

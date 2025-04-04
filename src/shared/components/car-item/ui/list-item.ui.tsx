import s from '../style.module.scss';
import { CarItemPops } from '../card-item.types';

export const ListItem: React.FC<Omit<CarItemPops, 'actions'>> = ({ item, children, extraComponents }) => {
   return (
      <>
         <div data-car-item className={`${s.car} ${s['t-list']}`}>
            {extraComponents}
            <div data-car-content className={s.content}>
               <div className={s.card_img}>
                  <img
                     data-car-image
                     className={s.image}
                     src={item.photos[0]?.image || '/image/placeholder.png'}
                     alt={`${item.brand.name} ${item.model.name}`}
                  />
               </div>

               <div className={s.left_cont}>
                  <div className={s.card_content}>
                     <div className={s.card_title}>
                        <h1>
                           {item.brand.name} {item.model.name}
                        </h1>
                        <div className={s.car_specs}>
                           <p>{item.mileage} km</p>
                           <p>.</p>
                           <p>{item.year}</p>
                        </div>
                     </div>
                     <h3>
                        ${item.start_price} - ${item.end_price}
                     </h3>
                  </div>

                  {children}
               </div>
            </div>
         </div>
      </>
   );
};

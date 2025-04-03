import s from '../style.module.scss';
import React from 'react';
import { CarItemPops } from '../card-item.types';

export const CardItem: React.FC<Omit<CarItemPops, 'actions'>> = ({ children, item, extraComponents }) => {
   return (
      <div data-car-item className={`${s.car} ${s['t-card']}`}>
         {extraComponents}
         <div data-car-content className={s.content}>
            <img
               data-car-image
               className={s.image}
               src={item.photos[0]?.image || '/placeholder.jpg'}
               alt={item.model.name}
            />

            <div className={s.card_content}>
               <h1>
                  {item.brand.name} {item.model.name}
               </h1>
               <div className={s.car_specs}>
                  <p>{item.mileage} km</p>
                  <div className={s.circle}></div>
                  <p>{item.year}</p>
                  <div className={s.circle}></div>
                  <p>
                     {item.engine_volume}L {item.fuel_type}
                  </p>
               </div>
               <h3>
                  ${item.start_price} - ${item.end_price}
               </h3>
               <p className={s.auction_time}>{item.time_left}</p>
            </div>
            {children}
         </div>
      </div>
   );
};

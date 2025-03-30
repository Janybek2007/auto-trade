import s from '../style.module.scss';
import React from 'react';
import { CarItemPops } from '../card-item.types';

export const CardItem: React.FC<Omit<CarItemPops, 'actions'>> = ({ children, item, extraComponents }) => {
   return (
      <>
         <div data-car-item className={`${s.car} ${s['t-card']}`}>
            {extraComponents}
            <div data-car-content className={s.content}>
               <img data-car-image className={s.image} src={item.image} alt='Car Image' />

               <div className={s.card_content}>
                  <h1>{item.model}</h1>
                  <div className={s.car_specs}>
                     <p>{item.range}km</p>
                     <div className={s.circle}></div>
                     <p>{item.year}</p>
                  </div>
                  <h3>${item.price}</h3>
               </div>
               {children}
            </div>
         </div>
      </>
   );
};

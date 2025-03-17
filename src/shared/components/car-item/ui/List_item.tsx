import s from '../style.module.scss';
import expamleImgForCard from '../../../../../public/image/askar-img.svg';
import { Button, type ButtonProps } from '@shared/components/button/button.ui';

const CardDatas = {
   model: 'Kia K5',
   range: '38 000',
   year: '2024',
   price: '24 410',
};

interface ActionButton {
   type: 'Подробнее' | 'Сравнение';
   button?: Omit<ButtonProps, 'children'>;
}

interface IProps {
   actions: ActionButton[];
}


export const List_item: React.FC<IProps> = ({ actions }) => {
   return (
      <>
         <div className={`${s.car} ${s['t-list']}`}>
            <div className={s.card}>
               <div className={s.card_img}>
                  <img src={expamleImgForCard} alt='' />
               </div>

               <div className={s.left_cont}>
                  <div className={s.card_content}>
                     <div className={s.card_title}>
                        <h1>{CardDatas.model}</h1>
                        <div className={s.car_specs}>
                           <p>{CardDatas.range}km</p>
                           <p>.</p>
                           <p>{CardDatas.year}</p>
                        </div>
                     </div>
                     <h3>${CardDatas.price}</h3>
                  </div>

                  <div className={s.buttons}>
                     {actions.map(({ type, button }, index) => (
                        <Button
                        {...button}
                        variant={type === 'Сравнение' ? 'outline' : 'solid'}
                        key={type}
                        children={type}
                     />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

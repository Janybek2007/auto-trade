import React from 'react';
import { CarItemPops, CarItemType } from './card-item.types';
import { CardItem } from './ui/card-item.ui';
import { ListItem } from './ui/list-item.ui';
import s from './style.module.scss';
import { Button } from '../button/button.ui';

const ActionsComponent = (actions: CarItemPops['actions'] = [{ type: 'Подробнее' }, { type: 'Сравнение' }]) => (
   <div className={s.buttons}>
      {actions.map(({ type, button }) => (
         <Button {...button} className={s[`t-${type}`]} variant={type === 'Сравнение' ? 'outline' : 'solid'} key={type}>
            {type == 'Сравнение' && (
               <img className={s['compare-icon']} src='/icons/compare-icon.svg' alt='Compare Icon' />
            )}
            {type}
         </Button>
      ))}
   </div>
);

type TProps = Omit<CarItemPops, 'children'> & CarItemType;

export const CarItem: React.FC<TProps> = ({ actions, item, type = 'card' }) => {
   return type == 'card' ? (
      <CardItem item={item}>{ActionsComponent(actions)}</CardItem>
   ) : (
      <ListItem item={item}>{ActionsComponent(actions)}</ListItem>
   );
};

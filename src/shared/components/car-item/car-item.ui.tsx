import React from 'react';
import { CarItemPops, CarItemType } from './card-item.types';
import { CardItem } from './ui/card-item.ui';
import { ListItem } from './ui/list-item.ui';
import s from './style.module.scss';
import { Button } from '../button/button.ui';
import { useLanguages } from '@shared/libs/intl';

const ActionsComponent = (actions: CarItemPops['actions'] = [{ type: 'more' }, { type: 'compare' }]) => {
   const { t } = useLanguages();

   return (
      <div className={s.buttons}>
         {actions.map(({ type, button }, index) => (
            <Button
               {...button}
               className={`${s[`l-${actions.length}`]} ${s[`t-${type}`]}`}
               variant={type === 'more' ? 'outline' : 'solid'}
               key={`${type}-${index}`}
            >
               {type === 'more' && actions.length > 1 && (
                  <img className={s['compare-icon']} src='/icons/compare-icon.svg' alt='Compare Icon' />
               )}
               {type === 'compare' ? t.get('carActions.comparison') : t.get('carActions.more')}
            </Button>
         ))}
      </div>
   );
};

type TProps = Omit<CarItemPops, 'children'> & CarItemType;

export const CarItem: React.FC<TProps> = ({ actions, type = 'card', ...props }) => {
   return type === 'card' ? (
      <CardItem {...props}>{ActionsComponent(actions)}</CardItem>
   ) : (
      <ListItem {...props}>{ActionsComponent(actions)}</ListItem>
   );
};

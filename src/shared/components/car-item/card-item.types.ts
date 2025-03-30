import { ButtonProps } from '../button/button.ui';

export interface ActionButton {
   type: 'more' | 'compare';
   button?: Omit<ButtonProps, 'children'>;
}

export interface CarItemType {
   type?: "card" | 'list'
}

export interface CarItemPops extends React.PropsWithChildren {
   actions?: ActionButton[];
   extraComponents?: React.ReactNode
   item: {
      model: string;
      range: string;
      year: number;
      price: string;
      image: string
   };
}

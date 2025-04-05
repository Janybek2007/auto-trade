import { CarDto } from '@shared/api/cars';
import { ButtonProps } from '../button/button.ui';

export interface ActionButton {
   type: 'more' | 'compare';
   button?: ButtonProps;
}

export interface CarItemType {
   type?: 'card' | 'list';
}

export interface CarItemPops extends React.PropsWithChildren {
   actions?: ActionButton[];
   extraComponents?: React.ReactNode;
   item: CarDto;
   isCompares?: boolean
}

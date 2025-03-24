import React from 'react';
import s from './styles.module.scss';
import type { IconProps } from '../icon/icon.types';
import { Icon } from '../icon/icon.ui';

export interface ButtonProps extends React.PropsWithChildren {
   variant?: 'solid' | 'outline';
   disabled?: boolean;
   onClick?: VoidFunction;
   icon?: IconProps;
   className?: string;
}

export const Button: React.FC<ButtonProps> = ({ variant, children, disabled, onClick, icon, className }) => {
   return (
      <button disabled={disabled} onClick={onClick} className={`${s.button} ${s[`v-${variant}`]} ${className}`}>
         {icon && <Icon {...icon} />}
         {children}
      </button>
   );
};

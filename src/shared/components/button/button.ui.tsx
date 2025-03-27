import React from 'react';
import s from './styles.module.scss';
import type { IconProps } from '../icon/icon.types';
import { Icon } from '../icon/icon.ui';

export interface ButtonProps extends React.PropsWithChildren {
   variant?: 'solid' | 'outline';
   disabled?: boolean;
   onClick?: (e: React.MouseEvent) => void;
   icon?: IconProps;
   className?: string;
   color?: 'neutral' | 'primary' | 'secondary';
   size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
   variant = 'solid',
   children,
   disabled,
   onClick,
   icon,
   className,
   color = 'primary',
   size = 'md',
}) => {
   return (
      <button
         disabled={disabled}
         onClick={onClick}
         className={`${s.button} ${s[`v-${variant}`]} ${s[`c-${color}`]} ${s[`s-${size}`]} ${className}`}
      >
         {icon && <Icon {...icon} />}
         {children}
      </button>
   );
};

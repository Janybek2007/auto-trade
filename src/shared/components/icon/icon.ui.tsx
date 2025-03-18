import { Icon as IconifyIcon } from '@iconify/react';
import React from 'react';
import type { IconProps } from './icon.types';

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
   if (!name) {
      return null;
   }
   return <IconifyIcon icon={name} className={props.className} width={props.c_size} height={props.c_size} {...props} />;
};

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ToastItem as TItem } from '../types';
import { useToast } from '../store';
import { Button, Icon } from '@shared/components';
import s from '../styles.module.scss';

const ToastItem: React.FC<{ toast: TItem; is: boolean }> = React.memo(({ toast, is }) => {
   const { removeToast } = useToast();
   const { title, description, icon, actions, duration = 2500 } = toast;

   const [progress, setProgress] = useState(100);
   const [isHovered, setIsHovered] = useState(false);

   const handleRemove = React.useCallback(() => {
      removeToast(toast.id);
   }, [removeToast]);

   useEffect(() => {
      if (duration > 0 && !isHovered) {
         const interval = 100;
         const decrement = (interval / duration) * 100;

         const timer = setInterval(() => {
            setProgress(prev => {
               if (prev - decrement <= 0) {
                  clearInterval(timer);
                  handleRemove();
                  return 0;
               }
               return prev - decrement;
            });
         }, interval);

         return () => clearInterval(timer);
      }
   }, [isHovered]);

   return (
      <motion.div
         initial={{ opacity: 0, y: 50, scale: 0.8 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         exit={{ opacity: 0, y: 50, scale: 0.8 }}
         transition={{ type: 'tween', stiffness: 300, damping: 20 }}
         className={`${s.toastWrapper} ${is ? s.is : ''}`}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         {icon && <Icon {...icon} />}
         <div className={s.toastContent}>
            <div className={s.col}>
               {title && <div className={s.textHighlighted}>{title}</div>}
               {description && <p className={s.textDimmed}>{description}</p>}
            </div>
            <div className={s.toastActions}>
               {actions &&
                  actions.map((action, index) => <Button key={Math.floor(Math.random() * 20) + index} {...action} size="sm" />)}
            </div>
         </div>
         <div className={s.progressBar}>
            <div className={s.progressFill} style={{ width: `${progress}%` }}></div>
         </div>
      </motion.div>
   );
});

ToastItem.displayName = 'ToastItem';

export default ToastItem;

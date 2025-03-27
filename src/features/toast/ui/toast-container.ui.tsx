import React from 'react';
import { useToast } from '../store';
import ToastItem from './toast-item.ui';
import s from '../styles.module.scss';

const ToastContainer: React.FC = React.memo(() => {
   const { toasts } = useToast();

   return (
      <div suppressContentEditableWarning className={s.toast_container}>
         {toasts.length >= 1 &&
            toasts.map((toast, index) => (
               <ToastItem key={toast.id + toast.title} is={toasts.length !== index + 1} toast={toast} />
            ))}
      </div>
   );
});

ToastContainer.displayName = 'ToastContainer';
export default ToastContainer;

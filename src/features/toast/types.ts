import { ButtonProps, IconProps } from '@shared/components';

export interface ToastItem {
   id: string;
   title?: string;
   description?: string;
   icon?: IconProps;
   duration?: number;
   actions?: ButtonProps[];
}

export interface ToastStore {
   toasts: ToastItem[];
   toast(_: string, params?: Partial<Omit<ToastItem, 'title'>>): void;
   removeToast(toastId: string): void;
}

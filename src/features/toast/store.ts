import { create } from 'zustand';
import type { ToastStore } from './types';

export const useToast = create<ToastStore>()((set, get) => ({
   toasts: [],
   toast(title, toastConf) {
      set(state => ({
         toasts: [
            ...state.toasts,
            {
               title,
               id: Date.now().toString() + +Math.floor(Math.random() * 20),
               ...toastConf,
            },
         ],
      }));
   },
   removeToast(toastId) {
      set(state => ({
         toasts: state.toasts.filter(toast => toast.id !== toastId),
      }));
   },
}));

export const toast = useToast.getState().toast;

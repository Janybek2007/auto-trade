import React, { useState, useEffect, useCallback } from 'react';

// Тип для функции, которая возвращает начальное значение
type InitialValue<T> = T | (() => T);

// Интерфейс для опций (можно расширить в будущем)
interface LocalStorageOptions {
   serializer?: (value: any) => string;
   deserializer?: (value: string) => any;
}

export function useLocalstorageState<T>(
   key: string,
   initialValue: InitialValue<T>,
   options: LocalStorageOptions = {},
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
   // Определяем функции сериализации/десериализации с дефолтными значениями
   const { serializer = JSON.stringify, deserializer = JSON.parse } = options;

   // Инициализация состояния
   const [state, setState] = useState<T>(() => {
      // Проверяем, что мы на клиенте
      if (typeof window === 'undefined') {
         return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
      }

      try {
         const storedValue = localStorage.getItem(key);
         if (storedValue !== null) {
            return deserializer(storedValue);
         }
         return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
      } catch (error) {
         console.error(`Error reading localStorage key "${key}":`, error);
         return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
      }
   });

   // Синхронизация с localStorage
   useEffect(() => {
      if (typeof window === 'undefined') return;

      try {
         if (state === undefined || state === null) {
            localStorage.removeItem(key);
         } else {
            localStorage.setItem(key, serializer(state));
         }
      } catch (error) {
         console.error(`Error setting localStorage key "${key}":`, error);
      }
   }, [key, state, serializer]);

   // Функция для сброса значения до начального
   const reset = useCallback(() => {
      const value = typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
      setState(value);
   }, [initialValue]);

   // Синхронизация между вкладками
   useEffect(() => {
      if (typeof window === 'undefined') return;

      const handleStorageChange = (event: StorageEvent) => {
         if (event.key === key && event.newValue !== serializer(state)) {
            try {
               const newValue = event.newValue ? deserializer(event.newValue) : null;
               setState(newValue ?? (typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue));
            } catch (error) {
               console.error(`Error parsing localStorage key "${key}" on storage event:`, error);
            }
         }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
   }, [key, state, serializer, deserializer, initialValue]);

   return [state, setState, reset];
}

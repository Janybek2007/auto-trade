'use client';
import React, { useState, useEffect } from 'react';

export function useLocalstorageState<T>(
   key: string,
   initialValue: T | (() => T),
): [T, React.Dispatch<React.SetStateAction<T>>] {
   const [state, setState] = useState<T>((): T => {
      if (typeof window !== 'undefined') {
         const storedValue = localStorage.getItem(key);
         if (storedValue) {
            return JSON.parse(storedValue);
         }
         return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
      }
      return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
   });

   useEffect(() => {
      try {
         if (state !== undefined) {
            localStorage.setItem(key, JSON.stringify(state));
         }
      } catch (error) {
         console.error('Error setting localStorage key:', key, error);
      }
   }, [key, state]);

   return [state, setState];
}

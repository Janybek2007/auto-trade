export const property = (target: HTMLElement | null) => ({
   set: (key: string, value: string) => target?.style.setProperty(key, value),
   get: (key: string) => target?.style.getPropertyValue(key),
   delete: (key: string) => target?.style.removeProperty(key),
   global: (key: string, value: string) => document.documentElement.style.setProperty(key, value),
});

export function useProperty({ className }: { className?: string } = {}) {
   const target = className ? (document.getElementsByClassName(className)[0] as HTMLElement) : null;
   return property(target);
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const memoizePromiseFn = <T>(fn: (...args: any[]) => Promise<T>) => {
  const cache = new Map<string, Promise<T>>();

  return (...args: any[]): Promise<T> => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("cache hit", args);
      return cache.get(key) as Promise<T>;
    }

    const promise = fn(...args).catch((error) => {
      // Delete cache entry if the promise fails
      cache.delete(key);
      return Promise.reject(error);
    });

    cache.set(key, promise);

    return promise;
  };
};

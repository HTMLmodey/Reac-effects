import { useState, useCallback, DependencyList } from 'react';
import { AsyncFunctionWithLoading } from './types';

export const useCallbackLoading = <S, T extends (...args: any[]) => Promise<S> = any>(
  key: string,
  promiseFn: T,
  deps: DependencyList
): AsyncFunctionWithLoading<T> => {
  const [loading, setLoading] = useState(false);

  const callback = useCallback(
    (...args: Parameters<T>): Promise<S> => {
      setLoading(true);
      return promiseFn(...args)
        .then((result) => {
          setLoading(false);
          return result;
        })
        .catch((error) => {
          setLoading(false);
          throw error;
        });
    },
    [promiseFn, ...deps]
  );

  (callback as AsyncFunctionWithLoading<T>).loading = loading;

  return callback as AsyncFunctionWithLoading<T>;
};
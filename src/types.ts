export type AsyncFunctionWithLoading<T extends (...args: any[]) => Promise<any>> = T & {
    loading: boolean;
  };
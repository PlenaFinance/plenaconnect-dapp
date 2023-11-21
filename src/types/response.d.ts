declare global {
  interface Response<T> {
    success: boolean;
    content: T;
    error: string;
  }
}

export {};
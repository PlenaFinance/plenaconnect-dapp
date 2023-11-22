export interface Response<T> {
  success: boolean;
  content: T;
  error: string;
}

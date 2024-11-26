export interface IResponse<T> {
  success: boolean;
  message?: any;
  data?: T | undefined;
}

export type Response<T> = Promise<IResponse<T>>

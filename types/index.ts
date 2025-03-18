export type ApiResponse = {
  success: boolean;
  message: string;
  status?: number;
  headers?: any;
};
export interface ApiDataResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
  status?: number;
  headers?: any;
}

export * from './auth';
export * from './dashboard';
export * from './error';
export * from './todo';

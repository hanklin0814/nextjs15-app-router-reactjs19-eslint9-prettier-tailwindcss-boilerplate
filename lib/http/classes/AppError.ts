import { AxiosError } from 'axios';

import type { ErrorResponse, ErrorType } from '@/types';

export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;
  public readonly success: boolean;
  public readonly data?: any;

  constructor(
    type: ErrorType = 'UNKNOWN',
    message: string = '發生未知錯誤',
    statusCode: number = 500,
    data?: any
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.statusCode = statusCode;
    this.success = false;
    this.data = data;
  }

  public toResponse(): ErrorResponse {
    return {
      success: this.success,
      message: this.message,
      statusCode: this.statusCode,
      data: this.data,
    };
  }

  static fromAxiosError(error: AxiosError<{ message?: string }>): AppError {
    const statusCode = error.response?.status || 500;
    const message = error.response?.data?.message || error.message;
    const data = error.response?.data;

    return new AppError('HTTP', message, statusCode, data);
  }

  static fromApiError(message: string, statusCode: number = 400): AppError {
    return new AppError('API', message, statusCode);
  }
}

export const handleError = (error: unknown): ErrorResponse => {
  if (error instanceof AppError) {
    return error.toResponse();
  }

  if (error instanceof AxiosError) {
    return AppError.fromAxiosError(error).toResponse();
  }

  return new AppError().toResponse();
};

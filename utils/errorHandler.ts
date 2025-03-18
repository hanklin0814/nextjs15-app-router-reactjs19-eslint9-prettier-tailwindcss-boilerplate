import { AppError } from '@/lib/http/classes/AppError';
import type { ErrorResponse } from '@/types';

import showToast from './showToast';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ErrorHandlerOptions {
  showToast?: boolean;
  toastType?: ToastType;
  defaultMessage?: string;
}

export const generalErrorHandler = (
  error: unknown,
  options: ErrorHandlerOptions = {
    showToast: true,
    toastType: 'error',
    defaultMessage: '發生未知錯誤',
  }
): ErrorResponse => {
  let errorResponse: ErrorResponse;

  if (error instanceof AppError) {
    errorResponse = error.toResponse();
  } else if (error instanceof Error) {
    errorResponse = {
      success: false,
      message: error.message,
      statusCode: 500,
    };
  } else {
    errorResponse = {
      success: false,
      message: options.defaultMessage || '發生未知錯誤',
      statusCode: 500,
    };
  }

  if (options.showToast) {
    showToast(
      `${errorResponse.statusCode} ${errorResponse.message}`,
      options.toastType || 'error'
    );
  }

  return errorResponse;
};

// 方便使用的工具函數
export const createErrorHandler = (options?: ErrorHandlerOptions) => {
  return (error: unknown) => generalErrorHandler(error, options);
};

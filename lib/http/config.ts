import type { AxiosRequestConfig } from 'axios';

/**
 * 環境變數配置
 */
const ENV = process.env.NODE_ENV || 'development';
const IS_DEV = ENV === 'development';
const IS_PROD = ENV === 'production';
const IS_TEST = ENV === 'test';

/**
 * API 配置
 */
const API_CONFIG = {
  // API 基礎 URL
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DOMAIN || '',

  // 請求超時設定 (ms)
  timeout: IS_PROD
    ? 300000 // 正式環境 5 分鐘
    : IS_TEST
      ? 1000 // 測試環境 1 秒
      : 60000, // 開發環境 1 分鐘

  // 認證設定
  withCredentials: IS_PROD, // 只在正式環境啟用

  // 預設 Headers
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
} as const satisfies AxiosRequestConfig;

/**
 * HTTP 請求配置
 */
const HTTP_CONFIG = {
  maxRetries: IS_PROD ? 3 : 1,
  retryDelay: 1000,
  defaultLoading: true,
  defaultShowToast: true,
  unauthorizedPath: '/auth/login',
} as const;

export { API_CONFIG, ENV, HTTP_CONFIG, IS_DEV, IS_PROD, IS_TEST };

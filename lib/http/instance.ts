import Http from '@/lib/http/classes/Http';
import { API_CONFIG } from '@/lib/http/config';

import type { HttpRequestConfig } from './types';

// 基礎配置
const baseConfig: HttpRequestConfig = {
  ...API_CONFIG,
};

// 1. 一般請求實例 (不需驗證)
export const http = new Http({
  ...baseConfig,
  showLoading: true,
});

// 2. 需要帶 token 的請求實例
export const httpWithAuth = new Http({
  ...baseConfig,
  showLoading: true,
  interceptors: {
    requestInterceptor: (config) => {
      const accessToken = 'TEST_ACCESS_TOKEN';
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    responseInterceptorCatch: (error) => {
      // 自定義驗證錯誤處理
      return Promise.reject(error);
    },
  },
});

// 3. 登入/註冊請求實例
export const httpAuth = new Http({
  ...baseConfig,
  showLoading: false,
  showToast: false, // 需要在 HttpRequestConfig 中新增此屬性
});

export default http;

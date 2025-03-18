import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import NProgress from 'nprogress';

import showToast from '@/utils/showToast';

import { HTTP_CONFIG } from '../config';
import type { HttpInterceptors, HttpRequestConfig } from '../types';
import { AppError, handleError } from './AppError';

const DEFAULT_LOADING = true;
const DEFAULT_SHOW_TOAST = true;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export default class Http {
  private instance: AxiosInstance;
  private interceptors?: HttpInterceptors;
  private defaultShowLoading: boolean;
  private defaultShowToast: boolean;

  constructor(config: HttpRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.defaultShowLoading = config.showLoading ?? DEFAULT_LOADING;
    this.defaultShowToast = config.showToast ?? DEFAULT_SHOW_TOAST;
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // 客製化攔截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 全域請求攔截器
    this.instance.interceptors.request.use(
      (config) => {
        this.handleLoading(true);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 全域回應攔截器
    this.instance.interceptors.response.use(
      (res) => {
        this.handleLoading(false);
        return res;
      },
      async (error) => {
        this.handleLoading(false);
        // 處理 401 未授權錯誤
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          if (typeof window !== 'undefined') {
            window.location.href = HTTP_CONFIG.unauthorizedPath;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private handleLoading(isStart: boolean): void {
    if (this.defaultShowLoading) {
      NProgress.configure({ showSpinner: false });
      if (isStart) {
        NProgress.start();
      } else {
        NProgress.done();
      }
    }
  }

  private async retryRequest(
    config: HttpRequestConfig,
    retries = MAX_RETRIES
  ): Promise<any> {
    try {
      return await this.instance.request(config);
    } catch (error) {
      if (retries > 0 && error instanceof AxiosError && !error.response) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return this.retryRequest(config, retries - 1);
      }
      throw error;
    }
  }

  private async requestApi<TData>(config: HttpRequestConfig): Promise<TData> {
    const showLoading = config.showLoading ?? this.defaultShowLoading;
    try {
      if (showLoading) {
        NProgress.configure({ showSpinner: false });
        NProgress.start();
      }

      const res = await this.retryRequest(config);
      return res.data;
    } catch (error) {
      if (showLoading) {
        NProgress.done();
      }

      if (error instanceof AxiosError) {
        throw this.handleAxiosError(error);
      } else {
        throw new AppError();
      }
    } finally {
      if (showLoading) {
        NProgress.done();
      }
    }
  }

  private handleAxiosError(error: AxiosError): never {
    const errorResponse = handleError(error);

    if (this.defaultShowToast) {
      showToast(errorResponse.message, 'error');
    }

    throw new AppError(
      'HTTP',
      errorResponse.message,
      errorResponse.statusCode,
      errorResponse.data
    );
  }

  public async get<TData = any, TParams = any>(
    path: string,
    params?: TParams,
    config?: HttpRequestConfig
  ): Promise<TData> {
    return this.requestApi<TData>({
      ...config,
      url: path,
      params,
      method: 'GET',
    });
  }

  public async delete<TData = any, TParams = any>(
    path: string,
    params?: TParams,
    config?: HttpRequestConfig
  ): Promise<TData> {
    return this.requestApi<TData>({
      ...config,
      url: path,
      params,
      method: 'DELETE',
    });
  }

  public async post<TData = any, TPayload = any>(
    path: string,
    payload?: TPayload,
    config?: HttpRequestConfig
  ): Promise<TData> {
    return this.requestApi<TData>({
      ...config,
      url: path,
      data: payload,
      method: 'POST',
    });
  }

  public async put<TData = any, TPayload = any>(
    path: string,
    payload?: TPayload,
    config?: HttpRequestConfig
  ): Promise<TData> {
    return this.requestApi<TData>({
      ...config,
      url: path,
      data: payload,
      method: 'PUT',
    });
  }

  public async patch<TData = any, TPayload = any>(
    path: string,
    payload?: TPayload,
    config?: HttpRequestConfig
  ): Promise<TData> {
    return this.requestApi<TData>({
      ...config,
      url: path,
      data: payload,
      method: 'PATCH',
    });
  }
}

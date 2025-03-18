import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useLazyRequest Hook 的配置選項介面
 * @template TData - 請求成功後返回的資料型別
 * @template TError - 錯誤的型別
 */
interface UseLazyRequestOptions<TValues, TError> {
	autoFetch?: boolean;
	onSuccess?: (values: TValues) => void;
	onError?: (error: TError) => void;
}

/**
 * 手動觸發的請求 Hook
 * @template TCallback - 回調函數的型別，必須是一個返回 Promise 的函數
 * @template TError - 錯誤的型別，預設是 Error
 * @param callback - 執行請求的回調函數
 * @param options - Hook 的配置選項
 */
export function useLazyRequest<TCallback extends (...args: any[]) => any, TError = Error>(
	callback: TCallback,
	options: UseLazyRequestOptions<Awaited<ReturnType<TCallback>>, TError> = {},
) {
	const { 
    autoFetch = false, 
    onSuccess,
    onError,
  } = options;

	const [loading, setLoading] = useState(autoFetch);
	const [data, setData] = useState<null | Awaited<ReturnType<TCallback>>>(null);
	const [error, setError] = useState<TError | null>(null);

	// 使用 useRef 保存回調函數，避免重複渲染
	const previousDataRef = useRef(data);
	const callbackRef = useRef(callback);
	callbackRef.current = callback;

	// 執行請求並「拋出」錯誤的函數
	const runCallbackAsync = useCallback(async (...args: Parameters<TCallback>) => {
		try {
			setError(null);
			setLoading(true);

			const newData = await callbackRef.current(...args);
			previousDataRef.current = data;

			setData(newData);
			onSuccess?.(newData);

			return newData;
		} catch (error) {
			setError(error as never);
			onError?.(error as never);

			throw error;
		} finally {
			setLoading(false);
		}
	}, [data, onError, onSuccess]) as TCallback;

	// 執行請求但「不拋出」錯誤的函數
	const runCallback = useCallback(async (...args: Parameters<TCallback>) => {
    try {
      return await runCallbackAsync(...args);
    } catch {
      // 靜默處理錯誤
      return null;
    }
  }, [runCallbackAsync]) as TCallback;

	useEffect(() => {
    let mounted = true;

    if (autoFetch && mounted) {
      runCallback();
    }

		// 清理函數，防止記憶體洩漏
    return () => {
      mounted = false;
    };
  }, [autoFetch, runCallback]);

	return [
		runCallbackAsync,
		{
			previousData: previousDataRef.current,
			data,
			error,
			loading,
			runCallback,
		},
	] as const;
}

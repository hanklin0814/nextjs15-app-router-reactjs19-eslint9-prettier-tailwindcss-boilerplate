import { useLazyRequest } from './useLazyRequest';

/**
 * useRequest Hook 的配置選項介面
 * @template TValues - 請求成功後返回的資料型別
 * @template TError - 錯誤的型別
 */
interface UseRequestOptions<TValues, TError> {
	autoFetch?: boolean;
	onSuccess?: (values: TValues) => void;
	onError?: (error: TError) => void;
}

/**
 * 自動執行的請求 Hook
 * @template TCallback - 回調函數的型別，必須是一個返回 Promise 的函數
 * @template TError - 錯誤的型別，預設是 Error
 * @param callback - 執行請求的回調函數
 * @param options - Hook 的配置選項，已移除 autoFetch 選項因為固定為 true
 */
export function useRequest<TCallback extends (...args: any[]) => any, TError = Error>(
	callback: TCallback,
	options: Omit<UseRequestOptions<Awaited<ReturnType<TCallback>>, TError>, 'autoFetch'> = {},
) {
	// 使用 useLazyRequest 並設置 autoFetch 為 true
	const [runCallbackAsync, state] = useLazyRequest(callback, { ...options, autoFetch: true });

	return {
		...state,
		runCallbackAsync,
	};
}

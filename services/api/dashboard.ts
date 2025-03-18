import { http } from '@/lib/http/instance';
import type { ApiDataResponse, PostResponse } from '@/types';

export const dashboard = async (): Promise<ApiDataResponse<PostResponse[]>> => {
  try {
    const data = await http.get<PostResponse[]>(
      `https://jsonplaceholder.typicode.com/posts`
    );

    // 回應格式統一
    return {
      success: true,
      message: '取得文章列表成功',
      data,
    };
  } catch (error) {
    console.error('Dashboard API Error:', error);

    // 錯誤處理一致
    return {
      success: false,
      message: '取得文章列表失敗',
    };
  }
};

export const imageLoadTest = async (
  callbackFn: (percentage: number) => void
): Promise<ApiDataResponse<Blob>> => {
  try {
    const data = await http.get<Blob>(
      `https://fetch-progress.anthum.com/10kbps/images/sunrise-baseline.jpg`,
      undefined,
      {
        onDownloadProgress: (e) => {
          if (!e.total) return;
          const p = Math.round((e.loaded * 100) / e.total);
          callbackFn(p);
        },
        responseType: 'blob', // 設定回應類型為 arraybuffer
      }
    );

    // 回應格式統一
    return {
      success: true,
      data,
      message: '圖片載入成功',
    };
  } catch (error) {
    console.error('Dashboard API Error:', error);

    // 錯誤處理一致
    return {
      success: false,
      message: '圖片載入失敗',
    };
  }
};

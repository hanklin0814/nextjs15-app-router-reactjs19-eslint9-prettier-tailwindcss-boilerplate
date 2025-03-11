// 此頁面在載入時會呼叫 /api/protected 取得保護資料，若回應 401 則嘗試透過 /api/refresh 取得新 token；
// 另外提供登出按鈕呼叫 /api/logout：
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Navigation from '@/components/Navigation';
import Slider from '@/components/Slider';

interface ProtectedData {
  message: string;
  user?: string;
}

export default function ProtectedPage() {
  const [data, setData] = useState<ProtectedData | null>(null);
  const router = useRouter();

  const fetchProtectedData = async () => {
    const res = await fetch('/api/protected', {
      // 確保 cookie 被送出
      credentials: 'include',
    });
    if (res.ok) {
      const result = await res.json();
      setData(result);
    } else if (res.status === 401) {
      // 若 access token 過期，嘗試透過 refresh token 更新
      const refreshRes = await fetch('/api/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshRes.ok) {
        // 重新呼叫保護 API
        const res2 = await fetch('/api/protected', { credentials: 'include' });
        if (res2.ok) {
          const result2 = await res2.json();
          setData(result2);
          return;
        }
      }
      // 若刷新失敗則導回登入頁面
      router.push('/login');
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4">
      <Navigation />
      <Slider />
      <h1 className="text-3xl font-bold mb-4">Protected Page</h1>
      <p className="text-gray-700 bg-yellow-600 mb-2">{data.message}</p>
      {data.user && (
        <p className="text-gray-700 bg-yellow-600">
          Welcome, <span className="font-semibold">{data.user}</span>
        </p>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

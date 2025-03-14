// 此頁面在載入時會呼叫 /api/protected 取得保護資料，若回應 401 則嘗試透過 /api/refresh 取得新 token；
'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import Navigation from '@/components/Navigation';
import Slider from '@/components/Slider';
import { User } from '@/drizzle/schema';

interface ProtectedData {
  message: string;
  user: User;
}

export default function ProtectedPage() {
  const [data, setData] = useState<ProtectedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchProtectedData = useCallback(async () => {
    try {
      const res = await fetch('/api/protected', {
        credentials: 'include',
      });

      if (res.ok) {
        const result = await res.json();
        setData(result);
        return;
      }

      if (res.status === 401) {
        // 嘗試更新 token
        const refreshRes = await fetch('/api/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (refreshRes.ok) {
          const res2 = await fetch('/api/protected', {
            credentials: 'include',
          });

          if (res2.ok) {
            const result2 = await res2.json();
            setData(result2);
            return;
          }
        }

        // 重新導向到登入頁面
        router.replace('/login');
      }
    } catch (error) {
      console.error('Protected data fetch error:', error);
      router.replace('/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProtectedData();
  }, [fetchProtectedData]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        router.replace('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
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
      <p className="text-gray-700 bg-yellow-600 mb-2">{data && data.message}</p>
      {data && (
        <p className="text-gray-700 bg-yellow-600">
          Welcome, <span className="font-semibold">{data.user.username}</span>{' '}
          <span className="font-semibold">{data.user.email}</span>
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

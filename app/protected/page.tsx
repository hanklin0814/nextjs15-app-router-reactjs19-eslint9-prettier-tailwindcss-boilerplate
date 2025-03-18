// 此頁面在載入時會呼叫 /api/protected 取得保護資料，若回應 401 則嘗試透過 /api/refresh 取得新 token；
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Navigation from '@/components/Navigation';
import Slider from '@/components/Slider';
import { User } from '@/drizzle/schema';
import { fetchProtectedData, logout } from '@/services/api';

export default function ProtectedPage() {
  const [protectedData, setProtectedDataData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchProtectedData();

      if (response.success && response.data) {
        setProtectedDataData(response.data);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout();

      if (response.success) {
        router.replace('/auth/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading || !protectedData) {
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
      <p className="text-gray-700 bg-yellow-600 mb-2">
        {protectedData && protectedData.id}
      </p>
      {protectedData && (
        <p className="text-gray-700 bg-yellow-600">
          Welcome,
          <span className="font-semibold">{protectedData.username}</span>{' '}
          <span className="font-semibold">{protectedData.email}</span>
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

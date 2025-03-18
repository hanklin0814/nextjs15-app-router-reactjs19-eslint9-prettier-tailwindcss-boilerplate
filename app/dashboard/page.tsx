'use client';

import { useEffect, useState } from 'react';

import Navigation from '@/components/Navigation';
import Slider from '@/components/Slider';
import { dashboard, imageLoadTest } from '@/services/api';
import type { PostResponse } from '@/types';

export default function DashboardPage() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [percentage, setPercentage] = useState(0);
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dashboard();

      if (response.success && response.data) {
        setPosts(response.data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await imageLoadTest(setPercentage);

      if (response.success && response.data) {
        // 將二進制數據轉換為 base64 圖片
        const blob = new Blob([response.data]);
        const imageUrl = URL.createObjectURL(blob);
        setImageData(imageUrl);
      }
    };

    fetchData();

    // 清理函數
    return () => {
      if (imageData) {
        URL.revokeObjectURL(imageData);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4">
      <Navigation />
      <Slider />
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-lg mb-4">client component 用 axios 拉取資料</p>
      <div className="w-full bg-gray-500 relative mb-5">
        <div className="relative z-10">圖片下載進度 {`${percentage}%`}</div>
        <div
          className={`absolute top-0 left-0 bg-red-500 opacity-50 h-full z-0 transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* 圖片顯示區域 */}
      {imageData && (
        <div className="mb-5">
          <img src={imageData} alt="Loaded image" className="w-full h-auto" />
        </div>
      )}
      <div className="space-y-4">
        {posts.map(
          (post: {
            body: string;
            id: number;
            title: string;
            userId: number;
          }) => (
            <div key={post.id} className="p-4 border rounded shadow-sm ">
              <h2 className="text-xl text-orange-400 font-semibold">
                {post.title}
              </h2>
              <p>{post.body}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

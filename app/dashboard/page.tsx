'use client';
import axios, { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';

import Navigation from '@/components/Navigation';
import Slider from '@/components/Slider';
import { API } from '@/constants';

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 呼叫 API 取得文章列表
    const fetchData = async () => {
      const response = await axios.get(API.POSTS);

      if (response.status === HttpStatusCode.Ok) {
        setPosts(response.data);
      }
    };

    fetchData();
  }, []);

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    axios.get(
      'https://fetch-progress.anthum.com/10kbps/images/sunrise-baseline.jpg',
      {
        onDownloadProgress: (e) => {
          if (!e.total) return;
          const p = Math.round((e.loaded * 100) / e.total);

          setPercentage(p);
        },
      }
    );
  }, []);

  return (
    <div className="p-4">
      <Navigation />
      <Slider />
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-lg mb-4">client component 用 axios 拉取資料</p>
      <div className="w-full bg-gray-500 relative">
        <div className="relative z-10">圖片下載進度 {`${percentage}%`}</div>
        <div
          className={`absolute top-0 left-0 bg-red-500 opacity-50 h-full z-0`}
          style={{ width: `${percentage}%` }}
        />
      </div>
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

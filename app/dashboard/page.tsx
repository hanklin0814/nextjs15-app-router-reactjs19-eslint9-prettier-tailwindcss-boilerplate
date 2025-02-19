'use client';
import axios, { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';

import CommonLayout from '@/components/CommonLayout';
import Navigation from '@/components/Navigation';
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

  return (
    <div className="p-4">
      <Navigation />
      <CommonLayout />
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-lg mb-4">client component 用 axios 拉取資料</p>
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

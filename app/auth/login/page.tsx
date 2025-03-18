'use client';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';

import { login } from '@/services/api';

export default function Login() {
  const [username, setUsername] = useState<string>('user');
  const [password, setPassword] = useState<string>('password');
  const [error, setError] = useState<string>('');
  const isSubmittingRef = useRef<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmittingRef.current) return; // 防止重複提交
    isSubmittingRef.current = true;
    setError('');

    try {
      const response = await login({ username, password });

      if (response.success) {
        // 使用 replace 而不是 push 來避免瀏覽歷史堆疊
        router.replace('/');
      } else {
        setError(response.message || '登入失敗');
      }
    } catch (error) {
      console.error(error);
      setError('登入時發生錯誤，請稍後再試');
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-500">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-black"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-black"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

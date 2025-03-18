'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import { handleError } from '@/lib/http/classes/AppError';
import { signup } from '@/services/api';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // 基本驗證
    if (formData.password !== formData.confirmPassword) {
      setError('密碼不匹配');
      return;
    }

    try {
      const response = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.success) {
        router.push('/auth/login?message=signup-success');
      } else {
        setError(response.message || '註冊失敗');
      }
    } catch (error) {
      // 使用統一的錯誤處理
      const errorResponse = handleError(error);
      setError(errorResponse.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-500">
          註冊帳號
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">使用者名稱</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">電子郵件</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">密碼</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-black"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">確認密碼</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-black"
              required
            />
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="text-sm">{error}</p>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            註冊
          </button>
          <p className="mt-4 text-center text-gray-600">
            已經有帳號？{' '}
            <Link
              href="/auth/login"
              className="text-blue-500 hover:text-blue-600"
            >
              登入
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

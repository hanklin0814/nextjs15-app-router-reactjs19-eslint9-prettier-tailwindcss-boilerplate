import { NextRequest, NextResponse } from 'next/server';

import { AppError } from '@/lib/http/classes/AppError';

export async function GET(request: NextRequest) {
  try {
    // 檢查請求方法
    if (request.method !== 'GET') {
      throw new AppError('HTTP', 'Method Not Allowed', 405);
    }

    const response = {
      success: true,
      message: 'Logout successful',
    };

    // 清除 cookies 時設定更完整的安全性選項
    const cookieOptions = {
      maxAge: 0,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // 在生產環境中使用 HTTPS
      sameSite: 'strict' as const,
      domain: process.env.COOKIE_DOMAIN || undefined, // 可設定 cookie domain
    };

    // 清除所有相關的認證 cookies
    const jsonResponse = NextResponse.json(response);
    jsonResponse.cookies.set('token', '', cookieOptions);
    jsonResponse.cookies.set('refreshToken', '', cookieOptions);
    jsonResponse.cookies.set('user', '', cookieOptions);

    return jsonResponse;
  } catch (error) {
    console.error('Logout error:', error);
    throw new AppError('UNKNOWN', 'Logout failed');
  }
}

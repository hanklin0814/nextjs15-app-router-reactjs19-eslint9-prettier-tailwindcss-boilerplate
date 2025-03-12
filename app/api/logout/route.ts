import { NextRequest, NextResponse } from 'next/server';

interface LogoutResponse {
  message: string;
  status?: string;
}

export async function POST(request: NextRequest) {
  try {
    // 檢查請求方法
    if (request.method !== 'POST') {
      return NextResponse.json(
        { message: 'Method Not Allowed' },
        { status: 405 }
      );
    }

    const response = NextResponse.json<LogoutResponse>({
      message: 'Logout successful',
      status: 'success',
    });

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
    response.cookies.set('token', '', cookieOptions);
    response.cookies.set('refreshToken', '', cookieOptions);
    response.cookies.set('user', '', cookieOptions);

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json<LogoutResponse>(
      { message: 'Logout failed', status: 'error' },
      { status: 500 }
    );
  }
}

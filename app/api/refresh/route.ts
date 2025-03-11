// 從 Cookie 中讀取 access token 並驗證。使用 GET 方法回傳受保護的資料。
// app/api/protected/route.ts
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: 'Refresh token missing' },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET as string
    ) as { username: string };
    // 產生新的 access token，有效 15 分鐘
    const newAccessToken = jwt.sign(
      { username: decoded.username },
      process.env.JWT_SECRET as string,
      { expiresIn: '15m' }
    );
    const response = NextResponse.json({ message: 'Token refreshed' });
    // 以 HttpOnly Cookie 更新 access token
    response.cookies.set('token', newAccessToken, {
      httpOnly: true,
      path: '/',
      maxAge: 900, // 15 分鐘
      sameSite: 'strict',
    });
    return response;
  } catch (err) {
    return NextResponse.json(
      { message: 'Invalid or expired refresh token' },
      { status: 401 }
    );
  }
}

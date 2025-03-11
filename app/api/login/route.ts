// app/api/login/route.ts
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  // 示範用：固定驗證，實際應查詢資料庫
  if (username === 'user' && password === 'password') {
    // 產生 JWT，設定 1 小時過期
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    // return NextResponse.json({ ok: true, token });

    const response = NextResponse.json({ message: 'Login successful' });
    // 設定 cookie：這裡我們設定 "token" cookie，HttpOnly 及其他屬性
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 3600, // 1 小時
      sameSite: 'strict',
    });
    return response;
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}

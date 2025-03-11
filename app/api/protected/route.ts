// 從 Cookie 中讀取 access token 並驗證。使用 GET 方法回傳受保護的資料。
// app/api/protected/route.ts
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // 取得名為 'token' 的 cookie 值
  const token = request.cookies.get('token')?.value;

  if (!token) {
    console.log('Token missing');
    return NextResponse.json({ message: 'Token missing' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      username: string;
    };
    return NextResponse.json({
      ok: true,
      message: 'Protected data from JWT',
      user: decoded.username,
    });
  } catch (err) {
    return NextResponse.json(
      { message: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}

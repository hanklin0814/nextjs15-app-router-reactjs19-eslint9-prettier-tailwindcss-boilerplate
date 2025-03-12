import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

// 定義介面
interface JwtPayload {
  username: string;
  exp?: number;
  iat?: number;
}

interface ProtectedResponse {
  message: string;
  user?: string;
  error?: string;
}

// JWT 驗證中間件
const verifyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ''
      ) as JwtPayload;
      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });
};

export async function GET(request: NextRequest) {
  try {
    // 檢查 JWT_SECRET 是否存在
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return NextResponse.json<ProtectedResponse>(
        {
          message: 'Server configuration error',
        },
        { status: 500 }
      );
    }

    // 檢查 token
    const token = request.cookies.get('token')?.value;
    if (!token) {
      console.log('Token missing in request');
      return NextResponse.json<ProtectedResponse>(
        {
          message: 'Authentication required',
        },
        { status: 401 }
      );
    }

    // 驗證 token
    const decoded = await verifyToken(token);

    // 檢查 token 是否過期
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return NextResponse.json<ProtectedResponse>(
        {
          message: 'Token has expired',
        },
        { status: 401 }
      );
    }

    // 回傳保護的資料
    return NextResponse.json<ProtectedResponse>({
      message: 'Successfully authenticated',
      user: decoded.username,
    });
  } catch (error) {
    console.error('Protected route error:', error);

    // 根據錯誤類型回傳適當的回應
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json<ProtectedResponse>(
        {
          message: 'Invalid token',
        },
        { status: 401 }
      );
    }

    return NextResponse.json<ProtectedResponse>(
      {
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

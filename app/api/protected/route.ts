import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schema';
import { AppError } from '@/lib/http/classes/AppError';
import { JwtPayload } from '@/types';

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
    // 檢查請求方法
    if (request.method !== 'GET') {
      throw new AppError('HTTP', 'Method Not Allowed', 405);
    }

    // 檢查 JWT_SECRET 是否存在
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error',
        },
        { status: 500 }
      );
    }

    // 檢查 token
    const token = request.cookies.get('token')?.value;
    if (!token) {
      console.log('Token missing in request');
      return NextResponse.json(
        {
          success: false,
          message: 'Authentication required',
        },
        { status: 401 }
      );
    }

    // 驗證 token
    const decoded = await verifyToken(token);

    // 檢查 token 是否過期
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token has expired',
        },
        { status: 401 }
      );
    }

    const findUser = await db
      .select()
      .from(users)
      .where(eq(users.username, decoded.username));

    // 回傳保護的資料
    return NextResponse.json({
      success: true,
      message: 'Successfully authenticated',
      data: {
        created_at: findUser[0].created_at,
        updated_at: findUser[0].updated_at,
        id: findUser[0].id,
        username: findUser[0].username,
        email: findUser[0].email,
      },
    });
  } catch (error) {
    console.error('Protected route error:', error);

    // 如果是已知的 AppError，直接回傳錯誤訊息
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          statusCode: error.statusCode,
        },
        { status: error.statusCode }
      );
    } else if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid token',
        },
        { status: 401 }
      );
    }

    // 未知錯誤則回傳 500
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}

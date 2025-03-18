import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schema';
import { AppError } from '@/lib/http/classes/AppError';
import type { LoginRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // 檢查請求方法
    if (request.method !== 'POST') {
      throw new AppError('HTTP', 'Method Not Allowed', 405);
    }

    const { username, password }: LoginRequest = await request.json();

    const findUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (findUser.length === 0) {
      throw AppError.fromApiError('帳號或密碼錯誤', 401);
    }

    const verifyPassword = await bcrypt.compare(password, findUser[0].password);

    if (!verifyPassword) {
      throw AppError.fromApiError('帳號或密碼錯誤', 401);
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    const response = {
      success: true,
      message: '登入成功',
      data: {
        created_at: findUser[0].created_at,
        updated_at: findUser[0].updated_at,
        id: findUser[0].id,
        username: findUser[0].username,
        email: findUser[0].email,
      },
    };

    // 設定 cookie："token" cookie，HttpOnly 及其他屬性
    const jsonResponse = NextResponse.json(response);
    jsonResponse.cookies.set('token', token, {
      httpOnly: true,
    });

    return jsonResponse;
  } catch (error) {
    console.error('Login error:', error);
    throw new AppError('UNKNOWN', '登入失敗');
  }
}

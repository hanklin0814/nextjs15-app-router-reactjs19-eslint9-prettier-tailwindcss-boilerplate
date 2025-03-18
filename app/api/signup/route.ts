import bcrypt from 'bcryptjs';
import { eq, or } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/drizzle/db';
import { users, UserWithPassword } from '@/drizzle/schema';
import { AppError } from '@/lib/http/classes/AppError';

export async function POST(request: NextRequest) {
  try {
    // 檢查請求方法
    if (request.method !== 'POST') {
      throw new AppError('HTTP', 'Method Not Allowed', 405);
    }

    const { username, email, password }: UserWithPassword =
      await request.json();

    if (!username || !email || !password) {
      throw AppError.fromApiError('所有欄位都是必填的', 400);
    }

    // 檢查使用者是否已存在
    const existingUser = await db
      .select()
      .from(users)
      .where(or(eq(users.username, username), eq(users.email, email)));

    if (existingUser.length > 0) {
      // 判斷是 username 還是 email 重複
      const isDuplicateUsername = existingUser.some(
        (user) => user.username === username
      );
      const isDuplicateEmail = existingUser.some(
        (user) => user.email === email
      );

      let errorMessage = '';
      if (isDuplicateUsername && isDuplicateEmail) {
        errorMessage = '使用者名稱和電子郵件皆已被使用';
      } else if (isDuplicateUsername) {
        errorMessage = '使用者名稱已被使用';
      } else {
        errorMessage = '電子郵件已被使用';
      }

      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
          statusCode: 409,
        },
        { status: 409 }
      );
    }

    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 創建新使用者
    const [newUser] = await db
      .insert(users)
      .values({
        username,
        email,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        username: users.username,
        email: users.email,
        created_at: users.created_at,
      });

    return NextResponse.json(
      {
        success: true,
        message: '註冊成功',
        data: {
          userId: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('註冊失敗:', error);
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
    }

    // 未知錯誤則回傳 500
    return NextResponse.json(
      {
        success: false,
        message: '註冊過程中發生錯誤',
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}

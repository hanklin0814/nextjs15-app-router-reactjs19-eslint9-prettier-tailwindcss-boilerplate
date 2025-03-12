import bcrypt from 'bcryptjs';
import { eq, or } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schema';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // 驗證輸入
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: '所有欄位都是必填的' },
        { status: 400 }
      );
    }

    // 檢查使用者是否已存在
    const existingUser = await db
      .select()
      .from(users)
      .where(or(eq(users.username, username), eq(users.email, email)));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: '使用者名稱或電子郵件已被使用' },
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
      { message: '註冊成功', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('註冊失敗:', error);

    return NextResponse.json({ error: '註冊過程中發生錯誤' }, { status: 500 });
  }
}

// app/api/login/route.ts
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schema';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const findUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (findUser.length === 0) {
    return NextResponse.json({ message: '帳號或密碼錯誤' }, { status: 401 });
  }

  const verifyPassword = await bcrypt.compare(password, findUser[0].password);

  if (verifyPassword) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    const response = NextResponse.json({ message: 'Login successful' });

    // 設定 cookie："token" cookie，HttpOnly 及其他屬性
    response.cookies.set('token', token, {
      httpOnly: true,
    });

    return response;
  }

  return NextResponse.json({ message: '帳號或密碼錯誤' }, { status: 401 });
}

// app/api/login/route.ts
import jwt from 'jsonwebtoken';
// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

type Data = {
  message: string;
};

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   // 設定 cookie 過期以清除 token
//   res.setHeader('Set-Cookie', [
//     `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`,
//     `refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`,
//   ]);

//   return res.status(200).json({ message: 'Logout successful' });
// }

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: 'Logout successful' });
  // 清除存放在 cookie 中的 token 與 refreshToken
  response.cookies.set('token', '', {
    maxAge: 0,
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
  });
  response.cookies.set('refreshToken', '', {
    maxAge: 0,
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
  });
  return response;
}

import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getJwtSecret } from '@/lib/getJwtSecret';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { password } = await request.json();

  // 1. パスワードのチェック
if (password === process.env.ADMIN_PASSWORD) {
    const secret = await getJwtSecret();
    const jwt = await new SignJWT({ isAdmin: true })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret);
    
    // 👇 cookies()は非同期なので、(await cookies()) とする
    (await cookies()).set('admin-token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { password } = await request.json();
  
  // ▼▼▼ デバッグ用のログを追加 ▼▼▼
  console.log("ブラウザから受信したパスワード:", password);
  console.log("サーバーが正解だと思っているパスワード:", process.env.ADMIN_PASSWORD);
  // ▲▲▲ ここまで ▲▲▲

  if (password === process.env.ADMIN_PASSWORD) {
    const secret = new TextEncoder().encode(process.env.SECRET_COOKIE_PASSWORD!);
    const jwt = await new SignJWT({ isAdmin: true })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(secret);

    (await cookies()).set('admin-token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
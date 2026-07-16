import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getJwtSecret } from '@/lib/getJwtSecret';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === process.env.ADMIN_PASSWORD) {
      const secret = await getJwtSecret(); // 👈 秘密鍵を取得
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

  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
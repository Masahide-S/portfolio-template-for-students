import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// JWTの秘密鍵を準備
const secret = new TextEncoder().encode(process.env.SECRET_COOKIE_PASSWORD!);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin-token')?.value;
  let isLoggedIn = false;

  // 1. Cookieにトークンが存在し、かつ有効か検証
  if (token) {
    try {
      await jwtVerify(token, secret);
      isLoggedIn = true;
    } catch (e) {
      console.log("JWT verification failed:", e);
      isLoggedIn = false;
    }
  }

  // 2. ログイン状態に基づいてリダイレクト
  if (pathname.startsWith('/admin/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if ((pathname.startsWith('/admin/login') || pathname === '/admin') && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SECRET_COOKIE_PASSWORD!);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin-token')?.value;
  let isLoggedIn = false;
  
  const loginUrl = new URL('/admin/login', request.url);
  const dashboardUrl = new URL('/admin/dashboard', request.url);

  if (token) {
    try {
      // JWTが有効か検証
      await jwtVerify(token, secret);
      isLoggedIn = true;
    } catch (e) {
      // ▼▼▼ ここが重要な追加部分 ▼▼▼
      // 検証に失敗した場合（トークンが無効な場合）
      console.error("Invalid token found, clearing cookie and redirecting to login.");
      isLoggedIn = false;
      
      // 無効なCookieを削除しつつ、ログインページにリダイレクトするレスポンスを作成
      const response = NextResponse.redirect(loginUrl);
      response.cookies.set('admin-token', '', { expires: new Date(0) });
      return response;
      // ▲▲▲ ここまで ▲▲▲
    }
  }

  // ダッシュボードを見ようとしたが、ログインしていない場合 → ログインページへ
  if (pathname.startsWith('/admin/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(loginUrl);
  }

  // ログインページを見ようとしたが、既にログインしている場合 → ダッシュボードへ
  if (pathname.startsWith('/admin/login') && isLoggedIn) {
    return NextResponse.redirect(dashboardUrl);
  }
  
  // /admin に直接アクセスした場合
  if (pathname === '/admin' && isLoggedIn) {
     return NextResponse.redirect(dashboardUrl);
  }
  if (pathname === '/admin' && !isLoggedIn) {
     return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
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
      await jwtVerify(token, secret);
      isLoggedIn = true;
    } catch (e) {
      // ▼▼▼ ここが重要 ▼▼▼
      // トークンが無効なら、Cookieを削除しつつログインページへ飛ばすレスポンスを作成
      const response = NextResponse.redirect(loginUrl);
      response.cookies.set('admin-token', '', { expires: new Date(0), path: '/' });
      return response;
    }
  }

  // ダッシュボードを見ようとしたが、ログインしていない場合
  if (pathname.startsWith('/admin/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(loginUrl);
  }

  // ログインページを見ようとしたが、既にログインしている場合
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

  // 上記のどれにも当てはまらない場合は、そのままアクセスを許可
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
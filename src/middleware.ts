import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';
import { getJwtSecret } from '@/lib/getJwtSecret';

const secret = await getJwtSecret();

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin-token')?.value;
  let isLoggedIn = false;
  
  const loginUrl = new URL('/admin/login', request.url);
  const dashboardUrl = new URL('/admin/dashboard', request.url);

  if (token && secret) {
    try {
      await jwtVerify(token, secret);
      isLoggedIn = true;
    } catch (e) {
      console.error("Middleware: Invalid token found, clearing cookie.");
      isLoggedIn = false;
      
      // 無効なCookieを見つけたら、削除しつつログインページへリダイレクト
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin-token');
      return response;
    }
  }

  // ログインが必要なページに、未ログインでアクセスした場合
  if (pathname.startsWith('/admin/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(loginUrl);
  }

  // ログイン済みなのに、ログインページなどにアクセスした場合
  if ((pathname.startsWith('/admin/login') || pathname === '/admin') && isLoggedIn) {
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
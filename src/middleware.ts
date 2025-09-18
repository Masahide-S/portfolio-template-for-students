import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getJwtSecret } from '@/lib/getJwtSecret';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin-token')?.value;
  
  const loginUrl = new URL('/admin/login', request.url);
  const dashboardUrl = new URL('/admin/dashboard', request.url);

  // ▼▼▼ トークンが存在しない場合は、認証チェックをスキップ ▼▼▼
  if (!token) {
    // ダッシュボードを見ようとした場合のみ、ログインページへリダイレクト
    if (pathname.startsWith('/admin/dashboard')) {
      return NextResponse.redirect(loginUrl);
    }
    // それ以外（/admin/loginなど）は、そのままアクセスを許可
    return NextResponse.next();
  }
  // ▲▲▲ ここまで ▲▲▲

  // --- トークンが存在する場合のみ、以下の認証チェックを実行 ---
  try {
    const secret = await getJwtSecret();
    await jwtVerify(token, secret);
    
    // 認証成功：ログインページを見ようとしたらダッシュボードへ
    if (pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(dashboardUrl);
    }
  } catch (e) {
    // 認証失敗：無効なCookieを削除し、ログインページへ
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('admin-token');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
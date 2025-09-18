import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  // 'admin-token'という名前のCookieを削除
  (await cookies()).set('admin-token', '', { expires: new Date(0) });
  return NextResponse.json({ success: true });
}
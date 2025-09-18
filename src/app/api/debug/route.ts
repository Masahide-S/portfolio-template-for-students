import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  return NextResponse.json({
    message: "サーバー上の環境変数の値を確認します。",
    adminPasswordValue: adminPassword,
    isPasswordSet: adminPassword !== undefined && adminPassword !== null && adminPassword !== "",
  });
}
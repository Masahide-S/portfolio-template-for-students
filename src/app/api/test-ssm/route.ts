import { NextResponse } from 'next/server';
import { getJwtSecret } from '@/lib/getJwtSecret';

export const dynamic = 'force-dynamic';

export async function GET() {
  console.warn("Attempting to get JWT secret from SSM...");

  try {
    const secret = await getJwtSecret();

    // 成功した場合
    console.warn("Successfully retrieved JWT secret from SSM.");
    return NextResponse.json({
      success: true,
      message: "SSMからの秘密鍵の取得に成功しました。",
      secretLength: secret.length, // 鍵の長さを確認
    });

  } catch (error) {
    // 失敗した場合
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to get JWT secret from SSM:", error);
    return NextResponse.json(
      {
        success: false,
        message: "SSMからの秘密鍵の取得に失敗しました。",
        error: errorMessage, // エラーメッセージを返す
      },
      { status: 500 }
    );
  }
}
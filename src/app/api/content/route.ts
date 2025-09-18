import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getSiteData } from '@/lib/dynamodb';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

export const dynamic = 'force-dynamic';

// JWTの秘密鍵を準備
const secret = new TextEncoder().encode(process.env.SECRET_COOKIE_PASSWORD!);

// --- 認証チェックを行う共通関数 ---
async function verifyAuth(): Promise<boolean> {
  const token = (await cookies()).get('admin-token')?.value;

  if (!token) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch (e) {
    return false;
  }
}


// GETリクエスト：現在のコンテンツを返す
export async function GET() {
  const isAuthed = await verifyAuth();
  if (!isAuthed) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const data = await getSiteData();
  return NextResponse.json(data);
}

// POSTリクエスト：受け取ったデータでデータベースを更新する
export async function POST(request: Request) {
  const isAuthed = await verifyAuth();
  if (!isAuthed) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const newContent = await request.json();
    
    const client = new DynamoDBClient({ region: process.env.APP_AWS_REGION });
    const docClient = DynamoDBDocumentClient.from(client);
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: newContent,
    });
    await docClient.send(command);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Content API POST error:", error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
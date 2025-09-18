import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { getSiteData } from '@/lib/dynamodb';

// DynamoDBClientは'@aws-sdk/client-dynamodb'からインポート
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// PutCommandとDynamoDBDocumentClientは'@aws-sdk/lib-dynamodb'からインポート
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

export const dynamic = 'force-dynamic';

const secret = new TextEncoder().encode(process.env.SECRET_COOKIE_PASSWORD!);

// 👇 requestを引数に取るように変更
async function verifyAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin-token')?.value;

  if (!token) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch (e) {
    return false;
  }
}

// 👇 requestを引数に取るように変更
export async function GET(request: NextRequest) {
  const isAuthed = await verifyAuth(request);
  if (!isAuthed) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  const data = await getSiteData();
  return NextResponse.json(data);
}

// 👇 requestを引数に取るように変更
export async function POST(request: NextRequest) {
  const isAuthed = await verifyAuth(request);
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
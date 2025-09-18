"use server";

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getSiteData } from '@/lib/dynamodb';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const secret = new TextEncoder().encode(process.env.SECRET_COOKIE_PASSWORD!);

// 認証チェック
async function verifyAuth() {
  // 👇 (await cookies()) のように修正
  const token = (await cookies()).get('admin-token')?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch (e) {
    return false;
  }
}

// データ取得アクション
export async function getContent() {
  const isAuthed = await verifyAuth();
  if (!isAuthed) return null;
  return await getSiteData();
}

// データ保存アクション
export async function saveContent(newContent: any) {
  const isAuthed = await verifyAuth();
  if (!isAuthed) throw new Error("Unauthorized");
  try {
    const client = new DynamoDBClient({ region: process.env.APP_AWS_REGION });
    const docClient = DynamoDBDocumentClient.from(client);
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: newContent,
    });
    await docClient.send(command);
    return { success: true };
  } catch (error) {
    console.error("Save content failed:", error);
    return { success: false, message: "Failed to save content." };
  }
}
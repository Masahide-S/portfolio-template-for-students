"use server";

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getSiteData } from '@/lib/dynamodb';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { getJwtSecret } from '@/lib/getJwtSecret';

const secret = await getJwtSecret();

async function verifyAuth() {
  const token = (await cookies()).get('admin-token')?.value;
  if (!token || !secret) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch (_error) {
    return false;
  }
}

export async function getContent() {
  const isAuthed = await verifyAuth();
  if (!isAuthed) {
    console.error("getContent: Unauthorized access attempt.");
    return null;
  }
  return await getSiteData();
}

export async function saveContent(newContent: Partial<Record<string, unknown>>) {
  const isAuthed = await verifyAuth();
  if (!isAuthed) {
    console.error("saveContent: Unauthorized access attempt.");
    throw new Error("Unauthorized");
  }
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
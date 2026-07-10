import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import type { SiteData } from "@/types";

const client = new DynamoDBClient({ region: process.env.APP_AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

export type { SiteData };

export class DatabaseError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "DatabaseError";
  }
}

export async function getSiteData(): Promise<SiteData | null> {
  const command = new GetCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: {
      id: "profile",
    },
  });

  try {
    const { Item } = await docClient.send(command);
    return Item as SiteData | null;
  } catch (error) {
    console.error("DynamoDBからのデータ取得に失敗しました:", error);
    throw new DatabaseError("Failed to fetch site data from DynamoDB", error);
  }
}

export async function saveSiteData(data: Partial<SiteData>): Promise<void> {
  const command = new PutCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: {
      id: "profile",
      ...data,
    },
  });

  try {
    await docClient.send(command);
  } catch (error) {
    console.error("DynamoDBへのデータ保存に失敗しました:", error);
    throw new DatabaseError("Failed to save site data to DynamoDB", error);
  }
}
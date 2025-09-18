import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.APP_AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

// サイト全体のデータ構造を定義する型
export type SiteData = {
  id: string;
  profile?: any;
  contact?: any;
  header?: any;
  skills?: any;
  certifications?: any;
  timeline?: any;
  awards?: any;
  research?: any;
  products?: any;
};

// 関数名が'getSiteData'になっており、'export'されていることを確認
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
    return null;
  }
}
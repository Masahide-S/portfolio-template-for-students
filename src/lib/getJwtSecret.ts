import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

let cachedSecret: Uint8Array | null = null;

export async function getJwtSecret(): Promise<Uint8Array> {
  if (cachedSecret) {
    return cachedSecret;
  }

  const client = new SSMClient({ region: process.env.APP_AWS_REGION });
  const command = new GetParameterCommand({
    Name: '/portfolio/jwt_key',
    WithDecryption: true,
  });

  try {
    const response = await client.send(command);
    if (!response.Parameter?.Value) {
      throw new Error("SSMからJWTの秘密鍵を取得できませんでした。");
    }
    const secretKey = response.Parameter.Value;
    cachedSecret = new TextEncoder().encode(secretKey);
    return cachedSecret;
  } catch (error) {
    console.error("SSM Parameter Storeからの秘密鍵の読み込みに失敗しました:", error);
    throw error;
  }
}
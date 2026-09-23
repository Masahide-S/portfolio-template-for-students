/**
 * 環境変数の検証と取得
 * アプリケーション起動時に必須の環境変数が設定されているか確認
 */

export class EnvValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnvValidationError";
  }
}

/**
 * 必須環境変数のリスト
 */
const REQUIRED_ENV_VARS = [
  "APP_AWS_REGION",
  "DYNAMODB_TABLE_NAME",
  "JWT_SECRET_NAME",
] as const;

/**
 * オプショナル環境変数のリスト（警告のみ）
 */
const OPTIONAL_ENV_VARS = [
  "NEXT_PUBLIC_SITE_URL",
] as const;

/**
 * 環境変数の型定義
 */
export interface EnvVars {
  APP_AWS_REGION: string;
  DYNAMODB_TABLE_NAME: string;
  JWT_SECRET_NAME: string;
  NEXT_PUBLIC_SITE_URL?: string;
}

/**
 * 環境変数を検証し、必須変数が存在することを確認
 * @throws {EnvValidationError} 必須環境変数が不足している場合
 */
export function validateEnv(): void {
  const missingVars: string[] = [];

  for (const varName of REQUIRED_ENV_VARS) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    throw new EnvValidationError(
      `Missing required environment variables: ${missingVars.join(", ")}\n` +
      `Please set these variables in your .env.local file or deployment environment.`
    );
  }

  // オプショナル変数の警告
  for (const varName of OPTIONAL_ENV_VARS) {
    if (!process.env[varName]) {
      console.warn(`Warning: Optional environment variable "${varName}" is not set.`);
    }
  }

  console.warn("✓ All required environment variables are set");
}

/**
 * 安全に環境変数を取得する
 * @param key - 環境変数のキー
 * @param defaultValue - デフォルト値（オプショナル変数用）
 * @returns 環境変数の値
 * @throws {EnvValidationError} 必須環境変数が存在しない場合
 */
export function getEnv(key: keyof EnvVars, defaultValue?: string): string {
  const value = process.env[key];

  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new EnvValidationError(
      `Environment variable "${key}" is required but not set.`
    );
  }

  return value;
}

/**
 * 検証済みの環境変数を取得する
 * 起動時にvalidateEnv()を呼び出した後に使用することを推奨
 */
export function getValidatedEnv(): EnvVars {
  return {
    APP_AWS_REGION: getEnv("APP_AWS_REGION"),
    DYNAMODB_TABLE_NAME: getEnv("DYNAMODB_TABLE_NAME"),
    JWT_SECRET_NAME: getEnv("JWT_SECRET_NAME"),
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  };
}

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { siteConfig } from "../src/data/config";

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// データベース接続
const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

async function migrate() {
  console.log("最終確定版の移行スクリプトを開始します...");

  // --- データベース保存用にデータを「掃除（サニタイズ）」する ---

  // 1. プロフィール情報からDateオブジェクトを文字列に変換
  const cleanProfile = {
    ...siteConfig.profile,
    birthDate: siteConfig.profile.birthDate.toISOString().split('T')[0],
  };

  // 2. スキル情報からアイコン(プログラムコード)を削除
  const cleanSkills = {
    frontend: siteConfig.skills.frontend.map(({ name, icon }) => ({ name, iconName: icon.name })),
    backend: siteConfig.skills.backend.map(({ name, icon }) => ({ name, iconName: icon.name })),
    others: siteConfig.skills.others.map(({ name, icon }) => ({ name, iconName: icon.name })),
  };

  // 3. 資格情報からアイコン(プログラムコード)を削除
  const cleanCertifications = {
    items: siteConfig.certifications.items.map(({ name, issuer, date, icon }) => ({
      name,
      issuer,
      date,
      iconName: icon.name, // icon.name を追加
    })),
  };
  // --- 保存する全データを一つのオブジェクトにまとめる ---
  const allDataForDB = {
    id: "profile", // このIDでデータを上書きする
    profile: cleanProfile,
    contact: siteConfig.contact,
    header: siteConfig.header,
    skills: cleanSkills,
    certifications: cleanCertifications,
    timeline: siteConfig.timeline.items, // .items を追加する
    awards: siteConfig.awards.items,     // .items を追加する
    products: siteConfig.products.items, // .items を追加する
    research: siteConfig.research.items,   // .items を追加する
    // 注意: tagStylesはアイコン情報を含む表示用のコードなので、データベースには保存しません
  };

  // --- データベースに書き込むコマンド ---
  const command = new PutCommand({
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: allDataForDB,
  });

  try {
    await docClient.send(command);
    console.log("✅ 全データの移行と上書きが正常に完了しました！");
    console.log("DynamoDBのコンソールでデータを確認してください。");
  } catch (error) {
    console.error("❌ データ移行中にエラーが発生しました:", error);
  }
}

migrate();
import type { Metadata } from "next";
import "./globals.css";

/**
 * サイトのメタデータ (SEOやSNS共有時に使用される情報)
 */
export const metadata: Metadata = {
  title: "[あなたの名前] | Portfolio",
  description: "[あなたの名前]のポートフォリオサイトです。",
};

/**
 * 全てのページに適用されるルートレイアウトコンポーネント
 * @param {object} props - プロパティ
 * @param {React.ReactNode} props.children - このレイアウト内に表示される子要素 (各ページコンポーネント)
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // サイト全体の基本設定 (言語、スクロール挙動)
    <html lang="ja" className="scroll-smooth">
      {/* サイト全体の基本スタイル (背景色、文字色) */}
      <body className="bg-base text-text-main">
        {/* page.tsx などの各ページの内容がここに挿入される */}
        {children}
      </body>
    </html>
  );
}
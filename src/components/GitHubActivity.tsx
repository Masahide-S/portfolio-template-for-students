import React from 'react';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import type { Contact } from '@/types';

const GitHubActivity: React.FC<{ contact: Contact }> = ({ contact }) => {
  const GITHUB_ID = contact.github || 'Masahide-S';

  // Stats Cardのtokyonightテーマに合わせた色設定
  const statsTheme = "tokyonight";
  const bgColor = "1A202C"; // カードの背景色
  const titleColor = "71a6f8"; // タイトルの色
  const iconColor = "79E6F3"; // アイコンの色
  const textColor = "98a5c3"; // テキストの色
  const chartColor = "79E6F3"; // グラフの色

  return (
    // 👇 背景を白ではない方(surface)に設定
    <div id="github-activity" className="py-10 w-full">
      <h3 className="subsection-title">GitHub Activity</h3>
      <div className="text-center">
        <p className="max-w-xl mx-auto text-text-sub mb-10">
          日々のコントリビューションや統計情報を確認できます。
        </p>
        
        {/* 1. Contribution Graph */}
        {/* 👇 グラフを囲むdivにスタイルを追加してカード風に */}
        <div className="my-8 max-w-3xl mx-auto rounded-lg overflow-hidden shadow-xl bg-[#1A202C] p-4 md:p-6">
          <Image 
            // 👇 ghchartの色をStats Cardのテーマに合わせる
            // 形式: https://ghchart.rshah.org/グラフの色/ユーザー名
            src={`https://ghchart.rshah.org/${chartColor}/${GITHUB_ID}`}
            alt="GitHub Contribution Graph"
            width={828}
            height={128}
            className="mx-auto w-full h-auto"
          />
        </div>

        {/* 2. GitHub Stats Card */}
        <div className="my-8 flex justify-center">
          <Image 
            // 👇 テーマをtokyonightに統一し、詳細な色設定を追加
            src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_ID}&show_icons=true&theme=${statsTheme}&hide_border=true&bg_color=${bgColor}&text_color=${textColor}&icon_color=${iconColor}&title_color=${titleColor}`}
            alt="GitHub Stats"
            width={495}
            height={195}
            className="rounded-lg shadow-xl"
          />
        </div>

        {/* 3. GitHubへの誘導ボタン */}
        <a 
          href={`https://github.com/${GITHUB_ID}`}
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-3 px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300 w-max mx-auto"
        >
          <FaGithub className="text-2xl "/>
          <span>GitHubで詳細を見る</span>
        </a>
      </div>
    </div>
  );
};

export default GitHubActivity;

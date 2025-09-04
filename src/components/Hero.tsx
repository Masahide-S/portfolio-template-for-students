// "use client" 指示文: このコンポーネントがブラウザ側で動作するクライアントコンポーネントであることを示す
// 日付に基づいて年齢などを動的に計算するために必要
"use client";

import React from 'react';
import { siteConfig } from '@/data/config';
import { FaGithub, FaEnvelope } from 'react-icons/fa6';
import Image from 'next/image';
/**
 * ページの最上部に表示されるメインビジュアルとプロフィールセクション
 */
const Hero: React.FC = () => {
  // 設定ファイルから基本情報を取得
  const { name, catchphrase, birthDate, university, profileImage, mainVisual, aboutMe } = siteConfig.profile;
  const { email, githubId, xId } = siteConfig.contact;

  // 1. 現在の年齢を計算
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--; // まだ今年の誕生日が来ていなければ1歳引く
  }

  // 2. 現在の学年または卒業ステータスを計算 (日本の4月始まりの学年制度を考慮)
  let grade = today.getFullYear() - university.entranceYear + 1;
  if (today.getMonth() < 3) { // 1月, 2月, 3月は年度が変わる前なので学年を-1
    grade--;
  }

  let affiliationText = "";
  if (grade > 4) {
    affiliationText = `${university.name} ${university.faculty} 卒業`;
  } else if (grade > 0) {
    affiliationText = `${university.name} ${university.faculty} ${grade}年`;
  } else {
    affiliationText = "入学前";
  }

  return (
    <section id="about">
      {/* メインビジュアル */}
      <div 
        className="w-full h-[40vh] md:h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url('${mainVisual}')` }}
      >
      </div>
      {/* プロフィールコンテンツ */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary after:rounded-full">
          Profile
        </h2>
        {/* PC表示では横並び (md:flex-row)、スマホ表示では縦並び (flex-col) になるレイアウト */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="flex-shrink-0">
            <Image 
              src={siteConfig.profile.profileImage}
              alt="プロフィール画像"
              width={240} // 幅を指定
              height={240} // 高さを指定
              className="w-48 h-48 md:w-60 md:h-60 rounded-full shadow-lg border-4 border-surface"
              priority // 優先的に読み込む画像に指定
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-text-main">{name}</h1>
            <p className="text-lg text-primary font-semibold mt-2">{catchphrase}</p>
            <div className="flex justify-center md:justify-start gap-6 mt-6 text-text-sub">
              <div><span className="font-bold text-text-main">Age: </span>{age}</div>
              <div><span className="font-bold text-text-main">Affiliation: </span>{affiliationText}</div>
            </div>
            <p className="max-w-xl mt-6 leading-relaxed text-text-sub whitespace-pre-line">{aboutMe}</p>
            <div className="flex justify-center md:justify-start gap-4 mt-6">
              <a href={`https://github.com/${githubId}`} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-2xl text-text-sub hover:text-primary transition-colors"><FaGithub /></a>
              <a href={`mailto:${email}`} aria-label="Email" className="text-2xl text-text-sub hover:text-primary transition-colors"><FaEnvelope /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
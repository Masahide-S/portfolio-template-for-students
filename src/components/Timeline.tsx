// "use client" 指示文: ユーザーの操作（フィルタリング、ソート）に応じて表示が変わるためクライアントコンポーネントに設定
"use client"; 

import React, { useState, useMemo } from 'react';
import { siteConfig } from '@/data/config';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

/**
 * 経歴を時系列で表示するタイムラインセクション
 * タグによる絞り込みと、日付による並び替え機能を持つ
 */
const Timeline: React.FC = () => {
  // --- 設定ファイルからデータを取得 ---
  const { items: historyItems } = siteConfig.timeline;
  const { university } = siteConfig.profile;
  const { tagStyles } = siteConfig;

  // --- 現在の学年を計算 ---
  const today = new Date();
  let currentGrade = today.getFullYear() - university.entranceYear + 1;
  if (today.getMonth() < 3) {
    currentGrade--;
  }

  /**
   * イベントの日付から、その時点での学年ステータスを計算する関数
   * @param {string} eventDate - イベントの日付 ('YYYY年M月'形式)
   * @returns {string} - 学年ステータス ('入学前', '大学X年生', '卒業後', '大学X年生(現在)')
   */
  const getAcademicStatus = (eventDate: string) => {
    const parts = eventDate.replace('年', '-').replace('月', '').split('-');
    const eventYear = parseInt(parts[0]);
    const eventMonth = parseInt(parts[1]);
    let eventGrade = eventYear - university.entranceYear + 1;
    if (eventMonth < 4) {
      eventGrade--;
    }
    if (eventGrade < 1) {
      return "入学前";
    } else if (eventGrade > 4) {
      return "卒業後";
    } else {
      if (eventGrade === currentGrade) {
        return `大学${eventGrade}年生（現在）`;
      }
      return `大学${eventGrade}年生`;
    }
  };

  // --- インタラクティブ機能のための状態管理 (React Hooks) ---

  // 選択されているフィルタータグを管理するための状態 (初期値は null = 全て表示)
  const [activeTag, setActiveTag] = useState<string | null>(null);
  // 現在の並び順を管理するための状態 (初期値は 'desc' = 新しい順)
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // --- 表示用データの計算 ---

  // データからユニークなタグのリストを生成
  const allTags = [...new Set(historyItems.flatMap(item => item.tags))];
  // useMemo: activeTagかsortOrderが変わった時だけ、フィルタリングとソートの再計算を行うパフォーマンス最適化のフック
  const sortedAndFilteredItems = useMemo(() => {
    // 1. フィルタリング処理
    const filtered = activeTag
      ? historyItems.filter(item => item.tags.includes(activeTag))
      // activeTagがなければ、全アイテムを対象にする
      : historyItems;
    // 2. ソート処理
    // 元の配列を壊さないようにコピー([...filtered])してからソートする
    return [...filtered].sort((a, b) => {
      // 'YYYY年M月' 形式の文字列をパースしてDateオブジェクトに変換
      const partsA = a.date.replace('年', '-').replace('月', '').split('-');
      const dateA = new Date(parseInt(partsA[0]), parseInt(partsA[1]) - 1, 1);
      const partsB = b.date.replace('年', '-').replace('月', '').split('-');
      const dateB = new Date(parseInt(partsB[0]), parseInt(partsB[1]) - 1, 1);
      
      // 'desc' (新しい順) ならB - A, 'asc' (古い順) なら A - B で比較
      if (sortOrder === 'desc') {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });
  }, [activeTag, sortOrder]); // activeTagかsortOrderが変更されたら再実行

  return (
    <section id="timeline" className="py-20 bg-base border-t-2 border-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary after:rounded-full">
          Timeline
        </h2>
        
        {/* フィルターとソートのUI */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${!activeTag ? 'bg-primary text-white' : 'bg-surface text-text-sub hover:bg-surface/80'}`}
            >
              すべて
            </button>
            {allTags.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag)} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${activeTag === tag ? `${tagStyles[tag]?.color || ''}` : 'bg-surface text-text-sub hover:bg-surface/80'}`}>
                {tag}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 p-1 bg-surface rounded-full">
            <button onClick={() => setSortOrder('desc')} className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-sm transition-colors ${sortOrder === 'desc' ? 'bg-primary text-white shadow' : 'text-text-sub'}`}>
              <FaArrowDown /> 新しい順
            </button>
            <button onClick={() => setSortOrder('asc')} className={`px-3 py-1 flex items-center gap-1.5 rounded-full text-sm transition-colors ${sortOrder === 'asc' ? 'bg-primary text-white shadow' : 'text-text-sub'}`}>
              <FaArrowUp /> 古い順
            </button>
          </div>
        </div>
        {/* 縦スクロールコンテナ */}
        <div className="h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-surface">
          {/* 縦のライン */}
          <div className="relative border-l-2 border-primary/50 ml-6 md:ml-auto md:mr-auto max-w-2xl">
            {/* 計算済みの sortedAndFilteredItems を元にリストを表示 */}
            {sortedAndFilteredItems.map((item, index) => (
              <div key={index} className="mb-12 pl-12 relative">
                <div className="absolute -left-2.5 top-1 w-5 h-5 bg-primary rounded-full border-4 border-surface"></div>
                <div className="p-6 bg-surface rounded-lg shadow-md">
                  <span className="text-sm text-text-sub font-semibold">
                    {item.date}
                    <span className="ml-2 text-primary/80">
                      （{getAcademicStatus(item.date)}）
                    </span>
                  </span>
                  <h3 className="text-xl font-bold my-2 text-text-main">{item.title}</h3>
                  <div className="flex flex-wrap gap-2 my-3">
                    {item.tags.map(tagName => {
                      const style = tagStyles[tagName];
                      if (!style) return null;
                      return (
                        <span key={tagName} className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${style.color}`}>
                          {React.createElement(style.icon, { className: 'w-3 h-3' })}
                          {tagName}
                        </span>
                      );
                    })}
                  </div>
                  <p className="text-text-sub leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
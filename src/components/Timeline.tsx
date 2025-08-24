// "use client" 指示文: ユーザーの操作（フィルタリング、ソート）に応じて表示が変わるためクライアントコンポーネントに設定
"use client"; 

import React, { useState, useMemo } from 'react';
import { siteConfig } from '@/data/config';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import TimelineItem from './TimelineItem'; // 各タイムライン項目を表示する子コンポーネント

/**
 * 経歴を時系列で表示するセクションコンポーネント
 * タグによる絞り込みと、日付による並び替え機能を持つ
 */
const Timeline: React.FC = () => {
  // 設定ファイルから必要なデータを分割代入で取得
  const { items: historyItems } = siteConfig.timeline;
  const { university } = siteConfig.profile;
  const { tagStyles } = siteConfig;
  
  // --- 動的計算ロジック ---

  // 現在の日付を基準に、現在の学年を計算
  const today = new Date();
  let currentGrade = today.getFullYear() - university.entranceYear + 1;
  if (today.getMonth() < 3) { // 1月, 2月, 3月は年度が変わる前なので学年を-1
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
    if (eventMonth < 4) { // 日本の4月始まりの学年制度を考慮
      eventGrade--;
    }
    if (eventGrade < 1) {
      return "入学前";
    } else if (eventGrade > 4) {
      return "卒業後";
    } else {
      // イベントの学年と現在の学年が一致する場合に「(現在)」を追記
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

  // データからユニークなタグのリストを生成（フィルターボタンの表示に使用）
  const allTags = [...new Set(historyItems.flatMap(item => item.tags))];
  
  // useMemo: activeTagかsortOrderが変わった時だけ、フィルタリングとソートの再計算を行うパフォーマンス最適化のフック
  const sortedAndFilteredItems = useMemo(() => {
    // 1. フィルタリング処理
    const filtered = activeTag
      ? historyItems.filter(item => item.tags.includes(activeTag))
      : historyItems; // activeTagがなければ、全アイテムを対象にする

    // 2. ソート処理
    // 元の配列を壊さないようにコピー([...filtered])してからソートする
    return [...filtered].sort((a, b) => {
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
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main relative pb-4 after:content[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary after:rounded-full">
          Timeline
        </h2>
        
        {/* フィルターとソートのUIコントロールパネル */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          {/* フィルタリングボタン */}
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
          {/* ソートボタン */}
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
              <TimelineItem 
                key={index} 
                item={item} 
                getAcademicStatus={getAcademicStatus} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
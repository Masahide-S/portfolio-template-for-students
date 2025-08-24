"use client";

import React, { useState, useRef, useEffect } from 'react';
import { siteConfig } from '@/data/config';

// このコンポーネントが受け取るデータの型を定義
type HistoryItem = typeof siteConfig.timeline.items[0];
interface TimelineItemProps {
  item: HistoryItem;
  getAcademicStatus: (date: string) => string;
}

/**
 * タイムラインの単一項目を表示するコンポーネント
 * 長文の自動折りたたみ、展開機能を担当する
 */
const TimelineItem: React.FC<TimelineItemProps> = ({ item, getAcademicStatus }) => {
  // 項目の展開状態を管理するための状態 (true = 開いている, false = 閉じている)
  const [isExpanded, setIsExpanded] = useState(false);
  // テキストが省略可能かどうか（一定以上の長さがあるか）を管理する状態
  const [isCollapsible, setIsCollapsible] = useState(false);
  
  // <p>要素への参照を作成
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // コンポーネントが表示された後、テキストの高さをチェックして「もっと見る」ボタンの表示を判断
  useEffect(() => {
    if (descriptionRef.current) {
      // scrollHeight (内容全体の高さ) が clientHeight (表示されている部分の高さ) より大きいかチェック
      const isOverflowing = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
      setIsCollapsible(isOverflowing);
    }
  }, [item.description]);


  return (
    <div className="mb-12 pl-12 relative">
      <div className="absolute -left-2.5 top-1 w-5 h-5 bg-primary rounded-full border-4 border-surface"></div>
      <div className="p-6 bg-surface rounded-lg shadow-md">
        <span className="text-sm text-text-sub font-semibold">
          {item.date}
          <span className="ml-2 text-primary/80">
            （{getAcademicStatus(item.date)}）
          </span>
        </span>
        <h3 className="text-xl font-bold my-2 text-text-main">{item.title}</h3>
        
        {/* タグ表示エリア */}
        <div className="flex flex-wrap gap-2 my-3">
          {item.tags.map(tagName => {
            const style = siteConfig.tagStyles[tagName];
            if (!style) return null;
            return (
              <span key={tagName} className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${style.color}`}>
                {React.createElement(style.icon, { className: 'w-3 h-3' })}
                {tagName}
              </span>
            );
          })}
        </div>

        {/* 説明文のコンテナ */}
        <div className="relative overflow-hidden">
          {/* isExpandedの状態に応じて高さを変更
            max-h-24: 閉じた状態の最大の高さ (約4行分)
            max-h-[1000px]: 開いた状態の最大の高さ (十分な高さを確保)
            whitespace-pre-line: CSSで改行(\n)を有効にする
          */}
          <p 
            ref={descriptionRef}
            className={`text-text-sub leading-relaxed transition-all duration-500 ease-in-out whitespace-pre-line ${isExpanded ? 'max-h-[1000px]' : 'max-h-24'}`}
          >
            {item.description}
          </p>
          
          {/* テキストが閉じていて、かつ省略可能な場合にフェード効果を表示 */}
          {!isExpanded && isCollapsible && (
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-surface to-transparent"></div>
          )}
        </div>
        
        {/* 省略可能な場合にのみ「もっと見る」ボタンを表示 */}
        {isCollapsible && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-bold text-primary mt-2 hover:opacity-80 transition-opacity"
          >
            {isExpanded ? '折りたたむ' : 'もっと見る'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
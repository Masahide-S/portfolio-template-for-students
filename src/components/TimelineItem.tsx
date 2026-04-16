"use client";

import React, { useState, useRef, useEffect } from 'react';
import { IconType } from 'react-icons';

// ▼▼▼ 使用する可能性のあるアイコンをすべてインポート ▼▼▼
import { 
  FaGraduationCap, FaBuilding, FaCode, FaLightbulb, FaTrophy, FaFlask, 
  FaUsers, FaBrain, FaPalette, FaBook, FaCertificate 
} from 'react-icons/fa';
import { RiDatabaseLine, RiPresentationLine } from "react-icons/ri";

// アイコン名（文字列）とアイコンコンポーネントを対応付けるための「マップ」オブジェクト
const iconMap: { [key: string]: IconType } = {
  FaGraduationCap, FaBuilding, FaCode, FaLightbulb, FaTrophy, FaFlask, 
  FaUsers, FaBrain, FaPalette, FaBook, FaCertificate, RiDatabaseLine, RiPresentationLine
};

// --- このコンポーネントが受け取るデータの型定義 ---
type HistoryItem = {
  date: string;
  title: string;
  description: string;
  tags: string[];
};
type TagStyles = { 
  [key: string]: { color: string; iconName: string }; // icon -> iconName に変更
};
interface TimelineItemProps {
  item: HistoryItem;
  getAcademicStatus: (date: string) => string;
  tagStyles: TagStyles;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, getAcademicStatus, tagStyles }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const isOverflowing = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
      setIsCollapsible(isOverflowing);
    }
  }, [item.description]);

  return (
    <div className="mb-12 pl-12 relative">
      <div className="absolute -left-2.5 top-1 w-5 h-5 bg-primary rounded-full border-4 border-surface"></div>
      <div className="p-6 bg-surface rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
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

            // iconName（文字列）から、対応するアイコンコンポーネントをiconMapから取得
            const TagIcon = iconMap[style.iconName];
            if (!TagIcon) return null;
            
            return (
              <span key={tagName} className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${style.color}`}>
                <TagIcon className="w-3 h-3" />
                {tagName}
              </span>
            );
          })}
        </div>

        <div className="relative overflow-hidden">
          <p 
            ref={descriptionRef}
            className={`text-text-sub leading-relaxed transition-all duration-500 ease-in-out whitespace-pre-line ${isExpanded ? 'max-h-[1000px]' : 'max-h-24'}`}
          >
            {item.description}
          </p>
          {!isExpanded && isCollapsible && (
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-surface to-transparent"></div>
          )}
        </div>
        
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

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { siteConfig } from '@/data/config';
import { IconType } from 'react-icons';

// このコンポーネントが受け取るデータの型を更新
interface Detail {
  subtitle: string;
  text: string;
}
interface Item {
  date: string;
  title: string;
  description: string;
  tags: string[];
  details?: Detail[]; // detailsはあってもなくても良い（オプショナル）
}
interface CollapsibleCardProps {
  item: Item;
  icon: IconType;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({ item, icon }) => {
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
    <div className="bg-base p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-4 mb-2">
        <div className="text-3xl text-primary">{React.createElement(icon)}</div>
        <div>
          <h3 className="text-xl font-bold text-text-main">{item.title}</h3>
          <p className="text-sm text-text-sub font-semibold">{item.date}</p>
        </div>
      </div>
      
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
      
      {/* ▼▼▼ ここから詳細表示セクション ▼▼▼ */}
      {item.details && item.details.length > 0 && (
        <div className="my-4 border-t border-surface pt-4 space-y-2">
          {item.details.map((detail, index) => (
            <div key={index} className="flex text-sm">
              <p className="font-bold text-text-main w-24 flex-shrink-0">{detail.subtitle}:</p>
              <p className="text-text-sub">{detail.text}</p>
            </div>
          ))}
        </div>
      )}
      {/* ▲▲▲ ここまで ▲▲▲ */}

      <div className="relative overflow-hidden">
        <p 
          ref={descriptionRef}
          className={`text-text-sub leading-relaxed transition-all duration-500 ease-in-out whitespace-pre-line ${isExpanded ? 'max-h-[1000px]' : 'max-h-24'}`}
        >
          {item.description}
        </p>
        {!isExpanded && isCollapsible && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-base to-transparent"></div>
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
  );
};

export default CollapsibleCard;
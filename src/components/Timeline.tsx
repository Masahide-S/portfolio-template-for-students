"use client";

import React, { useState, useMemo } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import TimelineItem from './TimelineItem';
import { calculateGrade, getAcademicStatus, compareDates } from '@/lib/utils';

// 型定義
type TimelineItemData = {
  date: string;
  title: string;
  description: string;
  tags: string[];
};
type Profile = { 
  university?: { 
    entranceYear?: number;
  } 
};
type TagStyles = { [key: string]: { color: string; iconName: string } };

interface TimelineProps {
  timeline: TimelineItemData[];
  profile: Profile;
  tagStyles: TagStyles;
}

const Timeline: React.FC<TimelineProps> = ({ timeline = [], profile = {}, tagStyles = {} }) => {
  const historyItems = timeline;
  const { university = {} } = profile;

  const currentGrade = university.entranceYear ? calculateGrade(university.entranceYear) : 0;

  const getAcademicStatusForItem = (eventDate: string) => {
    if (!university.entranceYear) return "";
    return getAcademicStatus(eventDate, university.entranceYear, currentGrade);
  };

  // --- インタラクティブ機能のための状態管理 ---
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // --- 表示用データの計算 ---
  const allTags = useMemo(() => [...new Set(historyItems.flatMap(item => item.tags || []))], [historyItems]);
  
  const sortedAndFilteredItems = useMemo(() => {
    const filtered = activeTag
      ? historyItems.filter(item => item.tags?.includes(activeTag))
      : historyItems;

    return [...filtered].sort((a, b) => {
      const comparison = compareDates(a.date, b.date);
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [activeTag, sortOrder, historyItems]);

  return (
    <section id="timeline" className="py-20 bg-base border-t-2 border-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary after:rounded-full">
          Timeline
        </h2>
        
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
        
        <div className="h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-surface">
          <div className="relative border-l-2 border-primary/50 ml-6 md:ml-auto md:mr-auto max-w-2xl">
            {sortedAndFilteredItems.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                getAcademicStatus={getAcademicStatusForItem}
                tagStyles={tagStyles}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;

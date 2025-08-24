"use client";

import React from 'react';
import { siteConfig } from '@/data/config';
import { FaTrophy } from 'react-icons/fa';
import CollapsibleCard from './CollapsibleCard'; // ▼▼▼ 新しいコンポーネントをインポート ▼▼▼

const Awards: React.FC = () => {
  const { items: awardItems } = siteConfig.awards;

  return (
    <section id="awards" className="py-20 bg-surface border-t-2 border-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary after:rounded-full">
          Awards
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* ▼▼▼ ここをCollapsibleCardコンポーネントに置き換え ▼▼▼ */}
          {awardItems.map((item, index) => (
            <CollapsibleCard key={index} item={item} icon={FaTrophy} />
          ))}
          {/* ▲▲▲ ここまで ▲▲▲ */}
        </div>
      </div>
    </section>
  );
};

export default Awards;
"use client";

import React from 'react';
import { siteConfig } from '@/data/config';
import { FaFlask } from 'react-icons/fa';
import CollapsibleCard from './CollapsibleCard'; // ▼▼▼ 新しいコンポーネントをインポート ▼▼▼

const Research: React.FC = () => {
  const { items: researchItems } = siteConfig.research;
  
  return (
    <section id="research" className="py-20 bg-base border-t-2 border-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary after:rounded-full">
          Research
        </h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* ▼▼▼ ここをCollapsibleCardコンポーネントに置き換え ▼▼▼ */}
          {researchItems.map((item, index) => (
            <CollapsibleCard key={index} item={item} icon={FaFlask} />
          ))}
          {/* ▲▲▲ ここまで ▲▲▲ */}
        </div>
      </div>
    </section>
  );
};

export default Research;
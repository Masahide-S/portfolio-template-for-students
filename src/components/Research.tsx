import React from 'react';
import { siteConfig } from '@/data/config';
import { FaFlask } from 'react-icons/fa';

/**
 * 研究内容を表示するセクションコンポーネント
 */
const Research: React.FC = () => {
  // 設定ファイルから研究リストとタグスタイルを取得
  const { items: researchItems } = siteConfig.research;
  const { tagStyles } = siteConfig;
  
  return (
    <section id="research" className="py-20 bg-base border-t-2 border-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary after:rounded-full">
          Research
        </h2>
        <div className="max-w-4xl mx-auto">
          {/* 研究リストをループで表示 */}
          {researchItems.map((item, index) => (
            <div key={index} className="bg-surface p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out mb-8">
              <div className="flex items-center gap-4 mb-2">
                <FaFlask className="text-3xl text-primary" />
                <div>
                  <h3 className="text-xl font-bold text-text-main">{item.title}</h3>
                  <p className="text-sm text-text-sub font-semibold">{item.date}</p>
                </div>
              </div>
              {/* 各研究に付けられたタグをループで表示 */}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;
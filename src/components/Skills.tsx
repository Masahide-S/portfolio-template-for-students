import React from 'react';
import { siteConfig } from '@/data/config';

/**
 * スキルセットを表示するセクションコンポーネント
 * configファイルからカテゴリ（フロントエンドなど）とスキルリストを取得して表示する
 */
const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-surface border-t-2 border-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary after:rounded-full">
          Skills
        </h2>
        
        {/* スキルカテゴリごとにループ処理 */}
        {Object.entries(siteConfig.skills).map(([category, skills]) => (
          // スキルリストが空でなければセクションを表示
          (skills as any[]).length > 0 && (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-semibold text-center mb-8 text-text-sub capitalize">{category}</h3>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {/* 各スキルをループ処理で表示 */}
                {(skills as any[]).map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-300 hover:bg-base hover:scale-105">
                    <div className="text-5xl text-primary">{React.createElement(skill.icon)}</div>
                    <span className="text-sm text-text-main font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  );
};

export default Skills;
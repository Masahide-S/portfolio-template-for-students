import React from 'react';
import { siteConfig } from '@/data/config';

/**
 * 取得した資格情報を表示するセクションコンポーネント
 */
const Certifications: React.FC = () => {
  // 設定ファイルから資格リストを取得
  const { items } = siteConfig.certifications;

  return (
    <section id="certifications" className="py-20 bg-surface border-t-2 border-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-primary after:rounded-full">
          Certifications
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {/* 資格リストをループで表示 */}
            {items.map((item, index) => (
              <div key={index} className="flex items-start gap-6 p-6 bg-base rounded-lg shadow-md">
                <div className="text-3xl text-primary mt-1">
                  {React.createElement(item.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-main">{item.name}</h3>
                  <p className="text-md text-text-sub mt-1">{item.issuer}</p>
                  <p className="text-sm text-text-sub font-semibold mt-2">{item.date} 取得</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
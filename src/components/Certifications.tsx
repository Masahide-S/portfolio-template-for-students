import React from 'react';
import { iconMap } from '@/lib/icons';
import type { Certification } from '@/types';

const Certifications: React.FC<{ certifications: Certification[] }> = ({ certifications = [] }) => {
  const getIcon = (iconName: string) => {
    return iconMap[iconName] ? React.createElement(iconMap[iconName]) : null;
  };

  return (
    <div id="certifications" className="py-10">
      <h3 className="subsection-title">Certifications</h3>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {certifications.map((item, index) => (
              // ▼▼▼ このdivにホバーエフェクト用のクラスを追加 ▼▼▼
              <div 
                key={index} 
                className="flex items-start gap-6 p-6 bg-base rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2"
              >
              {/* ▲▲▲ ここまで ▲▲▲ */}
                <div className="text-3xl text-primary mt-1">
                  {getIcon(item.iconName)}
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
  );
};

export default Certifications;
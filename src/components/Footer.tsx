import React from 'react';
import { siteConfig } from '@/data/config';

/**
 * サイト全体のフッターコンポーネント
 * ナビゲーションリンクとコピーライトを表示する
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-base py-8 border-t-2 border-primary/10">
      <div className="container mx-auto px-6 text-center">
        {/* フッターナビゲーション */}
        <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-6">
          {siteConfig.header.navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-text-sub hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </nav>
        {/* コピーライト表記 */}
        <p className="text-text-sub text-sm">
          &copy; {new Date().getFullYear()} {siteConfig.profile.nameEn}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
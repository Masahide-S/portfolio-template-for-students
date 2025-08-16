import React from 'react';
import { siteConfig } from '@/data/config';

/**
 * サイト全体のヘッダーコンポーネント
 * ナビゲーションリンクを表示する
 */
const Header: React.FC = () => {
  return (
    // スクロールしても追従するように fixed と z-50 を設定
    // 背景を少し透過させ、ぼかし(blur)効果を追加
    <header className="bg-base/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#about" className="text-xl font-bold text-primary hover:opacity-80 transition-opacity">
          {siteConfig.profile.name}'s Portfolio
        </a>
        {/* md (768px) 以上の画面幅でのみナビゲーションを表示 */}
        <nav className="hidden md:flex space-x-8">
          {siteConfig.header.navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-text-main hover:text-primary transition-colors duration-300 font-medium"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
"use client";
import React from 'react';

type NavItem = { name: string; href: string };

const Header: React.FC<{ navItems: NavItem[] }> = ({ navItems = [] }) => {
  return (
    <header className="bg-base/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* ▼▼▼ この行を修正 ▼▼▼ */}
        <a href="#about" className="text-xl font-bold text-primary hover:opacity-80 transition-opacity">
          Masahide&apos;s Portfolio
        </a>
        {/* ▲▲▲ ここまで ▲▲▲ */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
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
"use client";

import React from 'react';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { iconMap } from '@/lib/icons';

// Swiper関連
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

// 型定義
type Product = {
  title: string;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
  description: string;
};
type TagStyles = {
  [key: string]: { color: string; iconName: string };
};
interface ProductCarouselProps {
  products: Product[];
  tagStyles: TagStyles;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products = [], tagStyles = {} }) => {
  return (
    <Swiper
      modules={[FreeMode, Mousewheel]}
      spaceBetween={24}
      freeMode={true}
      mousewheel={{
        forceToAxis: true, // スクロールを軸に沿って強制する
        sensitivity: 1,    // スクロールの感度
      }}
      breakpoints={{
        320: { slidesPerView: 1.2 },
        640: { slidesPerView: 2.2 },
        1024: { slidesPerView: 3.2 },
      }}
      className="w-full"
    >
      {products.map((product, index) => (
        <SwiperSlide key={index}>
          <div className="bg-surface rounded-lg shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
            <div className="relative w-full h-48 flex-shrink-0">
              <Image
                src={product.imageUrl}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                objectPosition="top"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-text-main mb-2 truncate">{product.title}</h3>
              <div className="flex flex-wrap gap-2 my-3">
                {product.tags.map(tagName => {
                  const style = tagStyles[tagName];
                  if (!style) return null;
                  const TagIcon = iconMap[style.iconName];
                  if (!TagIcon) return null;
                  return (
                    <span key={tagName} className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${style.color}`}>
                      <TagIcon className="w-3 h-3" />
                      {tagName}
                    </span>
                  );
                })}
              </div>
              <p className="text-text-sub text-sm leading-relaxed mb-4 flex-grow">{product.description}</p>
              <div className="mt-auto pt-4 border-t border-primary/10 flex gap-4">
                {product.githubUrl ? (
                  <a href={product.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm font-semibold rounded-md shadow-md hover:bg-gray-600 transition-all">
                    <FaGithub /> GitHub
                  </a>
                ) : (
                <button
                  disabled
                  // 色に関するクラス(bg-gray-800, text-gray-500, opacity-70)を削除
                  className="flex-1 text-center inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md cursor-not-allowed"
                  // style属性で直接色を指定
                  style={{
                    backgroundColor: '#2D3748', // bg-gray-800相当
                    color: '#A0AEC0',       // text-gray-500相当
                    opacity: 0.7
                  }}
                >
                  <FaGithub /> GitHub
                </button>
                )}
                {product.liveUrl && (
                  <a href={product.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md shadow-md hover:bg-primary/80 transition-all">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCarousel;

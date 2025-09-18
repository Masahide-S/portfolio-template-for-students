"use client"; // 親もクライアントコンポーネントにしておくのが安全

import React from 'react';
import dynamic from 'next/dynamic'; // 👈 dynamicをインポート

// カルーセルコンポーネントをブラウザ側だけで読み込む
const ProductCarousel = dynamic(() => import('./ProductCarousel'), {
  ssr: false, // サーバーサイドレンダリングを無効化
  loading: () => <div className="text-center p-8">Loading...</div>, // 読み込み中に表示する内容
});

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
interface ProductsProps {
  products: Product[];
  tagStyles: TagStyles;
}

const Products: React.FC<ProductsProps> = ({ products = [], tagStyles = {} }) => {
  return (
    <div id="products" className="py-10">
      <h3 className="subsection-title">Products</h3>

      {/* 動的に読み込んだカルーセルをここで呼び出す */}
      <ProductCarousel products={products} tagStyles={tagStyles} />
    </div>
  );
};

export default Products;
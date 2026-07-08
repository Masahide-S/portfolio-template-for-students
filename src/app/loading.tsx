import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="text-center">
        <div className="inline-block relative w-20 h-20 mb-4">
          <div className="absolute border-4 border-primary border-t-transparent rounded-full w-20 h-20 animate-spin"></div>
        </div>
        <p className="text-xl font-semibold text-text-main">読み込み中...</p>
        <p className="text-sm text-text-sub mt-2">しばらくお待ちください</p>
      </div>
    </div>
  );
}

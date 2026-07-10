'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">エラー</h1>
          <h2 className="text-2xl font-semibold text-text-main mb-4">
            問題が発生しました
          </h2>
          <p className="text-text-sub">
            申し訳ございません。ページの読み込み中にエラーが発生しました。
          </p>
        </div>

        <div className="bg-surface rounded-lg p-6 mb-6">
          <p className="text-sm text-text-sub font-mono break-words">
            {error.message || '不明なエラーが発生しました'}
          </p>
          {error.digest && (
            <p className="text-xs text-text-sub mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/80 transition-all duration-300"
          >
            もう一度試す
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-surface text-text-main font-semibold rounded-lg shadow-md hover:bg-surface/80 transition-all duration-300 inline-block"
          >
            トップページへ
          </Link>
        </div>
      </div>
    </div>
  );
}

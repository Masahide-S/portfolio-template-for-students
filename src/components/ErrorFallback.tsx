import React from 'react';

interface ErrorFallbackProps {
  error?: Error | null;
  resetErrorBoundary?: () => void;
  message?: string;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
  message = 'データの読み込みに失敗しました'
}: ErrorFallbackProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center bg-base px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-text-main mb-2">
            {message}
          </h3>
          {error && (
            <p className="text-sm text-text-sub font-mono bg-surface rounded p-4 mt-4 break-words">
              {error.message}
            </p>
          )}
        </div>

        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/80 transition-all duration-300"
          >
            再試行
          </button>
        )}
      </div>
    </div>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        // セキュリティヘッダーをすべてのルートに適用
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // クリックジャッキング攻撃を防止
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // MIMEタイプスニッフィングを防止
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // リファラー情報の漏洩を制限
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // 不要な機能を無効化
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        // 本番環境のみ HSTS を適用
        source: '/:path*',
        headers:
          process.env.NODE_ENV === 'production'
            ? [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=63072000; includeSubDomains; preload', // HTTPS強制
                },
              ]
            : [],
      },
    ];
  },
};

export default nextConfig;
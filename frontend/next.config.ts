import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 300,           // 300msごとにファイルチェック
        aggregateTimeout: 300 // 再ビルドまでの待機時間
      }
    }
    return config
  },
  output: 'standalone',
};

export default nextConfig;

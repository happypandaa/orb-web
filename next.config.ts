import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // 静态导出到 out 文件夹
  images: {
    unoptimized: true,  // 静态导出需要禁用图片优化
  },
  trailingSlash: true,  // 生成 /about/index.html 而非 /about.html，更适合 OSS
};

export default nextConfig;

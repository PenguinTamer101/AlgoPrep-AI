import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  eslint: {
    // This will not stop the build even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

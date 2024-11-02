import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

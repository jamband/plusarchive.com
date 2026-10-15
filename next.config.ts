import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: true,
    turbopackSharedRuntime: false,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;

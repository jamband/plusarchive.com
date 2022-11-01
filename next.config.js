/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/track/:id",
        destination: "/tracks/:id",
        permanent: true,
      },
      {
        source: "/playlist/:id",
        destination: "/playlists/:id",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

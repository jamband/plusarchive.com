/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    browsersListForSwc: true,
    legacyBrowsers: false,
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
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

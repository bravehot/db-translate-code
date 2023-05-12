/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "https://www.yuque.com/aiyouwai/gfni48/fskou5t8g6ogdc7z",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

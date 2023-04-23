/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  publicRuntimeConfig: {
    abc: process.env.NEXT_PUBLIC_CLIENT_ID,
  },
};

module.exports = nextConfig;

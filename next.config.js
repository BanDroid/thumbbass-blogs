/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["external-content.duckduckgo.com", "images2.imgbox.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

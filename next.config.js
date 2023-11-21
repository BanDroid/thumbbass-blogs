/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "external-content.duckduckgo.com",
      "images2.imgbox.com",
      "i.ibb.co",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ['dev-next-cart-app.pantheonsite.io'],
  },
};

module.exports = nextConfig;

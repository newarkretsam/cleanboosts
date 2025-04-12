/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    domains: ['cdn.sellhub.cx','myvouch.es'],
    unoptimized: true,
  },
};

export default nextConfig;

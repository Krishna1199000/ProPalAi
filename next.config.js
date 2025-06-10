/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['propalai.s3.ap-south-1.amazonaws.com', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig; 
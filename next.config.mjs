/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.formula1.com' },
      { protocol: 'https', hostname: '**.openf1.org' },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Ensure fast build and smooth SSR
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;

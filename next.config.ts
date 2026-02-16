import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // If you are deploying to Vercel and want to ensure the best performance 
  // for your Chennai-based users, you can also add:
  compress: true,
};

export default nextConfig;
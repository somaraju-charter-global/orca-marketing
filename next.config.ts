import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/images/**',
      },
      {
        pathname: '/logos/**',
      },
      {
        // Local dev fallback storage for images uploaded via
        // /api/upload/image (see lib/storage.ts).
        pathname: '/api/local-blob/images/**',
      },
    ],
    remotePatterns: [
      {
        // Production storage for images uploaded via /api/upload/image.
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;

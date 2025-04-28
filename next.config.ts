import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'taskmaster-files-aula.s3.sa-east-1.amazonaws.com'
      }
    ]
  }
};

export default nextConfig;

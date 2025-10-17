import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,

  images: {
    domains: ["agc-storage.s3.eu-north-1.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/googlea264a916086e83a6.html",
        destination: "/api/googlea264a916086e83a6",
      },
    ];
  }
};

export default nextConfig;

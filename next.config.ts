import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "alfandari.biz",
      },
    ],
  },
};

export default nextConfig;

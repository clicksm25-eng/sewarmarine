import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "sewarmarine.com" },
    ],
  },
};

export default nextConfig;

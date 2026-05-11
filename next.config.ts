import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "vps.sermonaudio.com" },
      { protocol: "https", hostname: "media.sermonaudio.com" },
      { protocol: "https", hostname: "cloud.sermonaudio.com" },
    ],
  },
};

export default nextConfig;

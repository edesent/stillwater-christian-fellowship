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
  async headers() {
    return [
      {
        source: "/sermons",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=60, stale-while-revalidate=300, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

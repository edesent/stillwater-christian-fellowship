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
  async redirects() {
    return [
      { source: "/about-us", destination: "/", permanent: true },
      { source: "/our-history", destination: "/history", permanent: true },
      { source: "/our-ministries", destination: "/?section=ministries", permanent: true },
      { source: "/bible-study", destination: "/sermons", permanent: true },
      { source: "/worship", destination: "/?section=worship", permanent: true },
      { source: "/connect", destination: "/?section=contact", permanent: true },
      { source: "/contact", destination: "/?section=contact", permanent: true },
      { source: "/contact-us", destination: "/?section=contact", permanent: true },
      { source: "/stream-test-page", destination: "/sermons", permanent: true },
      { source: "/pastor", destination: "/from-the-pastor", permanent: true },
      { source: "/our-pastor", destination: "/from-the-pastor", permanent: true },
    ];
  },
};

export default nextConfig;

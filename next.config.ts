import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old AI-consulting service pages were removed in the repositioning.
      // 301 them to the homepage so old links and any SEO equity land somewhere real.
      { source: "/services", destination: "/", permanent: true },
      { source: "/services/:slug", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;

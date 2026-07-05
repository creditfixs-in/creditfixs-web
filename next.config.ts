import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain <img>/SVG only — keeps the site portable across Cloudflare and Render
  // without needing an image-optimization backend.
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

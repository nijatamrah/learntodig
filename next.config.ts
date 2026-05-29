import type { NextConfig } from "next";

const welllogApiUrl = process.env.WELLLOG_API_URL ?? "http://localhost:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/welllog/:path*",
        destination: `${welllogApiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;

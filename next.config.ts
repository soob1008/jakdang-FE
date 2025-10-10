import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wffisibzgiiugnltkuvs.supabase.co",
        pathname: "/storage/v1/object/public/jakdang-images/**",
      },
      {
        protocol: "https",
        hostname: "search1.kakaocdn.net",
        pathname: "/thumb/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;

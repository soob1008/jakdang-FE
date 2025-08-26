import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
        port: "",
        pathname: "/storage/v1/object/public/jakdang-images/**",
      },
      {
        protocol: "https",
        hostname: "search1.kakaocdn.net",
        pathname: "/thumb/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/theme-vision",
  assetPrefix: "/theme-vision/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

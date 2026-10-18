import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 80],
    deviceSizes: [375, 480, 640, 768, 1024, 1280, 1600, 2048],
    imageSizes: [96, 160, 240, 320, 400],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;

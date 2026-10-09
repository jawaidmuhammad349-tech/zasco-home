import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stand-in photography. Remove once real product photos live in /public.
    remotePatterns: [new URL("https://images.unsplash.com/**")],
    qualities: [75, 80],
  },
};

export default nextConfig;

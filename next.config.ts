import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizacije za Netlify
  output: 'standalone',
  experimental: {
    // Isključi turbopack za production build
    turbo: undefined,
  },
  // Za statičko generiranje
  trailingSlash: false,
};

export default nextConfig;

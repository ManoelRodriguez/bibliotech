import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
    staleTimes: {
      dynamic: 30, // páginas dinâmicas ficam no cache do browser por 30s
      static: 300, // páginas estáticas/ISR por 5min
    },
  },
};

export default nextConfig;

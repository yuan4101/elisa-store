import type { NextConfig } from "next";

const { hostname } = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "");

const nextConfig: NextConfig = {
  reactCompiler: false,
  allowedDevOrigins: [`${process.env.IP}`, "localhost", "127.0.0.1", "192.168.40.51"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: hostname,
        port: "",
        pathname: "/storage/v1/object/public/product-images/**",
      },
    ],
    //minimumCacheTTL: 2678400, // 31 días
    formats: ["image/webp"],
  },
};

export default nextConfig;

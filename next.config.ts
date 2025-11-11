import type { NextConfig } from "next";

const { hostname } = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || "");

const nextConfig: NextConfig = {
  allowedDevOrigins: [`${process.env.IP}`, "localhost", "127.0.0.1"],
  async headers() {
    // ✅ Solo agregar headers CORS en desarrollo
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT,OPTIONS" },
            { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          ],
        },
      ];
    }
    
    // ✅ En producción, Next.js y tu API están en el mismo origen, no necesitas CORS
    return [];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: hostname,
        port: "",
        pathname: "/storage/v1/object/public/product-images/**",
      },
    ],
    minimumCacheTTL: 2678400, // 31 días
    formats: ["image/webp"],
  },
};

export default nextConfig;

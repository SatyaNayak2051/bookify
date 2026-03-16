import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: { domains: ["covers.openlibrary.org"] },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        // port: "",
        // pathname: "/b/id/**",
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;

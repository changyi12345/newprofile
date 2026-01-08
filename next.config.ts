import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    // Ensure NEXTAUTH_URL is available during build
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || process.env.DEPLOY_PRIME_URL || "https://placeholder.netlify.app",
  },
};

export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    // NEXTAUTH_URL will be provided by Netlify environment variables
    // Do not hardcode fallback values to avoid secrets scanning issues
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || process.env.DEPLOY_PRIME_URL,
  },
};

export default nextConfig;


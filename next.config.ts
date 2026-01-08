import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: {
    // @ts-expect-error
    buildActivity: false,
    // @ts-expect-error
    appIsrStatus: false,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://coffee-late-echidna-663.mypinata.cloud/**")]
  }
};

export default nextConfig;

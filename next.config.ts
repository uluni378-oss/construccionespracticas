import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project photographs are already optimized WebP files. Serving them
    // directly avoids a runtime image transform that is unavailable on Sites.
    unoptimized: true,
  },
};

export default nextConfig;

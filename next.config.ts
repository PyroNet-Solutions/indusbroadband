import type { NextConfig } from "next";

// Static export: nginx on vm-sites serves the out/ folder directly.
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;

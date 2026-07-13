import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX();
const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

export default withMDX(nextConfig);

import type { NextConfig } from "next";

// Cloudflare Pages builds set CF_PAGES automatically. This site has no API
// routes or dynamic rendering, so it can ship as a plain static export there
// (Cloudflare's Image Optimization isn't wired up, hence unoptimized images).
// Vercel keeps the standalone build with full next/image optimization.
const isCloudflarePages = process.env.CF_PAGES === "1";

const nextConfig: NextConfig = {
  output: isCloudflarePages ? "export" : "standalone",
  images: isCloudflarePages ? { unoptimized: true } : undefined,
};

export default nextConfig;

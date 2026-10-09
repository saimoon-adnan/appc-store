// Set NEXT_OUTPUT=export to build a fully static site (out/ folder) for
// GitHub Pages, Cloudflare Pages, Netlify, or any static host.
const isExport = process.env.NEXT_OUTPUT === "export";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isExport ? { output: "export", trailingSlash: true } : {}),
  images: {
    unoptimized: isExport,
    // Add hosts here if you load icons/screenshots from another domain.
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
};

export default nextConfig;

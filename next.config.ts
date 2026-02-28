import type { NextConfig } from "next";
import { readFileSync } from "fs";

const { version } = JSON.parse(readFileSync("./package.json", "utf-8"));

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // /?category=slug → /category/slug (SEO: consolidate old query-string URLs)
      {
        source: "/",
        has: [{ type: "query", key: "category", value: "(?<slug>.+)" }],
        destination: "/category/:slug",
        permanent: true,
      },
      // www → apex (canonical domain)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.aimarketwire.ai" }],
        destination: "https://aimarketwire.ai/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

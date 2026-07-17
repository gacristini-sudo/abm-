import type { NextConfig } from "next";

// GITHUB_PAGES=true switches this to a static export for GitHub Pages hosting
// (which serves plain files — no Node runtime for SSR/middleware). Vercel and
// `next dev`/`next start` are unaffected and keep full SSR.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "abm-";

const nextConfig: NextConfig = {
  ...(isGithubPages && {
    output: "export",
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;

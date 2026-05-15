import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Add Supabase storage host once we know the project ref (Phase 1)
  // images: { remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }] },
};

export default withNextIntl(nextConfig);

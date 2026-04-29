import type { MetadataRoute } from "next";
import { sitemapImages, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-04-29"),
      changeFrequency: "weekly",
      priority: 1,
      images: sitemapImages,
    },
  ];
}

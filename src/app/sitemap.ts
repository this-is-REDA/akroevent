import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getUniversSlugs } from "@/data/univers";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/galerie`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...getUniversSlugs().map((slug) => ({
      url: `${SITE_URL}/univers/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

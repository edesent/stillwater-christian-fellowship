import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { getSermons } from "@/lib/sermons";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/sermons`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/steps-to-salvation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/from-the-pastor`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/events`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/give`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/beliefs`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/history`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  // Add every page of the sermon archive so Google can index them all.
  let totalPages = 1;
  try {
    const { totalPages: t } = await getSermons(1);
    totalPages = t;
  } catch {
    // sermon API offline at build time — fall back to just /sermons
  }
  const sermonPages: MetadataRoute.Sitemap = [];
  for (let p = 2; p <= totalPages; p++) {
    sermonPages.push({
      url: `${siteUrl}/sermons?page=${p}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return [...staticRoutes, ...sermonPages];
}

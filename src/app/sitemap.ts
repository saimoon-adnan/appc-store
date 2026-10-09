import type { MetadataRoute } from "next";
import { getAllApps } from "@/lib/apps";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/contact", "/privacy", "/terms"].map((p) => ({ url: `${siteConfig.url}${p}` }));
  const appPages = getAllApps().map((a) => ({
    url: `${siteConfig.url}/apps/${a.slug}`,
    lastModified: a.lastUpdated ?? a.addedDate,
  }));
  return [...pages, ...appPages];
}

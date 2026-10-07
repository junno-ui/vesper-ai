import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/experience"].map((path) => ({ url: `${siteConfig.url}${path}` }));
}

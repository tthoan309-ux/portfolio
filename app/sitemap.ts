import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getResearchProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const research = getResearchProjects();
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...research.map((project) => ({
      url: `${siteConfig.url}/research/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

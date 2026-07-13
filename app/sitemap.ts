import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getPosts, getResearchProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const research = getResearchProjects();
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...research.map((project) => ({
      url: `${siteConfig.url}/research/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

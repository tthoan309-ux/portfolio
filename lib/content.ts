import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};
export type ResearchMeta = {
  slug: string;
  title: string;
  abstract: string;
  capability: string;
  researchQuestion: string;
  methodology: string;
  dataset: string;
  findings: string;
  tools: string;
  status: string;
  timeline: string;
  repository?: string;
  paper?: string;
  featured?: boolean;
  order: number;
};

function readCollection<T>(directory: "posts" | "research") {
  const root = path.join(process.cwd(), "content", directory);
  return fs
    .readdirSync(root)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = fs.readFileSync(path.join(root, file), "utf8");
      const { data, content } = matter(source);
      return { ...(data as T), slug: file.replace(/\.mdx$/, ""), content };
    });
}

export function getPosts(): PostMeta[] {
  return readCollection<Omit<PostMeta, "slug">>("posts")
    .map(({ content: _content, ...post }) => post)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return readCollection<Omit<PostMeta, "slug">>("posts").find(
    (post) => post.slug === slug,
  );
}

export function getResearchProjects(): ResearchMeta[] {
  return readCollection<Omit<ResearchMeta, "slug">>("research")
    .map(({ content: _content, ...project }) => project)
    .sort((a, b) => a.order - b.order);
}

export function getResearchProject(slug: string) {
  return readCollection<Omit<ResearchMeta, "slug">>("research").find(
    (project) => project.slug === slug,
  );
}

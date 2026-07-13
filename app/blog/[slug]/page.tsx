import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { JournalHeader } from "@/components/journal-header";
import { siteConfig } from "@/data/site";
import { getPost, getPosts } from "@/lib/content";

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [siteConfig.legalName],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: siteConfig.legalName },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };
  return (
    <>
      <JournalHeader />
      <main className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <header className="mb-12 border-b border-slate-200 pb-10 dark:border-slate-800">
          <Badge>{post.category}</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            {post.excerpt}
          </p>
          <p className="mt-6 font-mono text-xs text-slate-400">
            {post.date} · {post.readTime} read · {siteConfig.legalName}
          </p>
        </header>
        <article className="prose-research">
          <MDXRemote source={post.content} />
        </article>
        <footer className="mt-16 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800">
          Written as a research note: arguments are provisional and revisions
          are welcome.
        </footer>
      </main>
    </>
  );
}

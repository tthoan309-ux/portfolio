import type { Metadata } from "next";
import { BlogSearch } from "@/components/blog-search";
import { JournalHeader } from "@/components/journal-header";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research Notes",
  description:
    "Essays and research notes on economics, artificial intelligence, climate, and institutions.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPosts();
  return (
    <>
      <JournalHeader />
      <main
        id="main-content"
        className="mx-auto min-h-[80vh] max-w-5xl px-5 py-20 sm:py-28"
      >
        <p className="text-xs font-semibold tracking-[0.18em] text-blue-600 uppercase dark:text-blue-400">
          Research notes
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl">
          Essays, methods, and arguments under development.
        </h1>
        <p className="mt-6 mb-12 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
          Essays on economic development, intelligent systems, credible
          evidence, and the institutions we need next.
        </p>
        <BlogSearch posts={posts} />
      </main>
    </>
  );
}

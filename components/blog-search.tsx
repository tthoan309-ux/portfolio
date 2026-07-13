"use client";

import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

export function BlogSearch({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      posts.filter((post) =>
        `${post.title} ${post.excerpt} ${post.category}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  return (
    <div>
      <label className="mb-10 flex max-w-xl items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:border-slate-700 dark:bg-slate-900">
        <Search className="size-4 text-slate-400" />
        <span className="sr-only">Search essays</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search essays and research notes"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </label>
      <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid gap-4 py-8 transition-colors hover:bg-white/70 sm:grid-cols-[150px_1fr_auto] sm:px-4 dark:hover:bg-slate-900/50"
          >
            <div>
              <Badge>{post.category}</Badge>
              <p className="mt-3 text-xs text-slate-500">
                {post.date} · {post.readTime}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {post.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                {post.excerpt}
              </p>
            </div>
            <ArrowUpRight className="mt-1 size-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-blue-600" />
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-16 text-center text-slate-500">
          No notes match “{query}”.
        </p>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ResearchMeta } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

export function ResearchGrid({ projects }: { projects: ResearchMeta[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      projects.filter((project) =>
        [
          project.title,
          project.abstract,
          project.methodology,
          project.tools,
          ...project.technologies,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [projects, query],
  );
  return (
    <div>
      <label className="mb-8 flex max-w-lg items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:border-slate-700 dark:bg-slate-900">
        <Search className="size-4 text-slate-400" />
        <span className="sr-only">Search research projects</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search methods, tools, or research"
          className="w-full bg-transparent text-sm outline-none"
        />
      </label>
      <div className="grid gap-5 lg:grid-cols-2">
        {filtered.map((project, index) => (
          <motion.article
            layout
            key={project.slug}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.04 }}
            className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/50"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-mono text-[11px] tracking-wider text-blue-600 uppercase dark:text-blue-400">
                {project.timeline}
              </p>
              <Badge>{project.status}</Badge>
            </div>
            <h3 className="mt-7 text-2xl font-semibold tracking-[-.025em]">
              {project.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {project.abstract}
            </p>
            <dl className="mt-7 space-y-4 border-t border-slate-100 pt-6 text-sm dark:border-slate-800">
              <div>
                <dt className="text-[10px] font-semibold tracking-[.15em] text-slate-400 uppercase">
                  Methodology
                </dt>
                <dd className="mt-1.5 leading-6">{project.methodology}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold tracking-[.15em] text-slate-400 uppercase">
                  Dataset
                </dt>
                <dd className="mt-1.5 leading-6">{project.dataset}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold tracking-[.15em] text-slate-400 uppercase">
                  Tools
                </dt>
                <dd className="mt-1.5 leading-6">{project.tools}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Badge key={technology}>{technology}</Badge>
              ))}
            </div>
            <Link
              href={`/research/${project.slug}`}
              className="mt-7 flex items-center gap-2 text-sm font-semibold text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:text-blue-400"
            >
              Read case study{" "}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.article>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-slate-500">
          No research matches “{query}”.
        </p>
      )}
    </div>
  );
}

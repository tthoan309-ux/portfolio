"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { ResearchMeta } from "@/lib/content";

type Capability = {
  id: string;
  number: string;
  title: string;
  description: string;
  methods: string;
  projects: string[];
};

function EvidenceRow({ project }: { project: ResearchMeta }) {
  return (
    <details className="group border-t border-slate-200 first:border-t-0 dark:border-slate-800">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
        <div>
          <p className="font-mono text-[10px] tracking-[.12em] text-slate-400 uppercase">
            {project.timeline} · {project.status}
          </p>
          <h4 className="mt-2 text-lg font-semibold tracking-[-.02em] transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-400">
            {project.title}
          </h4>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            {project.researchQuestion}
          </p>
        </div>
        <ChevronDown className="mt-1 size-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="grid gap-6 pb-7 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Method", project.methodology],
          ["Dataset", project.dataset],
          ["Main finding", project.findings],
        ].map(([label, value]) => (
          <div
            key={label}
            className={label === "Main finding" ? "sm:col-span-2" : ""}
          >
            <p className="text-[10px] font-semibold tracking-[.14em] text-slate-400 uppercase">
              {label}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {value}
            </p>
          </div>
        ))}
        <div className="flex flex-col justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[.14em] text-slate-400 uppercase">
              Tools
            </p>
            <p className="mt-2 font-mono text-xs leading-5 text-slate-500">
              {project.tools}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href={`/research/${project.slug}`}
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:text-blue-400"
            >
              View research <ArrowUpRight className="size-4" />
            </Link>
            {project.repository && (
              <a
                href={project.repository}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:text-slate-300"
                aria-label={`Open ${project.title} repository on GitHub`}
              >
                GitHub <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </details>
  );
}

export function ResearchCapabilities({
  capabilities,
  projects,
}: {
  capabilities: Capability[];
  projects: ResearchMeta[];
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleCapabilities = useMemo(
    () =>
      capabilities
        .map((capability) => {
          const capabilityMatch =
            `${capability.title} ${capability.description} ${capability.methods}`
              .toLowerCase()
              .includes(normalizedQuery);
          const matchedProjects = projects.filter(
            (project) =>
              capability.projects.includes(project.slug) &&
              (capabilityMatch ||
                `${project.title} ${project.abstract} ${project.researchQuestion} ${project.methodology} ${project.dataset} ${project.findings} ${project.tools}`
                  .toLowerCase()
                  .includes(normalizedQuery)),
          );
          return { ...capability, projects: matchedProjects };
        })
        .filter((capability) => capability.projects.length > 0),
    [capabilities, normalizedQuery, projects],
  );

  return (
    <div>
      <label className="mb-10 flex max-w-xl items-center gap-3 border-b border-slate-300 py-3 focus-within:border-blue-600 dark:border-slate-700">
        <Search className="size-4 text-slate-400" aria-hidden="true" />
        <span className="sr-only">Search research areas</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search projects, methods, or datasets"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </label>

      <div className="space-y-5">
        {visibleCapabilities.map((capability) => (
          <article
            key={capability.id}
            id={capability.id}
            className="scroll-mt-24 overflow-hidden border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
          >
            <header className="relative grid gap-5 border-b border-l-4 border-blue-200 border-l-blue-700 bg-blue-50/90 px-5 py-7 shadow-[0_14px_36px_-30px_rgba(30,58,95,.8)] sm:px-8 lg:grid-cols-[100px_1fr_1fr] lg:items-start dark:border-blue-900 dark:border-l-blue-400 dark:bg-blue-950/35">
              <span className="inline-flex h-8 w-fit items-center rounded-full bg-blue-700 px-3 font-mono text-[10px] font-semibold tracking-[.1em] text-white uppercase dark:bg-blue-400 dark:text-slate-950">
                Capability {Number(capability.number)}
              </span>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-.03em] text-slate-950 dark:text-white">
                  {capability.title}
                </h3>
                <p className="mt-3 font-mono text-[11px] leading-5 text-blue-700/70 uppercase dark:text-blue-300/75">
                  {capability.methods}
                </p>
              </div>
              <p className="border-t border-blue-200 pt-4 text-sm leading-6 text-slate-700 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6 dark:border-blue-800 dark:text-slate-300">
                {capability.description}
              </p>
            </header>
            <div className="px-5 sm:px-8 lg:pl-[140px]">
              {capability.projects.map((project) => (
                <EvidenceRow
                  key={`${capability.id}-${project.slug}`}
                  project={project}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
      {visibleCapabilities.length === 0 && (
        <p className="border-y border-slate-200 py-12 text-center text-sm text-slate-500 dark:border-slate-800">
          No projects match “{query}”.
        </p>
      )}
    </div>
  );
}

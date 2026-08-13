"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  FolderSearch,
  Layers3,
  MousePointerClick,
  X,
} from "lucide-react";
import { useState } from "react";
import { ResearchCapabilities } from "@/components/research-capabilities";
import type { ResearchMeta } from "@/lib/content";

type Capability = {
  id: string;
  number: string;
  title: string;
  description: string;
  methods: string;
  projects: string[];
};

type WorkingPaper = {
  title: string;
  status: string;
  abstract: string;
  expectedSubmission: string;
  stages: { label: string; status: string }[];
};

type View = "featured" | "topics" | "progress";

const choices = [
  {
    id: "featured" as const,
    label: "Featured research",
    caption: "A concise selection of completed empirical work.",
    action: "View featured research",
    icon: BookOpen,
    accent: "bg-[#1E3A5F] dark:bg-blue-300",
    iconTone:
      "bg-[#e9eef5] text-[#1E3A5F] group-hover:bg-[#1E3A5F] group-hover:text-white dark:bg-blue-950 dark:text-blue-300 dark:group-hover:bg-blue-300 dark:group-hover:text-slate-950",
    actionTone: "text-[#1E3A5F] dark:text-blue-300",
  },
  {
    id: "topics" as const,
    label: "Research by topic",
    caption: "Browse the full research archive by question and method.",
    action: "Browse research topics",
    icon: Layers3,
    accent: "bg-blue-600 dark:bg-blue-400",
    iconTone:
      "bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white dark:bg-blue-950 dark:text-blue-300 dark:group-hover:bg-blue-400 dark:group-hover:text-slate-950",
    actionTone: "text-blue-700 dark:text-blue-400",
  },
  {
    id: "progress" as const,
    label: "Research in progress",
    caption: "Current studies, with development stages shown explicitly.",
    action: "View ongoing research",
    icon: FolderSearch,
    accent: "bg-amber-600 dark:bg-amber-400",
    iconTone:
      "bg-amber-50 text-amber-700 group-hover:bg-amber-700 group-hover:text-white dark:bg-amber-950 dark:text-amber-300 dark:group-hover:bg-amber-400 dark:group-hover:text-slate-950",
    actionTone: "text-amber-700 dark:text-amber-400",
  },
];

function FeaturedResearch({ projects }: { projects: ResearchMeta[] }) {
  return (
    <div className="grid gap-px overflow-hidden border border-slate-200 bg-slate-200 lg:grid-cols-2 dark:border-slate-800 dark:bg-slate-800">
      {projects.map((project, index) => (
        <article
          key={project.slug}
          className="group flex min-h-[310px] flex-col bg-white p-6 transition-colors duration-200 hover:bg-slate-50 sm:p-8 dark:bg-slate-950 dark:hover:bg-slate-900/60"
        >
          <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[.1em] uppercase">
            <span className="text-blue-700 dark:text-blue-400">
              R/{String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-slate-400">{project.timeline}</span>
          </div>
          <h3 className="mt-8 text-2xl font-semibold tracking-[-.035em]">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {project.researchQuestion}
          </p>
          <div className="mt-auto grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2 dark:border-slate-800">
            <div>
              <p className="text-[10px] font-semibold tracking-[.12em] text-slate-400 uppercase">
                Method
              </p>
              <p className="mt-2 text-xs leading-5">{project.methodology}</p>
            </div>
            <div className="flex items-end sm:justify-end">
              <Link
                href={`/research/${project.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:text-blue-400"
              >
                View research
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ResearchProgress({ papers }: { papers: WorkingPaper[] }) {
  return (
    <div className="space-y-5">
      {papers.map((paper) => (
        <article
          key={paper.title}
          className="grid gap-8 border border-slate-200 bg-white p-6 lg:grid-cols-[1.05fr_.95fr] lg:p-8 dark:border-slate-800 dark:bg-slate-950"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[.12em] text-teal-700 uppercase dark:text-teal-400">
              {paper.status}
            </p>
            <h3 className="mt-4 text-2xl font-semibold tracking-[-.03em]">
              {paper.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {paper.abstract}
            </p>
            <p className="mt-5 text-xs text-slate-500">
              Expected submission: {paper.expectedSubmission}
            </p>
          </div>
          <ol className="border-t border-slate-200 dark:border-slate-800">
            {paper.stages.map((stage, index) => (
              <li
                key={stage.label}
                className="grid grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-slate-200 py-3 text-sm dark:border-slate-800"
              >
                <span className="font-mono text-[9px] text-slate-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{stage.label}</span>
                <span
                  className={`font-mono text-[9px] tracking-wider uppercase ${stage.status === "active" ? "text-blue-700 dark:text-blue-400" : "text-slate-400"}`}
                >
                  {stage.status}
                </span>
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
  );
}

export function ResearchExplorer({
  featured,
  capabilities,
  projects,
  papers,
}: {
  featured: ResearchMeta[];
  capabilities: Capability[];
  projects: ResearchMeta[];
  papers: WorkingPaper[];
}) {
  const [active, setActive] = useState<View | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <div className="mb-5 flex items-center gap-4 border border-blue-200 bg-blue-50 px-5 py-4 text-blue-950 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blue-700 text-white dark:bg-blue-500 dark:text-slate-950">
          <MousePointerClick className="size-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold">
            Where would you like to start?
          </p>
          <p className="mt-1 text-xs leading-5 text-blue-700 dark:text-blue-300">
            Choose an option below. The research will open here, so you can keep
            exploring without leaving the page.
          </p>
        </div>
      </div>
      <div
        className="grid gap-4 lg:grid-cols-3"
        role="tablist"
        aria-label="Research views"
      >
        {choices.map((choice, index) => {
          const Icon = choice.icon;
          const selected = active === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-expanded={selected}
              aria-controls="research-explorer-panel"
              onClick={() => setActive(selected ? null : choice.id)}
              className={`interactive-surface group relative flex min-h-64 cursor-pointer flex-col overflow-hidden border p-6 text-left sm:p-8 ${selected ? "border-blue-700 bg-blue-700 text-white shadow-xl shadow-blue-950/20 dark:border-blue-300 dark:bg-[#1E3A5F] dark:text-white" : "border-slate-300 bg-white hover:border-blue-600 hover:shadow-xl hover:shadow-slate-950/10 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-blue-400"}`}
            >
              <span
                className={`absolute inset-x-0 top-0 h-1 ${selected ? "bg-white/40 dark:bg-slate-950/30" : choice.accent}`}
                aria-hidden="true"
              />
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`font-mono text-[10px] ${selected ? "text-blue-200" : "text-slate-400"}`}
                >
                  0{index + 1}
                </span>
                {selected ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-[9px] tracking-wider uppercase">
                    <Check className="size-3" aria-hidden="true" /> Open
                  </span>
                ) : (
                  <span
                    className={`grid size-10 place-items-center rounded-full transition-colors ${choice.iconTone}`}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                )}
              </div>
              <h3 className="mt-10 text-2xl font-semibold tracking-[-.035em]">
                {choice.label}
              </h3>
              <p
                className={`mt-3 text-sm leading-6 ${selected ? "text-blue-100" : "text-slate-600 dark:text-slate-400"}`}
              >
                {choice.caption}
              </p>
              <span
                className={`mt-auto flex items-center justify-between gap-4 border-t pt-5 text-sm font-semibold ${selected ? "border-white/25 dark:border-slate-950/20" : `border-slate-200 dark:border-slate-800 ${choice.actionTone}`}`}
              >
                {selected ? "Close this view" : choice.action}
                {selected ? (
                  <X className="size-4" aria-hidden="true" />
                ) : (
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            id="research-explorer-panel"
            role="tabpanel"
            key={active}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {active === "featured" && <FeaturedResearch projects={featured} />}
            {active === "topics" && (
              <ResearchCapabilities
                capabilities={capabilities}
                projects={projects}
              />
            )}
            {active === "progress" && <ResearchProgress papers={papers} />}
          </motion.div>
        )}
      </AnimatePresence>

      {!active && (
        <p className="mt-6 text-center font-mono text-[10px] tracking-[.12em] text-slate-400 uppercase">
          No collection open · select a card above
        </p>
      )}
    </div>
  );
}

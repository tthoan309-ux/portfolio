import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { JournalHeader } from "@/components/journal-header";
import { siteConfig } from "@/data/site";
import { getResearchProject, getResearchProjects } from "@/lib/content";

export function generateStaticParams() {
  return getResearchProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const project = getResearchProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.abstract,
    alternates: { canonical: `/research/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.abstract,
      url: `/research/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.abstract,
    },
  };
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getResearchProject((await params).slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    name: project.title,
    description: project.abstract,
    url: `${siteConfig.url}/research/${project.slug}`,
    about: project.capability,
    funder: undefined,
    member: {
      "@type": "Person",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };

  const evidence = [
    ["Research question", project.researchQuestion],
    ["Contribution", project.contribution],
    ["Methodology", project.methodology],
    ["Dataset", project.dataset],
    ["Main finding", project.findings],
    ["Tools", project.tools],
  ];

  return (
    <>
      <JournalHeader />
      <main id="main-content" className="mx-auto max-w-5xl px-5 py-14 sm:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Link
          href="/#capabilities"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:hover:text-blue-400"
        >
          <ArrowLeft className="size-4" /> All research capabilities
        </Link>
        <header className="mt-10 border-t-2 border-slate-950 pt-7 dark:border-white">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[.12em] uppercase">
            <span className="text-blue-700 dark:text-blue-400">
              {project.capability}
            </span>
            <span className="text-slate-400">
              {project.timeline} · {project.status}
            </span>
          </div>
          <h1 className="mt-8 max-w-4xl text-4xl font-semibold tracking-[-.045em] text-balance sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            {project.abstract}
          </p>
          {(project.repository || project.paper) && (
            <div className="mt-8 flex flex-wrap gap-5 text-sm font-semibold text-blue-700 dark:text-blue-400">
              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Repository <ArrowUpRight className="size-4" />
                </a>
              )}
              {project.paper && <span>{project.paper}</span>}
            </div>
          )}
        </header>

        <section
          className="mt-14 grid border-t border-l border-slate-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-slate-800"
          aria-label="Research evidence summary"
        >
          {evidence.map(([label, value]) => (
            <div
              key={label}
              className="border-r border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
            >
              <h2 className="text-[10px] font-semibold tracking-[.15em] text-slate-400 uppercase">
                {label}
              </h2>
              <p className="mt-3 text-sm leading-6">{value}</p>
            </div>
          ))}
        </section>

        <article className="prose-research mt-16 max-w-3xl border-t border-slate-200 pt-10 dark:border-slate-800">
          <MDXRemote source={project.content} />
        </article>
      </main>
    </>
  );
}

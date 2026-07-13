import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { JournalHeader } from "@/components/journal-header";
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
  };
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getResearchProject((await params).slug);
  if (!project) notFound();
  return (
    <>
      <JournalHeader />
      <main className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
        <header>
          <Badge>{project.status}</Badge>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-.04em] text-balance sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            {project.abstract}
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-800">
            {[
              ["Methodology", project.methodology],
              ["Dataset", project.dataset],
              ["Tools", project.tools],
            ].map(([label, value]) => (
              <div key={label} className="bg-white p-5 dark:bg-slate-950">
                <p className="text-[10px] font-semibold tracking-[.15em] text-slate-400 uppercase">
                  {label}
                </p>
                <p className="mt-3 text-sm leading-6">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </header>
        <article className="prose-research mt-14 border-t border-slate-200 pt-10 dark:border-slate-800">
          <MDXRemote source={project.content} />
        </article>
      </main>
    </>
  );
}

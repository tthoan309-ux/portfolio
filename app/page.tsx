import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ResearchCapabilities } from "@/components/research-capabilities";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import {
  capabilities,
  experience,
  profile,
  publications,
  researchAgenda,
} from "@/data/site";
import { getPosts, getResearchProjects } from "@/lib/content";

function SectionIntro({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-12 grid gap-5 lg:mb-16 lg:grid-cols-[190px_1fr]">
      <div className="flex items-center gap-3 self-start text-xs font-semibold tracking-[.18em] text-slate-400 uppercase">
        <span className="text-blue-700 dark:text-blue-400">{number}</span>
        <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
        {eyebrow}
      </div>
      <div>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-[-.04em] text-balance text-slate-950 sm:text-5xl dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}

export default function Home() {
  const research = getResearchProjects();
  const featured = research.filter((project) => project.featured).slice(0, 4);
  const posts = getPosts();
  const workingPaperSchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: publications.workingPapers[0].title,
    description: publications.workingPapers[0].abstract,
    author: { "@type": "Person", name: profile.fullName },
    creativeWorkStatus: publications.workingPapers[0].status,
    about: ["Energy transition", "Green growth", "Public attention"],
  };

  return (
    <>
      <Header />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(workingPaperSchema).replace(/</g, "\\u003c"),
          }}
        />
        <Hero />

        <section id="current-research" className="section-shell scroll-mt-24">
          <SectionIntro
            number="01"
            eyebrow="Current research"
            title="An evolving agenda for technological and institutional change."
            description="These are research directions rather than a list of completed projects. They define the questions, evidence, and infrastructure I am building toward."
          />
          <div className="grid border-t border-l border-slate-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-slate-800">
            {researchAgenda.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 0.035}
                className="min-h-64 border-r border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] text-slate-400">
                    A/{String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-semibold tracking-[.12em] text-teal-700 uppercase dark:text-teal-400">
                    {item.stage}
                  </span>
                </div>
                <h3 className="mt-12 text-xl font-semibold tracking-[-.025em]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {item.framing}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="capabilities"
          className="section-shell scroll-mt-24 border-y border-slate-200/70 bg-slate-100/55 dark:border-slate-800/70 dark:bg-slate-900/30"
        >
          <SectionIntro
            number="02"
            eyebrow="Research capabilities"
            title="Capabilities first. Case studies as evidence."
            description="Six connected domains describe how I move from an economic question to a reproducible analytical result. Expand any case study to inspect its research design."
          />
          <ResearchCapabilities
            capabilities={capabilities}
            projects={research}
          />
        </section>

        <section id="case-studies" className="section-shell scroll-mt-24">
          <SectionIntro
            number="03"
            eyebrow="Featured case studies"
            title="Selected empirical systems, documented end to end."
            description="Each case study states the question, analytical contribution, evidence base, evaluation, and current research status."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {featured.map((project, index) => (
              <Reveal
                key={project.slug}
                delay={index * 0.05}
                className="group flex flex-col border-t-2 border-slate-950 bg-white py-7 dark:border-white dark:bg-slate-950"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-[10px] tracking-[.12em] text-blue-700 uppercase dark:text-blue-400">
                    {project.capability}
                  </p>
                  <p className="shrink-0 font-mono text-[10px] text-slate-400">
                    {project.timeline}
                  </p>
                </div>
                <h3 className="mt-7 text-2xl font-semibold tracking-[-.035em]">
                  {project.title}
                </h3>
                <dl className="mt-7 grid gap-6 border-y border-slate-200 py-6 sm:grid-cols-2 dark:border-slate-800">
                  {[
                    ["Research question", project.researchQuestion],
                    ["Contribution", project.contribution],
                    ["Method", project.methodology],
                    ["Dataset", project.dataset],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[10px] font-semibold tracking-[.14em] text-slate-400 uppercase">
                        {label}
                      </dt>
                      <dd className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6">
                  <p className="text-[10px] font-semibold tracking-[.14em] text-slate-400 uppercase">
                    Result / current evidence
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {project.findings}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-7">
                  <div>
                    <p className="font-mono text-[10px] text-slate-400">
                      {project.tools}
                    </p>
                    <p className="mt-2 text-xs font-medium text-teal-700 dark:text-teal-400">
                      {project.status}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {project.repository && (
                      <a
                        href={project.repository}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:text-slate-300"
                        aria-label={`Open ${project.title} repository on GitHub`}
                      >
                        GitHub <ArrowUpRight className="size-4" />
                      </a>
                    )}
                    <Link
                      href={`/research/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:text-blue-400"
                    >
                      Read case study
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="section-shell scroll-mt-24 border-y border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-900/25"
        >
          <SectionIntro
            number="04"
            eyebrow="Experience"
            title="Research practice shaped through analytical responsibility and collaboration."
          />
          <div className="grid gap-14 lg:grid-cols-[1.25fr_.75fr]">
            <div className="border-t border-slate-300 dark:border-slate-700">
              {[...experience.leadership, ...experience.experience].map(
                (item, index) => (
                  <Reveal
                    key={`${item.organization}-${item.role}`}
                    delay={index * 0.04}
                    className="grid gap-4 border-b border-slate-200 py-7 sm:grid-cols-[90px_1fr] dark:border-slate-800"
                  >
                    <p className="font-mono text-[10px] text-slate-400 uppercase">
                      {item.period}
                    </p>
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-xl font-semibold tracking-[-.02em]">
                          {item.role}
                        </h3>
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                          {item.organization}
                        </p>
                      </div>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                ),
              )}
            </div>

            <Reveal className="border-t-2 border-slate-950 pt-6 dark:border-white">
              <div className="flex items-center gap-3 text-xs font-semibold tracking-[.14em] text-slate-400 uppercase">
                <GraduationCap className="size-4" /> Education
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-.03em]">
                {profile.degree}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {profile.university} · {profile.program}
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800">
                <div className="bg-white p-4 dark:bg-slate-950">
                  <dt className="text-[10px] text-slate-400 uppercase">
                    Graduation
                  </dt>
                  <dd className="mt-2 font-semibold">
                    {profile.expectedGraduation}
                  </dd>
                </div>
                <div className="bg-white p-4 dark:bg-slate-950">
                  <dt className="text-[10px] text-slate-400 uppercase">GPA</dt>
                  <dd className="mt-2 font-semibold">{profile.gpa}</dd>
                </div>
              </dl>
              <div className="mt-7 space-y-3">
                {profile.coursework.map((course) => (
                  <div
                    key={course.name}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span className="text-slate-600 dark:text-slate-400">
                      {course.name}
                    </span>
                    <span className="font-mono text-xs">{course.score}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="publications" className="section-shell scroll-mt-24">
          <SectionIntro
            number="05"
            eyebrow="Publications"
            title="Work in progress, with the research stage made explicit."
          />
          {publications.workingPapers.map((paper) => (
            <Reveal
              key={paper.title}
              className="grid gap-8 border-y border-slate-300 py-8 lg:grid-cols-[1.15fr_.85fr] dark:border-slate-700"
            >
              <div>
                <p className="text-xs font-semibold tracking-[.15em] text-blue-700 uppercase dark:text-blue-400">
                  Working paper
                </p>
                <h3 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-.035em]">
                  {paper.title}
                </h3>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {paper.abstract}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xs">
                  <span className="text-teal-700 dark:text-teal-400">
                    {paper.status}
                  </span>
                  <span className="text-slate-500">
                    Expected submission: {paper.expectedSubmission}
                  </span>
                </div>
              </div>
              <div>
                <p className="mb-4 text-[10px] font-semibold tracking-[.14em] text-slate-400 uppercase">
                  Research progress
                </p>
                <ol className="space-y-3">
                  {paper.stages.map((stage, index) => (
                    <li
                      key={stage.label}
                      className="flex items-center gap-4 border-b border-slate-200 pb-3 text-sm dark:border-slate-800"
                    >
                      <span
                        className={`grid size-6 place-items-center rounded-full font-mono text-[9px] ${stage.status === "active" ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-400 dark:bg-slate-900"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{stage.label}</span>
                      <span className="font-mono text-[9px] tracking-wider text-slate-400 uppercase">
                        {stage.status}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </section>

        <section className="section-shell border-y border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-900/25">
          <SectionIntro
            number="06"
            eyebrow="Research notes"
            title="Essays, methods, and arguments under development."
            description="Short-form research writing used to clarify assumptions, measurement choices, and emerging questions."
          />
          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.035}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-5 py-8 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none sm:grid-cols-[150px_1fr_auto]"
                >
                  <div className="font-mono text-[10px] leading-5 tracking-[.1em] text-slate-400 uppercase">
                    {post.category}
                    <br />
                    {post.date}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-.03em] group-hover:text-blue-700 dark:group-hover:text-blue-400">
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {post.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 size-5 text-slate-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-right">
            <Button asChild variant="outline">
              <Link href="/blog">
                Browse all research notes <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="contact" className="section-shell scroll-mt-24">
          <Reveal className="grid gap-12 border-t-2 border-slate-950 pt-10 lg:grid-cols-[1fr_auto] lg:items-end dark:border-white">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[.16em] text-slate-400 uppercase">
                <MapPin className="size-3.5" /> Hanoi, Vietnam
              </p>
              <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-.045em] text-balance sm:text-6xl">
                Open to research collaboration, graduate opportunities, and
                serious empirical questions.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
                The most useful conversations begin with a research question, a
                difficult dataset, or a methodological problem worth examining
                carefully.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:max-w-xs lg:justify-end">
              <Button asChild variant="outline">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="size-4" /> Email
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button asChild>
                <a href="/marcuz-cv.pdf" download>
                  <Download className="size-4" /> Download CV
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Github className="size-4" /> GitHub
                </a>
              </Button>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 text-xs text-slate-500 sm:grid-cols-[1fr_auto] sm:items-end lg:px-8">
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              {profile.fullName}
            </p>
            <p className="mt-2 max-w-md leading-5">
              Computational economics · econometrics · research systems
            </p>
            <p className="mt-5">
              © 2026–2027. Personal academic research website.
            </p>
          </div>
          <nav
            className="flex flex-wrap gap-x-5 gap-y-3 sm:justify-end"
            aria-label="Research profiles and contact"
          >
            <a href={`mailto:${profile.email}`} className="hover:text-blue-700">
              Email
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-700"
            >
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-700"
            >
              GitHub
            </a>
            <span aria-label="Google Scholar profile forthcoming">
              Google Scholar
            </span>
            <a
              href={profile.orcid}
              target="_blank"
              rel="me noreferrer"
              className="hover:text-blue-700"
              aria-label="ORCID profile 0009-0007-6229-8585"
            >
              ORCID
            </a>
            <a href="/marcuz-cv.pdf" className="hover:text-blue-700">
              CV
            </a>
            <Link href="/rss.xml" className="hover:text-blue-700">
              RSS
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}

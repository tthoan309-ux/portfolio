import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  Database,
  Download,
  GraduationCap,
  Languages,
  MapPin,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ResearchGrid } from "@/components/research-grid";
import { Reveal } from "@/components/reveal";
import { SkillGraph } from "@/components/skill-graph";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  activities,
  experience,
  profile,
  publications,
  siteConfig,
  skills,
} from "@/data/site";
import { getPosts, getResearchProjects } from "@/lib/content";

const interestIcons = [
  BrainCircuit,
  ChartNoAxesCombined,
  BookOpen,
  Sparkles,
  Network,
  Database,
  ShieldCheck,
];

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
        <span className="text-blue-600 dark:text-blue-400">{number}</span>
        <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
        {eyebrow}
      </div>
      <div>
        <h2 className="max-w-4xl text-3xl font-semibold tracking-[-.035em] text-balance text-slate-950 sm:text-5xl dark:text-white">
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
  const posts = getPosts();
  return (
    <>
      <Header />
      <main>
        <Hero />

        <section id="about" className="section-shell scroll-mt-24">
          <SectionIntro
            number="01"
            eyebrow="Profile"
            title="Rigorous methods for questions that cross disciplinary boundaries."
          />
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <Reveal>
              <p className="text-2xl leading-10 tracking-[-.02em] text-slate-700 dark:text-slate-200">
                {profile.statement}
              </p>
              <p className="mt-6 leading-7 text-slate-600 dark:text-slate-400">
                As a student in FTU’s High Quality Program, I am preparing for
                graduate study and international research opportunities by
                building a foundation across quantitative economics, computing,
                and public policy.
              </p>
            </Reveal>
            <Reveal
              delay={0.1}
              className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800"
            >
              {[
                ["Location", profile.location, MapPin],
                ["University", profile.university, GraduationCap],
                ["Graduation", profile.expectedGraduation, BookOpen],
                ["GPA", profile.gpa, ChartNoAxesCombined],
                ["Program", profile.program, Sparkles],
                ["Languages", "Vietnamese · English", Languages],
              ].map(([label, value, Icon]) => {
                const InfoIcon = Icon as typeof MapPin;
                return (
                  <div
                    key={label as string}
                    className="bg-white p-5 dark:bg-slate-950"
                  >
                    <InfoIcon className="size-4 text-blue-600 dark:text-blue-400" />
                    <p className="mt-5 text-[10px] font-semibold tracking-[.16em] text-slate-400 uppercase">
                      {label as string}
                    </p>
                    <p className="mt-1.5 text-sm font-medium">
                      {value as string}
                    </p>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>

        <section
          id="education"
          className="section-shell scroll-mt-24 border-y border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-900/30"
        >
          <SectionIntro
            number="02"
            eyebrow="Education"
            title="International Economics at Foreign Trade University."
          />
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
            <Reveal className="rounded-3xl bg-slate-950 p-8 text-white">
              <p className="text-xs font-semibold tracking-[.18em] text-blue-400 uppercase">
                {profile.program}
              </p>
              <h3 className="mt-8 text-3xl font-semibold tracking-tight">
                {profile.degree}
              </h3>
              <p className="mt-3 text-slate-300">{profile.university}</p>
              <div className="mt-12 flex gap-10 border-t border-white/10 pt-6">
                <div>
                  <p className="text-xs text-slate-400">Expected graduation</p>
                  <p className="mt-2 text-xl font-semibold">
                    {profile.expectedGraduation}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Current GPA</p>
                  <p className="mt-2 text-xl font-semibold">{profile.gpa}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mb-6 text-xs font-semibold tracking-[.18em] text-slate-400 uppercase">
                Relevant coursework
              </p>
              <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                {profile.coursework.map((course) => (
                  <div
                    key={course.name}
                    className="flex items-center justify-between py-5"
                  >
                    <span className="font-medium">{course.name}</span>
                    <span className="font-mono text-sm text-blue-600 dark:text-blue-400">
                      {course.score}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-shell">
          <SectionIntro
            number="03"
            eyebrow="Research interests"
            title="Economics, computation, and institutions—studied together."
            description="A research agenda spanning applied economics, intelligent systems, sustainable growth, and the infrastructure of public decision-making."
          />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-slate-800 dark:bg-slate-800">
            {skills.interests.map((interest, index) => {
              const Icon = interestIcons[index % interestIcons.length];
              return (
                <Reveal
                  key={interest}
                  delay={(index % 6) * 0.03}
                  className="group flex min-h-40 flex-col justify-between bg-white p-6 transition-colors hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900"
                >
                  <Icon className="size-5 text-slate-400 transition-colors group-hover:text-blue-600" />
                  <div className="mt-10 flex items-end justify-between gap-3">
                    <h3 className="font-semibold tracking-tight">{interest}</h3>
                    <span className="font-mono text-[10px] text-slate-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section
          id="research"
          className="section-shell scroll-mt-24 border-y border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-900/30"
        >
          <SectionIntro
            number="04"
            eyebrow="Featured research"
            title="From economic questions to transparent analytical systems."
            description="Search across methods, datasets, tools, and research themes. Every case study is stored as an independent MDX record."
          />
          <ResearchGrid projects={research} />
        </section>

        <section id="experience" className="section-shell scroll-mt-24">
          <SectionIntro
            number="05"
            eyebrow="Experience & leadership"
            title="Research communities are part of the research infrastructure."
          />
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="mb-6 text-xs font-semibold tracking-[.18em] text-slate-400 uppercase">
                Experience
              </p>
              {experience.experience.map((item, index) => (
                <Reveal
                  key={item.organization}
                  delay={index * 0.05}
                  className="relative border-l border-slate-200 pb-9 pl-7 last:pb-0 dark:border-slate-800"
                >
                  <span className="absolute top-1 left-0 size-2.5 -translate-x-1/2 rounded-full bg-blue-600 ring-4 ring-slate-50 dark:ring-slate-950" />
                  <p className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                    {item.type}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">
                    {item.organization}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                    {item.role}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </div>
            <div>
              <p className="mb-6 text-xs font-semibold tracking-[.18em] text-slate-400 uppercase">
                Leadership
              </p>
              {experience.leadership.map((item) => (
                <Reveal
                  key={item.organization}
                  className="rounded-3xl bg-slate-900 p-8 text-white dark:bg-white dark:text-slate-950"
                >
                  <Badge className="border-blue-400/30 bg-blue-400/10 text-blue-300 dark:text-blue-700">
                    Latest role
                  </Badge>
                  <h3 className="mt-12 text-4xl font-semibold tracking-tight">
                    {item.role}
                  </h3>
                  <p className="mt-3 text-lg text-slate-300 dark:text-slate-600">
                    {item.organization}
                  </p>
                  <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-6 text-slate-400 dark:border-slate-200 dark:text-slate-500">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell border-y border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-900/30">
          <SectionIntro
            number="06"
            eyebrow="Publications"
            title="Work in progress, organized with academic clarity."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Working Papers", publications.workingPapers],
              ["Conference Papers", publications.conferencePapers],
              ["Research Notes", publications.researchNotes],
            ].map(([label, items]) => (
              <Reveal
                key={label as string}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <p className="font-mono text-xs text-blue-600 dark:text-blue-400">
                  {label as string}
                </p>
                <div className="mt-8">
                  {(items as Array<{ title: string; status: string }>)
                    .length ? (
                    (items as Array<{ title: string; status: string }>).map(
                      (item) => (
                        <div key={item.title}>
                          <h3 className="leading-6 font-semibold">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-xs text-slate-500">
                            {item.status}
                          </p>
                        </div>
                      ),
                    )
                  ) : (
                    <p className="text-sm leading-6 text-slate-500">
                      No items listed.
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="skills" className="section-shell scroll-mt-24">
          <SectionIntro
            number="07"
            eyebrow="Methods & tools"
            title="A connected research toolkit—not a set of progress bars."
          />
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {skills.categories.map((category, index) => (
                <Reveal
                  key={category.name}
                  delay={index * 0.05}
                  className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50"
                >
                  <h3 className="font-semibold">{category.name}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <SkillGraph />
            </Reveal>
          </div>
        </section>

        <section className="section-shell border-y border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-900/30">
          <SectionIntro
            number="08"
            eyebrow="Academic activities"
            title="Competitions, workshops, summer schools, and conferences."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activities.map((activity, index) => (
              <Reveal
                key={activity.category}
                delay={index * 0.05}
                className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
              >
                <p className="font-mono text-[10px] text-slate-400">
                  A/{String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-10 font-semibold">{activity.category}</h3>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  {activity.status}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-shell">
          <SectionIntro
            number="09"
            eyebrow="Field notes"
            title="Ideas in progress, written for scrutiny."
          />
          <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.04}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-4 py-7 sm:grid-cols-[140px_1fr_auto]"
                >
                  <div>
                    <Badge>{post.category}</Badge>
                    <p className="mt-2 text-xs text-slate-400">{post.date}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {post.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {post.excerpt}
                    </p>
                  </div>
                  <ArrowRight className="size-5 text-slate-400 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-7 text-right">
            <Button asChild variant="outline">
              <Link href="/blog">
                Browse all notes <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="contact" className="section-shell scroll-mt-24">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-white sm:px-12 lg:px-16 lg:py-20">
            <div className="hero-grid absolute inset-0 opacity-10" />
            <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-semibold tracking-[.18em] text-blue-400 uppercase">
                  Hanoi · Vietnam
                </p>
                <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-.04em] text-balance sm:text-6xl">
                  Open to graduate research and international collaboration.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">
                  Research interests include quantitative economics,
                  econometrics, machine learning, innovation systems, climate
                  economics, and public policy.
                </p>
              </div>
              <Button
                asChild
                className="bg-white text-slate-950 hover:bg-blue-400"
              >
                <a href="/marcuz-cv.pdf" download>
                  Download CV <Download className="size-4" />
                </a>
              </Button>
            </div>
            <div className="relative mt-12 border-t border-white/10 pt-6 text-xs text-slate-500">
              {profile.fullName} · {profile.position} · {profile.university}
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 {profile.fullName}. Built as a personal research lab.</p>
          <div className="flex gap-5">
            <Link href="/rss.xml">RSS</Link>
            <Link href="/blog">Writing</Link>
            <a href="/marcuz-cv.pdf">CV</a>
          </div>
        </div>
      </footer>
    </>
  );
}

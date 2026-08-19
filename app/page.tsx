import {
  Award,
  ArrowUpRight,
  Eye,
  Github,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { BackgroundMotif } from "@/components/background-motif";
import { CannonMark } from "@/components/cannon-mark";
import { CompetencyLab } from "@/components/competency-lab";
import { CvTextTrigger, CvTrigger } from "@/components/cv-viewer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ResearchExplorer } from "@/components/research-explorer";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import {
  appliedWork,
  capabilities,
  competencies,
  experience,
  profile,
  publications,
} from "@/data/site";
import { getResearchProjects } from "@/lib/content";

function SectionIntro({
  number,
  eyebrow,
  title,
  description,
  tone = "blue",
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "navy" | "blue" | "teal" | "gold";
}) {
  return (
    <Reveal className="mb-11 grid gap-5 lg:mb-14 lg:grid-cols-[190px_1fr]">
      <div className={`section-kicker tone-${tone} self-start`}>
        <span className="text-blue-700 dark:text-blue-400">{number}</span>
        <span>{eyebrow}</span>
      </div>
      <div>
        <h2 className="max-w-4xl text-3xl leading-[1.05] font-semibold tracking-[-.045em] text-balance text-slate-950 sm:text-5xl dark:text-white">
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
  const researchInPreparationSchema = publications.workingPapers.map(
    (paper) => ({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      headline: paper.title,
      description: paper.abstract,
      author: { "@type": "Person", name: profile.fullName },
      creativeWorkStatus: paper.status,
    }),
  );

  return (
    <>
      <Header />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(researchInPreparationSchema).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
        <Hero />

        <section
          id="education"
          className="ambient-section ambient-gold section-shell scroll-mt-24"
        >
          <BackgroundMotif variant="education" />
          <SectionIntro
            number="01"
            eyebrow="Education"
            title="International Economics at Foreign Trade University"
            tone="gold"
          />
          <Reveal className="editorial-surface grid gap-10 border-t-2 border-t-amber-700 p-6 sm:p-8 lg:grid-cols-[1.15fr_.85fr] lg:p-10 dark:border-t-amber-400">
            <div>
              <div className="flex items-center gap-5">
                <div className="grid size-20 shrink-0 place-items-center rounded-full bg-white p-1.5 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
                  <Image
                    src="/images/ftu-logo.png"
                    alt="Foreign Trade University logo"
                    width={72}
                    height={72}
                    className="size-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 text-xs font-semibold tracking-[.14em] text-slate-400 uppercase">
                    <GraduationCap className="size-4" /> Education
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                    Foreign Trade University
                  </p>
                </div>
              </div>
              <h3 className="mt-7 text-3xl font-semibold tracking-[-.035em]">
                {profile.degree}
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                {profile.program} · Faculty of {profile.faculty}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                {profile.college}
              </p>
              <dl className="mt-8 grid max-w-xl grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800">
                <div className="bg-white p-5 dark:bg-slate-950">
                  <dt className="text-[10px] text-slate-400 uppercase">
                    Expected graduation
                  </dt>
                  <dd className="mt-2 font-semibold">
                    {profile.expectedGraduation}
                  </dd>
                </div>
                <div className="bg-white p-5 dark:bg-slate-950">
                  <dt className="text-[10px] text-slate-400 uppercase">GPA</dt>
                  <dd className="mt-2 font-semibold">{profile.gpa}</dd>
                </div>
              </dl>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-[.14em] text-slate-400 uppercase">
                Academic scholarships
              </p>
              <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                {profile.scholarships.map((scholarship) => (
                  <div
                    key={scholarship.period}
                    className="grid grid-cols-[28px_1fr] gap-3 py-4"
                  >
                    <Award
                      className="mt-0.5 size-4 text-amber-700 dark:text-amber-400"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-medium">{scholarship.name}</p>
                      <p className="mt-1 font-mono text-[11px] text-amber-700 dark:text-amber-400">
                        {scholarship.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[10px] font-semibold tracking-[.14em] text-slate-400 uppercase">
                Relevant coursework
              </p>
              <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                {profile.coursework.map((course) => (
                  <div
                    key={course.name}
                    className="flex justify-between gap-4 py-4 text-sm"
                  >
                    <span className="text-slate-600 dark:text-slate-400">
                      {course.name}
                    </span>
                    <span className="font-mono text-xs">{course.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section
          id="research"
          className="ambient-section ambient-blue section-shell scroll-mt-24 border-y border-slate-200/70 bg-[#f3f7fb] dark:border-slate-800/70 dark:bg-[#061022]"
        >
          <BackgroundMotif variant="research" />
          <SectionIntro
            number="02"
            eyebrow="Research"
            title="A closer look at my research"
            description="New to my work? Start with a short selection of completed studies. You can also browse by topic or see the questions I am currently developing."
            tone="blue"
          />
          <ResearchExplorer
            featured={featured}
            capabilities={capabilities}
            projects={research}
            papers={publications.workingPapers}
          />
        </section>

        <section
          id="competencies"
          className="ambient-section ambient-teal section-shell scroll-mt-24 bg-[#f3faf9] dark:bg-[#041412]"
        >
          <BackgroundMotif variant="capabilities" />
          <SectionIntro
            number="03"
            eyebrow="Capabilities"
            title="How I work across economics, data, and computation"
            description="Alongside academic research, I build predictive models, dashboards, and data products. The projects and map below show where I have applied these skills and how they support my research practice."
            tone="teal"
          />
          <CompetencyLab
            competencies={competencies}
            appliedWork={appliedWork}
          />
        </section>

        <section
          id="experience"
          className="ambient-section ambient-navy section-shell scroll-mt-24 border-y border-slate-200/70 bg-[#fbfaf6] dark:border-slate-800/70 dark:bg-[#0d1119]"
        >
          <SectionIntro
            number="04"
            eyebrow="Experience"
            title="Academic and research experience"
            description={experience.intro}
            tone="navy"
          />
          <div className="border-t border-slate-300 dark:border-slate-700">
            {[...experience.leadership, ...experience.experience].map(
              (item, index) => (
                <Reveal
                  key={`${item.organization}-${item.role}`}
                  delay={index * 0.04}
                  className="timeline-entry grid gap-4 border-b border-slate-200 py-7 sm:grid-cols-[110px_1fr] dark:border-slate-800"
                >
                  <p className="font-mono text-[10px] text-slate-400 uppercase">
                    {item.period}
                  </p>
                  <div>
                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,.85fr)] lg:items-center">
                      <h3 className="text-xl font-semibold tracking-[-.02em]">
                        {item.role}
                      </h3>
                      <div className="flex items-center gap-3 lg:justify-end">
                        <span className="relative grid h-14 w-24 shrink-0 place-items-center overflow-hidden border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700">
                          <Image
                            src={item.logo}
                            alt={`${item.organization} logo`}
                            fill
                            sizes="96px"
                            className="object-contain p-1.5"
                            style={{ transform: `scale(${item.logoScale})` }}
                          />
                        </span>
                        <p className="max-w-xs text-sm font-medium text-blue-700 lg:text-right dark:text-blue-400">
                          {item.organization}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </section>

        <section
          id="contact"
          className="ambient-section ambient-blue section-shell scroll-mt-24"
        >
          <BackgroundMotif variant="contact" />
          <Reveal className="grid gap-12 border-t-2 border-slate-950 pt-10 lg:grid-cols-[1fr_auto] lg:items-end dark:border-white">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[.16em] text-slate-400 uppercase">
                <MapPin className="size-3.5" /> Hanoi, Vietnam
              </p>
              <h2 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-.045em] text-balance sm:text-6xl">
                Research collaboration and graduate opportunities
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
                I welcome conversations about empirical economics, research
                data, and graduate study.
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
              <CvTrigger variant="default">
                <Eye className="size-4" /> View CV
              </CvTrigger>
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
              International trade · firm-level data · research systems
            </p>
            <p className="mt-5">
              © 2026–2027. Personal academic research website.
            </p>
            <div
              className="mt-5 inline-flex items-center gap-2.5 text-[10px] tracking-[.08em] text-slate-400 uppercase"
              aria-label="Personal detail: Come On You Gunners"
            >
              <CannonMark className="cannon-footer w-10" />
              <span>COYG</span>
            </div>
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
            <a
              href={profile.orcid}
              target="_blank"
              rel="me noreferrer"
              className="hover:text-blue-700"
              aria-label="ORCID profile 0009-0007-6229-8585"
            >
              ORCID
            </a>
            <CvTextTrigger>CV</CvTextTrigger>
          </nav>
        </div>
      </footer>
    </>
  );
}

"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, Eye, Linkedin } from "lucide-react";
import { CvTrigger } from "@/components/cv-viewer";
import { CannonMark } from "@/components/cannon-mark";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/site";

const snapshot: Array<[string, string | string[]]> = [
  [
    "Current focus",
    "Trade adjustment and firm-level responses to economic shocks",
  ],
  [
    "Research areas",
    [
      "International trade",
      "Development economics",
      "Firm-level analysis",
      "Panel econometrics",
      "Research data engineering",
    ],
  ],
  ["Expected graduation", profile.expectedGraduation],
  ["Current GPA", profile.gpa],
];

const researchLogic = [
  ["Research lens", "Economic adjustment"],
  ["Evidence", "Trade & firm panels"],
  ["Approach", "Econometrics + ML"],
] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 55, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 55, damping: 24 });
  const fieldX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const fieldY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-slate-200/70 pt-[4.5rem] dark:border-slate-800/70"
      aria-labelledby="hero-title"
      onPointerMove={(event) => {
        if (reduceMotion) return;
        pointerX.set(event.clientX / window.innerWidth - 0.5);
        pointerY.set(event.clientY / window.innerHeight - 0.5);
      }}
    >
      <div
        className="research-field absolute inset-0 opacity-70 dark:opacity-30"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: fieldX, y: fieldY }}
        className="absolute top-[16%] right-[8%] size-64 rounded-full bg-blue-600/6 blur-3xl dark:bg-blue-400/8"
        aria-hidden="true"
      />
      <svg
        className="pointer-events-none absolute top-[9%] left-[42%] hidden h-[56%] w-[33%] text-blue-700/25 lg:block dark:text-blue-300/20"
        viewBox="0 0 420 520"
        fill="none"
        aria-hidden="true"
      >
        <g className="constellation-line" stroke="currentColor" strokeWidth="1">
          <path d="M32 92 146 46 248 108 373 54" />
          <path d="m146 46 18 156 84-94 62 126 63-180" />
          <path d="M32 92 88 274l76-72 102 122 44-90" />
          <path d="m88 274 42 164 136-114 108 92" />
          <path d="m164 202 210 214" />
        </g>
        <g fill="currentColor">
          <circle cx="32" cy="92" r="4" />
          <circle cx="146" cy="46" r="5" />
          <circle cx="248" cy="108" r="3" />
          <circle cx="373" cy="54" r="4" />
          <circle cx="164" cy="202" r="4" />
          <circle cx="310" cy="234" r="5" />
          <circle cx="88" cy="274" r="3" />
          <circle cx="266" cy="324" r="4" />
          <circle cx="130" cy="438" r="5" />
          <circle cx="374" cy="416" r="4" />
        </g>
        <circle
          cx="310"
          cy="234"
          r="14"
          className="stroke-teal-500/40"
          strokeWidth="1"
        />
        <circle
          cx="130"
          cy="438"
          r="11"
          className="stroke-amber-500/40"
          strokeWidth="1"
        />
      </svg>

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[minmax(0,1.28fr)_minmax(340px,.72fr)] lg:items-center lg:gap-16 lg:px-8 lg:py-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold tracking-[.17em] text-slate-500 uppercase dark:text-slate-400">
            <span
              className="size-2 rounded-full bg-teal-500"
              aria-hidden="true"
            />
            This portfolio belongs to
          </div>
          <h1
            id="hero-title"
            className="max-w-4xl text-[clamp(3.65rem,8.2vw,7rem)] leading-[.86] font-semibold tracking-[-.065em] text-slate-950 dark:text-white"
          >
            Trần Thuận
            <br />
            Hoàn
          </h1>
          <p className="mt-7 text-xl font-medium tracking-[-.02em] text-blue-700 sm:text-2xl dark:text-blue-400">
            Undergraduate Researcher
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 tracking-[-.015em] text-slate-600 sm:text-xl dark:text-slate-300">
            {profile.headline}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
            {profile.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#research">
                Open research archive <ArrowDown className="size-4" />
              </a>
            </Button>
            <CvTrigger variant="outline">
              View CV <Eye className="size-4" />
            </CvTrigger>
            <Button asChild variant="ghost">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Marcuz's LinkedIn profile"
              >
                LinkedIn <Linkedin className="size-4" />
              </a>
            </Button>
          </div>
          <div
            className="mt-8 grid max-w-2xl grid-cols-3 border-y border-slate-300 dark:border-slate-700"
            aria-label="Research approach summary"
          >
            {researchLogic.map(([label, value], index) => (
              <div
                key={label}
                className="border-r border-slate-200 px-3 py-4 first:pl-0 last:border-r-0 sm:px-5 dark:border-slate-800"
              >
                <div className="flex items-center gap-2 font-mono text-[8px] tracking-[.1em] text-slate-400 uppercase">
                  <span
                    className={`size-1.5 rounded-full ${index === 0 ? "bg-[#1E3A5F] dark:bg-blue-300" : index === 1 ? "bg-teal-600 dark:bg-teal-400" : "bg-amber-600 dark:bg-amber-400"}`}
                    aria-hidden="true"
                  />
                  {label}
                </div>
                <p className="mt-2 text-[11px] leading-4 font-medium text-slate-700 sm:text-xs dark:text-slate-300">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="editorial-surface border-t-2 border-t-slate-950 bg-white/86 p-4 shadow-[0_24px_70px_-48px_rgba(15,23,42,.45)] lg:p-5 dark:border-t-white dark:bg-slate-950/78"
          aria-label="Research snapshot"
        >
          <figure>
            <div className="relative aspect-square overflow-hidden bg-slate-200 dark:bg-slate-800">
              <Image
                src="/images/tran-thuan-hoan-portrait.jpg"
                alt="Portrait of Trần Thuận Hoàn"
                fill
                priority
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 70vw, 100vw"
                className="object-cover object-[center_32%]"
              />
            </div>
            <figcaption className="flex items-center justify-between border-b border-slate-200 py-3 font-mono text-[9px] tracking-[.08em] text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400">
              <span>Trần Thuận Hoàn</span>
              <span className="flex items-center gap-2.5">
                <span
                  role="img"
                  aria-label="Personal detail: Arsenal supporter"
                  title="A small North London detail"
                >
                  <CannonMark className="w-9 opacity-80" />
                </span>
                <span>Hanoi, Vietnam</span>
              </span>
            </figcaption>
          </figure>
          <div className="flex items-center justify-between border-b border-slate-200 py-4 dark:border-slate-800">
            <h2 className="text-sm font-semibold tracking-[.14em] uppercase">
              Research snapshot
            </h2>
            <span className="font-mono text-[10px] text-slate-400">
              2026 / 08
            </span>
          </div>
          <dl className="divide-y divide-slate-200 dark:divide-slate-800">
            {snapshot.map(([label, value]) => (
              <div
                key={label}
                className={`gap-4 py-3.5 ${Array.isArray(value) ? "block" : "grid grid-cols-[105px_1fr]"}`}
              >
                <dt className="text-xs leading-5 text-slate-500">{label}</dt>
                {Array.isArray(value) ? (
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {value.map((area) => (
                      <span
                        key={area}
                        className="border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] leading-4 font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                      >
                        {area}
                      </span>
                    ))}
                  </dd>
                ) : (
                  <dd className="text-sm leading-5 font-medium">{value}</dd>
                )}
              </div>
            ))}
          </dl>
          <div className="flex items-center gap-3 border-t border-slate-200 pt-4 pb-1 text-sm font-medium text-teal-700 dark:border-slate-800 dark:text-teal-400">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="relative inline-flex size-2 rounded-full bg-teal-500" />
            </span>
            Open for research collaboration
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

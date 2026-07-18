"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/site";

const snapshot = [
  ["Current status", "Undergraduate researcher"],
  ["Current focus", "Energy transition, green growth & public attention"],
  ["Research areas", "Computational economics · ML · data systems"],
  ["Expected graduation", profile.expectedGraduation],
  ["Current GPA", profile.gpa],
];

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
      className="relative flex min-h-[94svh] items-center overflow-hidden border-b border-slate-200/70 pt-20 dark:border-slate-800/70"
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

      <div className="relative mx-auto grid w-full max-w-7xl gap-16 px-5 py-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(330px,.7fr)] lg:items-center lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-10 flex items-center gap-3 text-xs font-semibold tracking-[.17em] text-slate-500 uppercase dark:text-slate-400">
            <span
              className="size-2 rounded-full bg-teal-500"
              aria-hidden="true"
            />
            Hanoi · International Economics
          </div>
          <h1
            id="hero-title"
            className="max-w-4xl text-[clamp(3.7rem,9vw,7.4rem)] leading-[.86] font-semibold tracking-[-.065em] text-slate-950 dark:text-white"
          >
            Tran Thuan
            <br />
            Hoan
          </h1>
          <p className="mt-8 text-xl font-medium tracking-[-.02em] text-blue-700 sm:text-2xl dark:text-blue-400">
            Undergraduate Researcher
          </p>
          <p className="text-slate-650 mt-6 max-w-2xl text-xl leading-8 tracking-[-.015em] text-slate-600 dark:text-slate-300">
            {profile.headline}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
            {profile.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#current-research">
                Current research <ArrowDown className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="/marcuz-cv.pdf" download>
                Download CV <Download className="size-4" />
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.7 }}
          className="border-t-2 border-slate-950 bg-white/80 dark:border-white dark:bg-slate-950/70"
          aria-label="Research snapshot"
        >
          <div className="flex items-center justify-between border-b border-slate-200 py-5 dark:border-slate-800">
            <h2 className="text-sm font-semibold tracking-[.14em] uppercase">
              Research snapshot
            </h2>
            <span className="font-mono text-[10px] text-slate-400">
              2026 / 07
            </span>
          </div>
          <dl className="divide-y divide-slate-200 dark:divide-slate-800">
            {snapshot.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[115px_1fr] gap-5 py-4"
              >
                <dt className="text-xs leading-5 text-slate-500">{label}</dt>
                <dd className="text-sm leading-5 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-2 flex items-center gap-3 border-t border-slate-200 py-5 text-sm font-medium text-teal-700 dark:border-slate-800 dark:text-teal-400">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-400 opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-teal-500" />
            </span>
            Open for research collaboration
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

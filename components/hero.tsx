"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/site";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 20 });
  const blobX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const blobY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  return (
    <section
      className="relative flex min-h-[92svh] items-center overflow-hidden border-b border-slate-200/70 pt-24 dark:border-slate-800/70"
      onPointerMove={(event) => {
        if (reduceMotion) return;
        x.set(event.clientX / window.innerWidth - 0.5);
        y.set(event.clientY / window.innerHeight - 0.5);
      }}
    >
      <div
        className="hero-grid absolute inset-0 opacity-60 dark:opacity-30"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="absolute top-24 -right-20 h-80 w-80 rounded-full bg-blue-500/8 blur-3xl dark:bg-blue-400/10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-500/8 blur-3xl dark:bg-teal-400/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-[1fr_380px] lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge className="mb-7 border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300">
            <span className="mr-2 size-1.5 rounded-full bg-teal-500" /> Open to
            research collaborations
          </Badge>
          <p className="mb-5 text-sm font-medium tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
            {profile.position} · {profile.faculty}
          </p>
          <h1 className="max-w-4xl text-5xl leading-[0.98] font-semibold tracking-[-0.045em] text-balance text-slate-950 sm:text-6xl lg:text-[5.25rem] dark:text-white">
            {profile.fullName}
          </h1>
          <p className="mt-5 max-w-3xl text-2xl leading-tight font-medium tracking-[-.025em] text-balance text-blue-600 sm:text-3xl dark:text-blue-400">
            {profile.headline}
          </p>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-pretty text-slate-600 dark:text-slate-300">
            {profile.subheadline}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#research">
                Explore research <ArrowDown className="size-4" />
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
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative mx-auto w-full max-w-[380px]"
        >
          <div className="portrait-frame aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-3 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.28)] backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/70">
            <div className="relative flex h-full items-end overflow-hidden rounded-[1.4rem] bg-slate-900 p-7 text-white">
              <div
                className="portrait-lines absolute inset-0 opacity-50"
                aria-hidden="true"
              />
              <div className="absolute -top-14 -right-14 size-48 rounded-full border border-blue-400/30" />
              <div className="absolute -top-7 -right-7 size-32 rounded-full border border-teal-400/30" />
              <div className="relative">
                <div className="mb-5 grid size-16 place-items-center rounded-2xl border border-white/15 bg-white/10 text-xl font-semibold backdrop-blur">
                  TH
                </div>
                <p className="text-2xl font-semibold tracking-tight">
                  {profile.preferredName}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {profile.degree}
                  <br />
                  {profile.university}
                </p>
              </div>
            </div>
          </div>
          <a
            href="#contact"
            className="absolute -right-3 -bottom-5 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-xs font-semibold shadow-lg transition-transform hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900"
          >
            {profile.location}{" "}
            <ArrowUpRight className="size-3.5 text-blue-500" />
          </a>
        </motion.aside>
      </div>
    </section>
  );
}

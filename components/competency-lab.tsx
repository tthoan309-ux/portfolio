"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  BarChart3,
  BrainCircuit,
  Check,
  Database,
  FlaskConical,
  Network,
  X,
} from "lucide-react";
import { useState } from "react";

type Competency = {
  id: string;
  number: string;
  title: string;
  summary: string;
  methods: string[];
  evidence: string[];
};

type AppliedWork = {
  id: string;
  title: string;
  category: string;
  status: string;
  course: string;
  summary: string;
  deliverable: string;
  tools: string[];
  visual: string;
  metric?: string;
};

const competencyIcons = [FlaskConical, Database, BrainCircuit, BarChart3];

const mapPositions = [
  "left-[3%] top-[8%]",
  "left-1/2 top-[3%] -translate-x-1/2",
  "right-[3%] top-[8%]",
  "left-[3%] bottom-[8%]",
  "left-1/2 bottom-[3%] -translate-x-1/2",
  "right-[3%] bottom-[8%]",
];

const workAccents = ["bg-amber-500", "bg-blue-500", "bg-teal-500"] as const;

function AirlineDashboard() {
  const seatClasses = [
    ["Business", 2547],
    ["First", 2512],
    ["Economy", 2494],
    ["Premium economy", 2447],
  ] as const;

  return (
    <figure className="overflow-hidden border border-slate-700 bg-[#101827] p-5 text-slate-100 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-700 pb-5">
        <div>
          <p className="font-mono text-[9px] tracking-[.16em] text-blue-300 uppercase">
            Dashboard preview
          </p>
          <h4 className="mt-2 text-xl font-semibold tracking-[-.025em]">
            Commercial flight operations
          </h4>
        </div>
        <span className="rounded-full border border-slate-600 px-3 py-1 font-mono text-[9px] text-slate-300">
          10,000 records
        </span>
      </div>
      <div className="grid grid-cols-2 gap-px bg-slate-700 sm:grid-cols-4">
        {[
          ["Ticket value", "$8.37M"],
          ["Avg. ticket", "$837"],
          ["Return trips", "49.6%"],
          ["Avg. lead time", "3.35 days"],
        ].map(([label, value]) => (
          <div key={label} className="bg-[#101827] px-3 py-5">
            <p className="font-mono text-[9px] text-slate-400 uppercase">
              {label}
            </p>
            <p className="mt-2 text-xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-7 sm:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="mb-4 font-mono text-[9px] tracking-[.12em] text-slate-400 uppercase">
            Records by seat class
          </p>
          <div className="space-y-3">
            {seatClasses.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[110px_1fr_34px] items-center gap-3 text-xs"
              >
                <span className="text-slate-300">{label}</span>
                <span className="h-2 bg-slate-800">
                  <span
                    className="block h-full bg-blue-500"
                    style={{ width: `${(value / 2547) * 100}%` }}
                  />
                </span>
                <span className="text-right font-mono text-[9px] text-slate-400">
                  {(value / 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-l border-slate-700 pl-6">
          <p className="font-mono text-[9px] tracking-[.12em] text-slate-400 uppercase">
            Journey structure
          </p>
          <div
            className="mt-5 flex items-end gap-3"
            aria-label="Stops distribution"
          >
            {[3409, 3328, 3263].map((value, index) => (
              <div
                key={value}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="font-mono text-[9px] text-slate-400">
                  {(value / 100).toFixed(1)}%
                </span>
                <span
                  className="w-full bg-teal-500/85"
                  style={{ height: `${48 + (value - 3200) / 7}px` }}
                />
                <span className="text-[10px] text-slate-400">
                  {index} stop{index === 1 ? "" : "s"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-6 border-t border-slate-700 pt-4 text-[10px] leading-5 text-slate-400">
        Web preview calculated from the FDC105 source workbook. The original
        course deliverable is a Power BI file; this preview does not reproduce
        its report layout.
      </figcaption>
    </figure>
  );
}

function WorkVisual({ work }: { work: AppliedWork }) {
  if (work.visual === "dashboard") return <AirlineDashboard />;
  return (
    <figure className="overflow-hidden border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[16/9]">
        <Image
          src={work.visual}
          alt={`Model assessment output for ${work.title}`}
          fill
          priority
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-contain"
        />
      </div>
      <figcaption className="border-t border-slate-200 px-4 py-3 text-[10px] leading-5 text-slate-500 dark:border-slate-800">
        Output preserved from the executed project materials.
      </figcaption>
    </figure>
  );
}

function CompetencyNode({
  competency,
  index,
  active,
  onSelect,
  className = "",
}: {
  competency: Competency;
  index: number;
  active: boolean;
  onSelect: () => void;
  className?: string;
}) {
  const Icon = competencyIcons[index % competencyIcons.length];
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls="competency-detail"
      onClick={onSelect}
      className={`interactive-surface group border p-5 text-left ${active ? "border-blue-600 bg-blue-700 text-white shadow-xl shadow-blue-950/20 dark:border-blue-400 dark:bg-blue-500 dark:text-slate-950" : "border-slate-300 bg-white hover:border-blue-600 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950 dark:hover:border-blue-400"} ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`font-mono text-[9px] tracking-wider uppercase ${active ? "text-blue-100 dark:text-blue-950" : "text-slate-400"}`}
        >
          C/{competency.number}
        </span>
        <span
          className={`grid size-8 place-items-center rounded-full ${active ? "bg-white/15" : "bg-slate-100 text-blue-700 group-hover:bg-blue-50 dark:bg-slate-900 dark:text-blue-400 dark:group-hover:bg-blue-950"}`}
        >
          {active ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Icon className="size-4" aria-hidden="true" />
          )}
        </span>
      </div>
      <h3 className="mt-7 text-lg font-semibold tracking-[-.025em]">
        {competency.title}
      </h3>
      <p
        className={`mt-3 font-mono text-[9px] tracking-wide uppercase ${active ? "text-blue-100 dark:text-blue-950" : "text-slate-400"}`}
      >
        {active ? "Selected · evidence below" : "Select capability"}
      </p>
    </button>
  );
}

export function CompetencyLab({
  competencies,
  appliedWork,
}: {
  competencies: Competency[];
  appliedWork: AppliedWork[];
}) {
  const [selected, setSelected] = useState(competencies[0]?.id ?? "");
  const [workId, setWorkId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const activeCompetency =
    competencies.find((item) => item.id === selected) ?? competencies[0];
  const activeWork = appliedWork.find((item) => item.id === workId);

  return (
    <div>
      <div className="mb-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-5 border-b border-slate-300 pb-5 dark:border-slate-700">
          <div>
            <p className="font-mono text-[10px] tracking-[.14em] text-teal-700 uppercase dark:text-teal-400">
              Applied projects
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-.04em]">
              Other skills in practice
            </h3>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            These projects show how I use machine learning, dashboard design,
            model assessment, and data communication outside formal research.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {appliedWork.map((work, index) => {
            const active = work.id === workId;
            return (
              <button
                key={work.id}
                type="button"
                aria-expanded={active}
                onClick={() => setWorkId(active ? null : work.id)}
                className={`interactive-surface group relative flex min-h-56 cursor-pointer flex-col overflow-hidden border p-6 text-left focus-visible:outline-teal-500 ${active ? "border-teal-600 bg-teal-600 text-white shadow-xl shadow-teal-950/15 dark:border-teal-400 dark:bg-teal-500 dark:text-slate-950" : "border-slate-300 bg-white hover:border-teal-600 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950 dark:hover:border-teal-400"}`}
              >
                <span
                  className={`absolute inset-x-0 top-0 h-1 ${active ? "bg-white/40 dark:bg-slate-950/30" : workAccents[index % workAccents.length]}`}
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`font-mono text-[9px] tracking-wider uppercase ${active ? "text-teal-50 dark:text-teal-950" : "text-slate-400"}`}
                  >
                    {work.course} · {work.category}
                  </span>
                  {active ? (
                    <X className="size-4" aria-hidden="true" />
                  ) : (
                    <ArrowDownRight
                      className="size-5 text-teal-700 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 dark:text-teal-400"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <h4 className="mt-8 text-xl font-semibold tracking-[-.03em]">
                  {work.title}
                </h4>
                <p
                  className={`mt-3 line-clamp-2 text-sm leading-6 ${active ? "text-teal-50 dark:text-teal-950" : "text-slate-600 dark:text-slate-400"}`}
                >
                  {work.summary}
                </p>
                <span
                  className={`mt-auto border-t pt-4 text-sm font-semibold ${active ? "border-white/25 dark:border-slate-950/20" : "border-slate-200 text-teal-700 dark:border-slate-800 dark:text-teal-400"}`}
                >
                  {active ? "Close project evidence" : "Open project evidence"}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeWork && (
            <motion.article
              key={activeWork.id}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              className="mt-6"
            >
              <WorkVisual work={activeWork} />
              <div className="grid gap-5 border-x border-b border-slate-200 bg-white p-6 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-950">
                <div>
                  <p className="font-mono text-[9px] tracking-[.12em] text-teal-700 uppercase dark:text-teal-400">
                    {activeWork.status}
                  </p>
                  <h4 className="mt-3 text-2xl font-semibold tracking-[-.03em]">
                    {activeWork.title}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {activeWork.summary}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-[10px] font-semibold tracking-[.12em] text-slate-400 uppercase">
                    Deliverable
                  </p>
                  <p className="mt-2">{activeWork.deliverable}</p>
                  {activeWork.metric && (
                    <>
                      <p className="mt-5 text-[10px] font-semibold tracking-[.12em] text-slate-400 uppercase">
                        Recorded assessment
                      </p>
                      <p className="mt-2 leading-6">{activeWork.metric}</p>
                    </>
                  )}
                  <p className="mt-5 font-mono text-[10px] leading-5 text-slate-500">
                    {activeWork.tools.join(" · ")}
                  </p>
                </div>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="font-mono text-[10px] tracking-[.14em] text-blue-700 uppercase dark:text-blue-400">
            Skills map
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-[-.04em]">
            How these skills connect
          </h3>
        </div>
        <p className="max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-400">
          Select a node to inspect its methods and the work that demonstrates
          it.
        </p>
      </div>

      <div className="capability-map-field relative hidden min-h-[650px] overflow-hidden border border-slate-300 bg-white lg:block dark:border-slate-700 dark:bg-slate-950">
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          viewBox="0 0 1200 650"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g
            stroke="currentColor"
            className="text-slate-300 dark:text-slate-700"
            strokeWidth="1.5"
          >
            <line x1="600" y1="325" x2="170" y2="128" />
            <line x1="600" y1="325" x2="600" y2="98" />
            <line x1="600" y1="325" x2="1030" y2="128" />
            <line x1="600" y1="325" x2="170" y2="522" />
            <line x1="600" y1="325" x2="600" y2="552" />
            <line x1="600" y1="325" x2="1030" y2="522" />
          </g>
          <g fill="#2563eb">
            <circle cx="600" cy="325" r="6" />
            <circle cx="170" cy="128" r="4" />
            <circle cx="600" cy="98" r="4" />
            <circle cx="1030" cy="128" r="4" />
            <circle cx="170" cy="522" r="4" />
            <circle cx="600" cy="552" r="4" />
            <circle cx="1030" cy="522" r="4" />
          </g>
        </svg>

        <div className="absolute top-1/2 left-1/2 z-10 grid h-44 w-64 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-blue-600 bg-slate-950 p-6 text-center text-white shadow-2xl shadow-blue-950/25 dark:border-blue-400 dark:bg-white dark:text-slate-950">
          <div>
            <Network
              className="mx-auto size-6 text-blue-400 dark:text-blue-700"
              aria-hidden="true"
            />
            <p className="mt-3 font-mono text-[9px] tracking-[.14em] text-blue-300 uppercase dark:text-blue-700">
              Research + applied core
            </p>
            <p className="mt-2 text-lg font-semibold tracking-[-.025em]">
              Economics through data and computation
            </p>
          </div>
        </div>

        <div role="tablist" aria-label="Capability map">
          {competencies.map((competency, index) => (
            <CompetencyNode
              key={competency.id}
              competency={competency}
              index={index}
              active={competency.id === activeCompetency.id}
              onSelect={() => setSelected(competency.id)}
              className={`absolute z-20 min-h-36 w-[280px] ${mapPositions[index]}`}
            />
          ))}
        </div>
      </div>

      <div
        className="grid gap-3 sm:grid-cols-2 lg:hidden"
        role="tablist"
        aria-label="Capability map"
      >
        {competencies.map((competency, index) => (
          <CompetencyNode
            key={competency.id}
            competency={competency}
            index={index}
            active={competency.id === activeCompetency.id}
            onSelect={() => setSelected(competency.id)}
            className="min-h-40"
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          id="competency-detail"
          key={activeCompetency.id}
          role="tabpanel"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          className="grid gap-8 border-x border-b border-slate-200 bg-white p-6 lg:grid-cols-[1fr_1fr] lg:p-8 dark:border-slate-800 dark:bg-slate-950"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[.12em] text-blue-700 uppercase dark:text-blue-400">
              Selected capability · C/{activeCompetency.number}
            </p>
            <h4 className="mt-3 text-2xl font-semibold tracking-[-.03em]">
              {activeCompetency.title}
            </h4>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
              {activeCompetency.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {activeCompetency.methods.map((method) => (
                <span
                  key={method}
                  className="border border-slate-200 px-3 py-1.5 font-mono text-[10px] text-slate-500 dark:border-slate-800"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[.14em] text-slate-400 uppercase">
              Evidence in this portfolio
            </p>
            <ul className="mt-3 divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {activeCompetency.evidence.map((item) => (
                <li key={item} className="py-3 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

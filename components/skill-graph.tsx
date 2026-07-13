"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { label: "Economics", x: 50, y: 47, core: true },
  { label: "Econometrics", x: 24, y: 26 },
  { label: "Machine learning", x: 77, y: 24 },
  { label: "Causal inference", x: 17, y: 70 },
  { label: "Python · SQL", x: 80, y: 72 },
  { label: "Policy design", x: 49, y: 84 },
  { label: "XGBoost · SHAP", x: 50, y: 12 },
];

const edges = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 3],
  [2, 4],
  [2, 6],
];

export function SkillGraph() {
  const reduceMotion = useReducedMotion();
  return (
    <div
      className="relative h-[420px] overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
      aria-label="Interactive graph of research skills"
    >
      <div className="hero-grid absolute inset-0 opacity-50" />
      {edges.map(([from, to], index) => {
        const a = nodes[from];
        const b = nodes[to];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        return (
          <motion.span
            key={index}
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06, duration: 0.6 }}
            className="absolute h-px origin-left bg-slate-200 dark:bg-slate-700"
            style={{
              left: `${a.x}%`,
              top: `${a.y}%`,
              width: `${length}%`,
              transform: `rotate(${angle}deg)`,
            }}
          />
        );
      })}
      {nodes.map((node, index) => (
        <motion.div
          key={node.label}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.08, zIndex: 10 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.15 + index * 0.06,
            type: "spring",
            stiffness: 220,
          }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-default rounded-full border px-4 py-2.5 text-xs font-semibold shadow-sm backdrop-blur ${node.core ? "border-blue-500 bg-blue-600 text-white" : "border-slate-200 bg-white/90 text-slate-700 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200"}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          {node.label}
        </motion.div>
      ))}
    </div>
  );
}

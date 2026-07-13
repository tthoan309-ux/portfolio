"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const commands = [
  { label: "Research projects", href: "/#research" },
  { label: "Education", href: "/#education" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Field notes", href: "/blog" },
  { label: "Download CV", href: "/marcuz-cv.pdf" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const filtered = commands.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="hidden gap-1.5 text-slate-500 lg:flex"
        aria-label="Open command palette"
      >
        <Command className="size-3.5" />
        <span className="font-mono text-[10px]">K</span>
      </Button>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/40 px-4 pt-[18vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onMouseDown={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <label className="flex items-center gap-3 border-b border-slate-200 px-5 dark:border-slate-700">
              <Search className="size-4 text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Go to…"
                className="h-14 w-full bg-transparent text-sm outline-none"
              />
            </label>
            <div className="p-2">
              {filtered.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    setOpen(false);
                    router.push(item.href);
                  }}
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:hover:bg-slate-800"
                >
                  {item.label}
                  <span className="text-xs text-slate-400">↗</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

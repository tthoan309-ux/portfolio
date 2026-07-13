"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { CommandPalette } from "@/components/command-palette";

const links = [
  ["Research", "#research"],
  ["Education", "#education"],
  ["Writing", "/blog"],
  ["About", "#about"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-slate-50/80 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
        >
          <span className="grid size-7 place-items-center rounded-full bg-slate-900 text-[11px] font-semibold text-white transition-colors group-hover:bg-blue-600 dark:bg-white dark:text-slate-950">
            M
          </span>
          <span className="text-sm font-semibold tracking-tight">Marcuz</span>
        </Link>
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          {links.map(([label, href]) => (
            <Button key={label} asChild variant="ghost" size="sm">
              <Link href={href}>{label}</Link>
            </Button>
          ))}
          <CommandPalette />
          <ThemeToggle />
          <Button asChild size="sm" className="ml-2">
            <a href="#contact">Let’s talk</a>
          </Button>
        </nav>
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <nav
          className="border-t border-slate-200 bg-white px-5 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950"
          aria-label="Mobile navigation"
        >
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

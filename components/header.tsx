"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CannonMark } from "@/components/cannon-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { CvTrigger } from "@/components/cv-viewer";

const links = [
  { label: "Education", href: "#education", id: "education", number: "01" },
  { label: "Research", href: "#research", id: "research", number: "02" },
  {
    label: "Capabilities",
    href: "#competencies",
    id: "competencies",
    number: "03",
  },
  { label: "Experience", href: "#experience", id: "experience", number: "04" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [cannonShot, setCannonShot] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.1, 0.25] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-slate-50/92 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/92">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          aria-label="My Portfolio home"
          onClick={(event) => {
            setCannonShot((shot) => shot + 1);
            if (window.location.pathname === "/") {
              event.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth",
              });
            }
          }}
        >
          <span
            className="relative grid h-8 w-11 place-items-center"
            aria-hidden="true"
          >
            <motion.span
              key={cannonShot}
              className="cannon-idle block"
              animate={
                cannonShot > 0 && !reduceMotion
                  ? {
                      x: [0, -7, 2, 0],
                      y: [0, 2, -3, 0],
                      rotate: [0, -5, 2, 0],
                    }
                  : undefined
              }
              transition={{ duration: 0.48, ease: "easeOut" }}
            >
              <CannonMark className="w-11 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </motion.span>
            <AnimatePresence>
              {cannonShot > 0 && !reduceMotion && (
                <motion.span
                  key={`flash-${cannonShot}`}
                  className="absolute top-1/2 -right-2 size-3 -translate-y-1/2 bg-amber-400"
                  style={{
                    clipPath:
                      "polygon(0 38%, 52% 38%, 100% 0, 78% 48%, 100% 100%, 50% 62%, 0 62%)",
                  }}
                  initial={{ opacity: 0, scale: 0.2, x: -4 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.2, 1.25, 0.6],
                    x: [0, 5, 9],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </span>
          <span>
            <span className="block text-sm leading-none font-semibold tracking-tight">
              My Portfolio
            </span>
            <span className="mt-1 hidden font-mono text-[8px] tracking-[.12em] text-slate-400 uppercase sm:block">
              Economics · Data · Research
            </span>
          </span>
        </Link>
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary navigation"
        >
          {links.map((link) => {
            const active = activeSection === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={active ? "location" : undefined}
                className={`group relative inline-flex h-11 items-center gap-1.5 px-3 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${active ? "text-slate-950 dark:text-white" : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"}`}
              >
                <span className="font-mono text-[8px] text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {link.number}
                </span>
                {link.label}
                <span
                  className={`absolute inset-x-3 bottom-0 h-px bg-blue-600 transition-transform duration-200 dark:bg-blue-400 ${active ? "scale-x-100" : "scale-x-0"}`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
          <CvTrigger variant="ghost" size="sm">
            CV
          </CvTrigger>
          <ThemeToggle />
          <Button asChild size="sm" className="ml-2">
            <a href="#contact">Contact</a>
          </Button>
        </nav>
        <div className="flex items-center lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden dark:border-slate-800 dark:bg-slate-950"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={activeSection === link.id ? "location" : undefined}
              className={`flex min-h-12 items-center justify-between rounded-lg px-3 py-3 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${activeSection === link.id ? "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300" : "hover:bg-slate-100 dark:hover:bg-slate-900"}`}
            >
              {link.label}
              <span className="font-mono text-[9px] text-slate-400">
                {link.number}
              </span>
            </Link>
          ))}
          <CvTrigger
            variant="ghost"
            className="h-auto w-full justify-start rounded-lg px-3 py-3"
            onClick={() => setOpen(false)}
          >
            View CV
          </CvTrigger>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-slate-900 px-3 py-3 text-sm font-medium text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:bg-white dark:text-slate-950"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}

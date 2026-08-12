"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Download, Eye, X } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CvViewerContextValue = {
  openCv: () => void;
};

const CvViewerContext = createContext<CvViewerContextValue | null>(null);

export function useCvViewer() {
  const context = useContext(CvViewerContext);
  if (!context) {
    throw new Error("useCvViewer must be used within CvViewerProvider");
  }
  return context;
}

export function CvViewerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const openCv = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const closeCv = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCv();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [closeCv, open]);

  return (
    <CvViewerContext.Provider value={{ openCv }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[120] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-viewer-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeCv();
          }}
        >
          <div className="flex h-[94svh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-slate-100 shadow-2xl dark:bg-slate-900">
            <header className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-300 bg-white px-4 py-3 sm:px-6 dark:border-slate-700 dark:bg-slate-950">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold tracking-[.14em] text-blue-700 uppercase dark:text-blue-400">
                  Academic CV · 2 pages
                </p>
                <h2
                  id="cv-viewer-title"
                  className="truncate text-lg font-semibold tracking-[-.02em]"
                >
                  Trần Thuận Hoàn — Research CV
                </h2>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href="/marcuz-cv.pdf" download>
                    <Download className="size-4" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                </Button>
                <Button
                  autoFocus
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={closeCv}
                  aria-label="Close CV viewer"
                >
                  <X className="size-5" />
                </Button>
              </div>
            </header>
            <div className="cv-preview-scroll flex-1 overflow-y-auto bg-slate-200/80 px-2 py-4 sm:px-6 sm:py-8 dark:bg-slate-900">
              <div className="mx-auto grid max-w-[920px] gap-5 sm:gap-8">
                {[1, 2].map((page) => (
                  <figure key={page} className="select-none">
                    <Image
                      src={`/cv-preview/page-${page}.png`}
                      width={1241}
                      height={1754}
                      alt={`Trần Thuận Hoàn research CV, page ${page} of 2`}
                      className="h-auto w-full bg-white shadow-xl ring-1 ring-slate-300 dark:ring-slate-700"
                      priority={page === 1}
                      draggable={false}
                    />
                    <figcaption className="mt-2 text-center font-mono text-[10px] text-slate-500 dark:text-slate-400">
                      Page {page} / 2
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </CvViewerContext.Provider>
  );
}

export function CvTrigger({
  children,
  variant = "outline",
  size,
  className,
  onClick,
}: {
  children?: ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  onClick?: () => void;
}) {
  const { openCv } = useCvViewer();
  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        onClick?.();
        openCv();
      }}
    >
      {children ?? (
        <>
          View CV <Eye className="size-4" />
        </>
      )}
    </Button>
  );
}

export function CvTextTrigger({
  children = "CV",
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { openCv } = useCvViewer();
  return (
    <button
      type="button"
      onClick={openCv}
      className={cn(
        "rounded-sm text-left hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none",
        className,
      )}
    >
      {children}
    </button>
  );
}

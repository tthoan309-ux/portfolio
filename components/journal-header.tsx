import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function JournalHeader() {
  return (
    <header className="border-b border-slate-200/70 dark:border-slate-800">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <ArrowLeft className="size-4" />
            Hoan Research
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog">Research notes</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

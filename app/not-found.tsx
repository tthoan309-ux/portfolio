import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="text-center">
        <p className="font-mono text-sm text-blue-600">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          This path is unexplored.
        </h1>
        <p className="mt-4 text-slate-500">
          The page may have moved, or the hypothesis was rejected.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeft className="size-4" />
            Return home
          </Link>
        </Button>
      </div>
    </main>
  );
}

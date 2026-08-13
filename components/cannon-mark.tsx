import Image from "next/image";

import { cn } from "@/lib/utils";

export function CannonMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/arsenal-cannon.png"
      alt=""
      width={52}
      height={29}
      className={cn("h-auto w-10 object-contain", className)}
      aria-hidden="true"
    />
  );
}

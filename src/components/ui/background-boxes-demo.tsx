import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

export function BackgroundBoxesDemo() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 dark:bg-slate-950 flex flex-col items-center justify-center rounded-2xl mt-8 border border-slate-800">
      {/* Background boxes animation */}
      <div className="absolute inset-0 z-0">
        <Boxes />
      </div>
      
      {/* Gradient overlay mask */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 dark:bg-slate-950 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4">
        <h2
          className={cn(
            "md:text-4xl text-2xl font-semibold text-white text-center"
          )}
        >
          Software Services You Can Trust
        </h2>
        <p className="text-center mt-3 text-neutral-300 max-w-xl text-sm md:text-base">
          Websites, apps, and software products built for clarity, speed, and
          dependable performance.
        </p>
      </div>
    </div>
  );
}


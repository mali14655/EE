"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "../../lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const STORAGE_KEY = "ee-theme";

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  // Initialise from localStorage on first mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    
    // Default to light mode if no stored preference
    const startDark = stored ? stored === "dark" : false;
    setIsDark(startDark);
  }, []);

  // Apply theme to <html> and persist, and notify listeners
  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      window.localStorage.setItem(STORAGE_KEY, "dark");
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem(STORAGE_KEY, "light");
    }

    // Notify other components (e.g. Header) that theme changed
    window.dispatchEvent(
      new CustomEvent("ee-theme-change", { detail: { isDark } })
    );
  }, [isDark]);

  function handleToggle() {
    setIsDark((prev) => !prev);
  }

  return (
    <div
      className={cn(
        "flex h-8 w-16 cursor-pointer rounded-full border border-zinc-800 bg-zinc-950 p-[3px] transition-all duration-300 ease-out",
        !isDark && "border-zinc-200 bg-white shadow-sm",
        className
      )}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      <div className="flex w-full items-center justify-between px-[1px]">
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 transition-transform duration-300 ease-out",
            !isDark && "translate-x-7 bg-gray-200"
          )}
        >
          {isDark ? (
            <Moon className="h-4 w-4 text-white" strokeWidth={1.5} />
          ) : (
            <Moon className="h-4 w-4 text-black" strokeWidth={1.5} />
          )}
        </div>
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full text-gray-500 transition-colors duration-300 ease-out",
            !isDark && "text-gray-700 bg-gray-100"
          )}
        >
          <Sun className="h-4 w-4" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}


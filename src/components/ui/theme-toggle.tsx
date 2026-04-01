"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

const STORAGE_KEY = "ee-theme";

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(STORAGE_KEY) === "dark";
    }
    return false;
  });

  // Initialise from localStorage/class on first mount
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const startDark = stored ? stored === "dark" : document.documentElement.classList.contains("dark");
    setIsDark(startDark);
  }, []);

  // Keep all toggle instances in sync across the app and browser tabs
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleThemeChange = (event: Event) => {
      const custom = event as CustomEvent<{ isDark?: boolean }>;
      const next = custom.detail?.isDark;
      if (typeof next === "boolean") {
        setIsDark(next);
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      setIsDark(event.newValue === "dark");
    };

    window.addEventListener("ee-theme-change", handleThemeChange as EventListener);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("ee-theme-change", handleThemeChange as EventListener);
      window.removeEventListener("storage", handleStorage);
    };
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
    <button
      type="button"
      className={`ee-theme-toggle ${isDark ? "ee-theme-toggle-dark" : "ee-theme-toggle-light"} ${className ?? ""}`}
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="ee-theme-icon ee-theme-sun" aria-hidden="true">
        <Sun size={14} strokeWidth={1.9} />
      </span>
      <span className="ee-theme-icon ee-theme-moon" aria-hidden="true">
        <Moon size={14} strokeWidth={1.9} />
      </span>
      <span className={`ee-theme-thumb ${isDark ? "ee-theme-thumb-right" : "ee-theme-thumb-left"}`} aria-hidden="true">
        {isDark ? <Moon size={12} strokeWidth={2} /> : <Sun size={12} strokeWidth={2} />}
      </span>
      <span className="sr-only">
        {isDark ? "Dark mode enabled" : "Light mode enabled"}
      </span>
    </button>
  );
}


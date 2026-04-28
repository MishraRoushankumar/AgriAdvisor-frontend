"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-8 w-[3.75rem] rounded-full" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`
        relative flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center
        rounded-full border px-1 transition-all duration-300 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2
        ${
          isDark
            ? "border-slate-600 bg-slate-800"
            : "border-emerald-200 bg-emerald-50"
        }
      `}
    >
      {/* Track icons */}
      <Sun
        className={`absolute left-1.5 h-3.5 w-3.5 transition-all duration-300 ${
          isDark ? "text-slate-500 opacity-50" : "text-amber-500 opacity-100"
        }`}
      />
      <Moon
        className={`absolute right-1.5 h-3.5 w-3.5 transition-all duration-300 ${
          isDark ? "text-indigo-400 opacity-100" : "text-slate-400 opacity-50"
        }`}
      />

      {/* Sliding thumb */}
      <span
        className={`
          relative z-10 flex h-6 w-6 items-center justify-center
          rounded-full shadow-md transition-all duration-300 ease-in-out
          ${
            isDark
              ? "translate-x-[1.75rem] bg-slate-700 shadow-indigo-900/40"
              : "translate-x-0 bg-white shadow-emerald-200/60"
          }
        `}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-indigo-400" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500" />
        )}
      </span>
    </button>
  );
}

import Link from "next/link";
import { BarChart3, ChevronRight, FlaskConical, Sprout } from "lucide-react";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-14 text-center md:px-8">
      <div className="glass-card w-full max-w-4xl p-8 md:p-12">
        {/* Pill badge */}
        <p className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-900/30 dark:text-emerald-400">
          Precision Agriculture Dashboard
        </p>

        {/* Hero headline */}
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl dark:text-slate-50">
          AgriAdvisor
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto mb-8 max-w-2xl text-slate-700 dark:text-slate-400">
          Data-driven crop and fertiliser recommendations powered by machine learning.
        </p>

        {/* Feature tiles — responsive grid */}
        <div className="mb-8 grid gap-3 text-left sm:grid-cols-3">
          <div className="glass-surface p-4 text-sm text-slate-700 dark:text-slate-300">
            <Sprout className="mb-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            Crop Recommendation
          </div>
          <div className="glass-surface p-4 text-sm text-slate-700 dark:text-slate-300">
            <FlaskConical className="mb-2 h-4 w-4 text-amber-600 dark:text-amber-400" />
            Fertiliser Advice
          </div>
          <div className="glass-surface p-4 text-sm text-slate-700 dark:text-slate-300">
            <BarChart3 className="mb-2 h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            Explainable AI Insights
          </div>
        </div>

        <Link
          href="/predict"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-medium text-white transition hover:scale-[1.01] hover:from-emerald-400 hover:to-green-500"
        >
          Get Recommendations <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}

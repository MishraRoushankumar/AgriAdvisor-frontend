import Link from "next/link";
import { BarChart3, ChevronRight, FlaskConical, Sprout } from "lucide-react";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 py-14 text-center md:px-8">
      <div className="glass-card max-w-4xl p-8 md:p-12">
        <p className="mb-4 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium uppercase tracking-widest text-emerald-700">
          Precision Agriculture Dashboard
        </p>
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">AgriAdvisor</h1>
        <p className="mx-auto mb-8 max-w-2xl text-slate-700">
          Data-driven crop and fertiliser recommendations powered by machine learning.
        </p>
        <div className="mb-8 grid gap-3 text-left md:grid-cols-3">
          <div className="glass-surface p-4 text-sm text-slate-700">
            <Sprout className="mb-2 h-4 w-4 text-emerald-600" />
            Crop Recommendation
          </div>
          <div className="glass-surface p-4 text-sm text-slate-700">
            <FlaskConical className="mb-2 h-4 w-4 text-amber-600" />
            Fertiliser Advice
          </div>
          <div className="glass-surface p-4 text-sm text-slate-700">
            <BarChart3 className="mb-2 h-4 w-4 text-cyan-600" />
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

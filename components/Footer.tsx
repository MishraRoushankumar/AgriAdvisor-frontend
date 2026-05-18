export function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-slate-50/80 px-6 py-8 text-sm text-slate-700 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 text-center md:text-left">
          <p className="text-base font-semibold text-slate-900 dark:text-slate-100">AgriAdvisor</p>
          <p className="max-w-sm text-sm text-slate-600 dark:text-slate-400">
            Data-driven crop and fertiliser recommendations for smarter planting decisions.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          <a href="/" className="transition hover:text-slate-900 dark:hover:text-slate-100">Home</a>
          <span aria-hidden="true">•</span>
          <a href="/predict" className="transition hover:text-slate-900 dark:hover:text-slate-100">Predict</a>
          <span aria-hidden="true">•</span>
          <a href="/model-stats" className="transition hover:text-slate-900 dark:hover:text-slate-100">Model Stats</a>
        </nav>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400 md:text-right">
          <p>Built with Next.js · scikit-learn</p>
          <p>© {new Date().getFullYear()} AgriAdvisor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

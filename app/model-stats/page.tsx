"use client";

import { useEffect, useState } from "react";

import { FeatureChart } from "@/components/model-stats/FeatureChart";
import { ModelTable } from "@/components/model-stats/ModelTable";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeatureImportance, getModelStats } from "@/lib/api";
import type { FeatureImportance, ModelStats } from "@/lib/types";

export default function ModelStatsPage() {
  const [stats, setStats] = useState<ModelStats | null>(null);
  const [importance, setImportance] = useState<FeatureImportance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [statsData, importanceData] = await Promise.all([getModelStats(), getFeatureImportance()]);
        if (!mounted) return;
        setStats(statsData);
        setImportance(importanceData);
      } catch (loadError) {
        if (!mounted) return;
        setError(loadError instanceof Error ? loadError.message : "Failed to load model metrics");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-8 md:py-10">
      <h1 className="section-title">Model Performance Comparison</h1>
      <p className="mb-6 section-subtitle">KNN vs Random Forest vs XGBoost trained on 2,200 crop samples</p>

      {error ? (
        <Card className="mb-4 border-rose-300 bg-rose-50 p-5 text-rose-700">{error}</Card>
      ) : null}

      <section className="mb-6 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Model Comparison Table</h2>
        {loading || !stats ? <Skeleton className="h-52 w-full" /> : <ModelTable stats={stats} />}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Global Feature Importance</h2>
        {loading ? <Skeleton className="h-64 w-full" /> : <FeatureChart data={importance} />}
      </section>
    </main>
  );
}

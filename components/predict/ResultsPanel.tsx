import { AlertCircle } from "lucide-react";

import { CropResults } from "@/components/predict/CropResults";
import { FertiliserCard } from "@/components/predict/FertiliserCard";
import { ShapChart } from "@/components/predict/ShapChart";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CropResult, FertResult } from "@/lib/types";

interface ResultsPanelProps {
  loading: boolean;
  error: string | null;
  cropResult: CropResult | null;
  fertResult: FertResult | null;
}

export function ResultsPanel({ loading, error, cropResult, fertResult }: ResultsPanelProps) {
  if (loading) {
    return (
      <Card className="glass-card space-y-4 p-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-56 w-full" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-rose-300 bg-rose-50 p-6 text-rose-700">
        <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
          <AlertCircle className="h-5 w-5" />
          Prediction failed
        </div>
        <p>{error}</p>
      </Card>
    );
  }

  if (!cropResult || !fertResult) {
    return (
      <Card className="glass-card p-6 text-sm text-slate-600">
        Submit your inputs to view crop, fertiliser, and SHAP insights.
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="glass-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
        <CropResults crops={cropResult.top3_crops} />
      </Card>
      <Card className="glass-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
        <FertiliserCard result={fertResult} />
      </Card>
      <Card className="glass-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
        <ShapChart values={cropResult.shap} />
      </Card>
    </div>
  );
}

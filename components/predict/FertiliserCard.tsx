import { Badge } from "@/components/ui/badge";
import type { FertResult } from "@/lib/types";

interface FertiliserCardProps {
  result: FertResult;
}

function confidenceClass(confidence: number): string {
  if (confidence > 80) return "bg-emerald-100 text-emerald-800";
  if (confidence >= 50) return "bg-amber-100 text-amber-800";
  return "bg-rose-100 text-rose-800";
}

export function FertiliserCard({ result }: FertiliserCardProps) {
  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-900">Recommended Fertiliser</h3>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xl font-bold text-emerald-700">{result.fertiliser}</p>
          <Badge className={confidenceClass(result.confidence)}>{result.confidence.toFixed(1)}%</Badge>
        </div>
        <p className="text-sm text-slate-600">{result.tip}</p>
      </div>
    </section>
  );
}

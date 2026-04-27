import { Badge } from "@/components/ui/badge";
import type { ModelStats } from "@/lib/types";

interface ModelTableProps {
  stats: ModelStats;
}

const BEST_CROP_MODEL = "XGBoost";
const BEST_FERT_MODEL = "Random Forest";

export function ModelTable({ stats }: ModelTableProps) {
  return (
    <div className="space-y-6">
      {Object.entries(stats).map(([category, models]) => {
        const rows = Object.entries(models as Record<string, import("@/lib/types").ModelMetrics>);

        return (
          <div key={category} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="bg-slate-100 px-4 py-2 font-semibold text-slate-800 capitalize">
              {category} Models
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full w-full text-left text-sm md:text-base">
                <thead className="bg-emerald-700 text-white">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap min-w-[120px]">Model</th>
                    <th className="px-4 py-3 whitespace-nowrap min-w-[80px]">Accuracy</th>
                    <th className="px-4 py-3 whitespace-nowrap min-w-[80px]">F1 Score</th>
                    <th className="px-4 py-3 whitespace-nowrap min-w-[80px]">CV Mean</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 text-sm md:text-base">
                  {rows.map(([model, metrics], index) => {
                    const isBest = (category === "crop" && model === BEST_CROP_MODEL) || 
                                   (category === "fertiliser" && model === BEST_FERT_MODEL);
                    return (
                      <tr key={model} className={isBest ? "bg-emerald-50" : index % 2 ? "bg-slate-50" : "bg-white"}>
                        <td className="px-4 py-3 font-medium whitespace-nowrap">
                          {model} {isBest ? <Badge className="ml-2 bg-emerald-100 text-emerald-800">Best Model</Badge> : null}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{metrics.accuracy.toFixed(2)}%</td>
                        <td className="px-4 py-3 whitespace-nowrap">{metrics.f1.toFixed(2)}%</td>
                        <td className="px-4 py-3 whitespace-nowrap">{metrics.cv_mean?.toFixed(2) ?? "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

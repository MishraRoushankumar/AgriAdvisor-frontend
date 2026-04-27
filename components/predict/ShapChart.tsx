import { Info } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { ShapValue } from "@/lib/types";

interface ShapChartProps {
  values: ShapValue[];
}

export function ShapChart({ values }: ShapChartProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-slate-900">Why this recommendation?</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 cursor-pointer text-slate-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>SHAP values explain each feature&apos;s impact on the recommendation.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="h-[220px] rounded-xl border border-slate-200 bg-white p-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={values} layout="vertical">
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis type="number" tick={{ fontSize: 12, fill: "#475569" }} />
            <YAxis type="category" dataKey="feature" width={90} tick={{ fontSize: 12, fill: "#475569" }} />
            <RechartsTooltip />
            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
              {values.map((entry) => (
                <Cell key={entry.feature} fill={entry.value >= 0 ? "rgba(16,185,129,0.8)" : "rgba(244,63,94,0.8)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-slate-500">
        Positive values support this crop. Negative values work against it.
      </p>
    </section>
  );
}

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { FeatureImportance } from "@/lib/types";

interface FeatureChartProps {
  data: FeatureImportance[];
}

export function FeatureChart({ data }: FeatureChartProps) {
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="h-[260px] rounded-xl border border-slate-200 bg-white p-4 overflow-x-auto">
      <ResponsiveContainer width="100%" minWidth={320} height="100%">
        <BarChart data={sortedData} layout="vertical">
          <XAxis type="number" tick={{ fill: "#475569", fontSize: 12 }} />
          <YAxis type="category" dataKey="feature" width={100} tick={{ fill: "#475569", fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#34d399" radius={[4, 4, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

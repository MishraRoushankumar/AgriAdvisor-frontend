import { Badge } from "@/components/ui/badge";
import { CROP_EMOJI } from "@/lib/constants";
import type { CropPrediction } from "@/lib/types";

interface CropCardProps {
  rank: 1 | 2 | 3;
  crop: CropPrediction;
}

export function CropCard({ rank, crop }: CropCardProps) {
  const normalized = crop.crop.toLowerCase();
  const emoji = CROP_EMOJI[normalized] ?? "🌱";
  const displayName = `${crop.crop.charAt(0).toUpperCase()}${crop.crop.slice(1)}`;

  const rankStyles: Record<number, string> = {
    1: "border-emerald-200 bg-emerald-50/80",
    2: "border-slate-200 bg-white",
    3: "border-amber-200 bg-amber-50/70",
  };
  const rankBadgeStyles: Record<number, string> = {
    1: "bg-green-800 text-white",
    2: "bg-gray-500 text-white",
    3: "bg-amber-600 text-white",
  };

  return (
    <div className={`rounded-xl border p-4 ${rankStyles[rank]}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className={rankBadgeStyles[rank]}>{`${rank}${rank === 1 ? "st" : rank === 2 ? "nd" : "rd"}`}</Badge>
          <span className="text-lg font-semibold text-slate-900">
            {emoji} {displayName}
          </span>
        </div>
        {rank === 1 ? (
          <Badge className="bg-emerald-100 text-emerald-800">Best Match</Badge>
        ) : null}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-emerald-400" style={{ width: `${crop.confidence}%` }} />
      </div>
      <p className="mt-2 text-right text-sm font-medium text-emerald-700">{crop.confidence.toFixed(1)}%</p>
    </div>
  );
}

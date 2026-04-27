import type { CropPrediction } from "@/lib/types";
import { CropCard } from "@/components/predict/CropCard";

interface CropResultsProps {
  crops: CropPrediction[];
}

export function CropResults({ crops }: CropResultsProps) {
  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-900">Recommended Crops</h3>
      {crops.slice(0, 3).map((crop, index) => (
        <CropCard key={`${crop.crop}-${index}`} rank={(index + 1) as 1 | 2 | 3} crop={crop} />
      ))}
    </section>
  );
}

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FEATURE_RANGES } from "@/lib/constants";
import type { CropInput } from "@/lib/types";

interface InputFormProps {
  values: CropInput;
  soilType: string;
  cropType: string;
  soilTypes: string[];
  cropTypes: string[];
  loading: boolean;
  autoFilled?: boolean;
  onValueChange: <K extends keyof CropInput>(key: K, value: number) => void;
  onSoilTypeChange: (value: string) => void;
  onCropTypeChange: (value: string) => void;
  onSubmit: () => void;
}

function NumberSliderField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: keyof CropInput;
  value: number;
  onChange: (next: number) => void;
}) {
  const range = FEATURE_RANGES[name];
  return (
    <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="text-sm text-slate-700">
          {label}
        </Label>
        <span className="text-sm font-semibold text-emerald-700">
          {value} {range.unit}
        </span>
      </div>
      <Slider
        min={range.min}
        max={range.max}
        step={range.step}
        value={[value]}
        onValueChange={(next) => onChange(next[0])}
      />
      <Input
        id={name}
        type="number"
        value={value}
        min={range.min}
        max={range.max}
        step={range.step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
      />
    </div>
  );
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";

export function InputForm({
  values,
  soilType,
  cropType,
  soilTypes,
  cropTypes,
  loading,
  autoFilled,
  onValueChange,
  onSoilTypeChange,
  onCropTypeChange,
  onSubmit,
}: InputFormProps) {
  const [openItems, setOpenItems] = useState<string[]>(["soil", "climate", "fertiliser"]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setOpenItems([]);
    }
  }, []);

  return (
    <div className="glass-card p-5 lg:sticky lg:top-24 flex flex-col gap-4">
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="flex flex-col gap-2">
        
        <AccordionItem value="soil" className="border border-gray-200 rounded-lg overflow-hidden">
          <AccordionTrigger className="data-[state=open]:bg-green-50 bg-white text-green-800 font-semibold text-sm px-4 py-3 hover:no-underline [&[data-state=open]]:border-b border-gray-200">
            🌱 Soil Nutrients
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2 space-y-3 bg-white border-t-0">
            <NumberSliderField label="Nitrogen (N)" name="N" value={values.N} onChange={(next) => onValueChange("N", next)} />
            <NumberSliderField label="Phosphorous (P)" name="P" value={values.P} onChange={(next) => onValueChange("P", next)} />
            <NumberSliderField label="Potassium (K)" name="K" value={values.K} onChange={(next) => onValueChange("K", next)} />
            <NumberSliderField label="pH" name="ph" value={values.ph} onChange={(next) => onValueChange("ph", next)} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="climate" className="border border-gray-200 rounded-lg overflow-hidden">
          <AccordionTrigger className="data-[state=open]:bg-green-50 bg-white text-green-800 font-semibold text-sm px-4 py-3 hover:no-underline [&[data-state=open]]:border-b border-gray-200">
            🌤️ Climate Conditions
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2 space-y-3 bg-white border-t-0">
            <NumberSliderField
              label="Temperature"
              name="temperature"
              value={values.temperature}
              onChange={(next) => onValueChange("temperature", next)}
            />
            <NumberSliderField label="Humidity" name="humidity" value={values.humidity} onChange={(next) => onValueChange("humidity", next)} />
            <NumberSliderField label="Soil Moisture" name="moisture" value={values.moisture} onChange={(next) => onValueChange("moisture", next)} />
            <NumberSliderField label="Rainfall" name="rainfall" value={values.rainfall} onChange={(next) => onValueChange("rainfall", next)} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fertiliser" className="border border-gray-200 rounded-lg overflow-hidden">
          <AccordionTrigger className="data-[state=open]:bg-green-50 bg-white text-green-800 font-semibold text-sm px-4 py-3 hover:no-underline [&[data-state=open]]:border-b border-gray-200">
            🧪 Fertiliser Inputs
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2 space-y-3 bg-white border-t-0">
            <div className="space-y-2">
              <Label className="text-slate-700">Soil Type</Label>
              <Select value={soilType} onValueChange={onSoilTypeChange}>
                <SelectTrigger className="border-slate-200 bg-white text-slate-900">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Crop Type</Label>
              <Select value={cropType} onValueChange={onCropTypeChange}>
                <SelectTrigger className="border-slate-200 bg-white text-slate-900">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {autoFilled && (
                <p className="text-xs italic text-gray-500">
                  Auto-mapped from predicted crop — you can change this
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>

      <Button
        className="w-full mt-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-400 hover:to-green-500"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analysing...
          </>
        ) : (
          "Get Recommendation"
        )}
      </Button>
    </div>
  );
}

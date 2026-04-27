"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";

import { InputForm } from "@/components/predict/InputForm";
import { ResultsPanel } from "@/components/predict/ResultsPanel";
import { getOptions, predictCrop, predictFertiliser } from "@/lib/api";
import { CROP_TO_FERT_CROP_MAP, DEFAULT_VALUES, FALLBACK_OPTIONS, FEATURE_RANGES } from "@/lib/constants";
import type { CropInput, CropResult, FertResult, MetaOptions } from "@/lib/types";

function inRange(value: number, min: number, max: number): boolean {
  return Number.isFinite(value) && value >= min && value <= max;
}

export default function PredictPage() {
  const [values, setValues] = useState<CropInput>(DEFAULT_VALUES);
  const [soilType, setSoilType] = useState(FALLBACK_OPTIONS.soil_types[0]);
  const [cropType, setCropType] = useState(FALLBACK_OPTIONS.crop_types[0]);
  const [options, setOptions] = useState<MetaOptions>(FALLBACK_OPTIONS);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metaWarning, setMetaWarning] = useState<string | null>(null);
  const [cropResult, setCropResult] = useState<CropResult | null>(null);
  const [fertResult, setFertResult] = useState<FertResult | null>(null);
  const [autoFilled, setAutoFilled] = useState(false);

  useEffect(() => {
    let mounted = true;
    getOptions()
      .then((data) => {
        if (!mounted) return;
        setOptions(data);
        setSoilType(data.soil_types[0] ?? FALLBACK_OPTIONS.soil_types[0]);
        setCropType(data.crop_types[0] ?? FALLBACK_OPTIONS.crop_types[0]);
      })
      .catch(() => {
        if (!mounted) return;
        setMetaWarning("Unable to load dropdown options from backend. Using fallback values.");
      });
    return () => {
      mounted = false;
    };
  }, []);

  const invalidMessage = useMemo(() => {
    for (const [key, range] of Object.entries(FEATURE_RANGES)) {
      const typedKey = key as keyof CropInput;
      if (!inRange(values[typedKey], range.min, range.max)) {
        return `${key} must be between ${range.min} and ${range.max}.`;
      }
    }
    return null;
  }, [values]);

  const handleSubmit = async () => {
    setError(null);

    if (invalidMessage) {
      setError(invalidMessage);
      return;
    }

    setLoading(true);
    const start = Date.now();
    try {
      const [crop, fert] = await Promise.all([
        predictCrop(values),
        predictFertiliser({
          soil_type: soilType,
          crop_type: cropType,
          N: values.N,
          P: values.P,
          K: values.K,
          temperature: values.temperature,
          humidity: values.humidity,
          moisture: values.moisture,
        }),
      ]);
      setCropResult(crop);
      setFertResult(fert);

      // Auto-fill the Crop Type dropdown from the top predicted crop
      if (crop?.top3_crops?.length) {
        const topCrop = crop.top3_crops[0].crop.toLowerCase();
        const mappedCropType = CROP_TO_FERT_CROP_MAP[topCrop] ?? null;
        if (mappedCropType) {
          setCropType(mappedCropType);
          setAutoFilled(true);
        }
      }
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Unknown error";
      if (message.toLowerCase().includes("failed to fetch")) {
        setError("Backend server is not running.");
      } else {
        setError(message);
      }
    } finally {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 300 - elapsed);
      window.setTimeout(() => setLoading(false), remaining);
    }
  };

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8 md:py-10">
      <div className="mb-6">
        <h1 className="section-title">Prediction Dashboard</h1>
        <p className="section-subtitle">Enter soil and climate inputs to get crop and fertiliser recommendations.</p>
      </div>

      {metaWarning ? (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4" />
          {metaWarning}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="lg:col-span-2">
          <InputForm
            values={values}
            soilType={soilType}
            cropType={cropType}
            soilTypes={options.soil_types}
            cropTypes={options.crop_types}
            loading={loading}
            autoFilled={autoFilled}
            onValueChange={(key, value) => setValues((prev) => ({ ...prev, [key]: value }))}
            onSoilTypeChange={setSoilType}
            onCropTypeChange={(value) => {
              setCropType(value);
              setAutoFilled(false);
            }}
            onSubmit={handleSubmit}
          />
        </section>
        <section className="lg:col-span-3">
          <ResultsPanel loading={loading} error={error} cropResult={cropResult} fertResult={fertResult} />
        </section>
      </div>
    </main>
  );
}

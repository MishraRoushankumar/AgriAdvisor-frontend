import { API_BASE } from "@/lib/constants";
import type {
  CropInput,
  CropResult,
  FertInput,
  FertResult,
  FeatureImportance,
  MetaOptions,
  ModelStats,
} from "@/lib/types";

async function parseResponse<T>(res: Response, fallbackError: string): Promise<T> {
  if (!res.ok) {
    let message = fallbackError;
    try {
      const body = (await res.json()) as { detail?: string };
      if (body.detail) {
        message = body.detail;
      }
    } catch {
      // Keep fallback message for non-JSON responses.
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export async function predictCrop(data: CropInput): Promise<CropResult> {
  const res = await fetch(`${API_BASE}/predict/crop`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseResponse<CropResult>(res, "Crop prediction failed");
}

export async function predictFertiliser(data: FertInput): Promise<FertResult> {
  const res = await fetch(`${API_BASE}/predict/fertiliser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseResponse<FertResult>(res, "Fertiliser prediction failed");
}

export async function getModelStats(): Promise<ModelStats> {
  const res = await fetch(`${API_BASE}/model/stats`);
  return parseResponse<ModelStats>(res, "Failed to fetch model stats");
}

export async function getFeatureImportance(): Promise<FeatureImportance[]> {
  const res = await fetch(`${API_BASE}/model/feature-importance`);
  return parseResponse<FeatureImportance[]>(res, "Failed to fetch feature importance");
}

export async function getOptions(): Promise<MetaOptions> {
  const res = await fetch(`${API_BASE}/meta/options`);
  return parseResponse<MetaOptions>(res, "Failed to fetch options");
}

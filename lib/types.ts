export interface CropInput {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  moisture: number;
}

export interface FertInput {
  soil_type: string;
  crop_type: string;
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  moisture: number;
}

export interface CropPrediction {
  crop: string;
  confidence: number;
}

export interface ShapValue {
  feature: string;
  value: number;
}

export interface CropResult {
  top3_crops: CropPrediction[];
  shap: ShapValue[];
}

export interface FertResult {
  fertiliser: string;
  confidence: number;
  tip: string;
}

export interface ModelMetrics {
  accuracy: number;
  f1: number;
  cv_mean?: number;
}

export interface ModelStats {
  crop: Record<string, ModelMetrics>;
  fertiliser: Record<string, ModelMetrics>;
}

export interface FeatureImportance {
  feature: string;
  value: number;
}

export interface MetaOptions {
  soil_types: string[];
  crop_types: string[];
}

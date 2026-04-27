export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export const CROP_EMOJI: Record<string, string> = {
  rice: "🌾",
  maize: "🌽",
  chickpea: "🫘",
  kidneybeans: "🫘",
  pigeonpeas: "🌿",
  mothbeans: "🫘",
  mungbean: "🌿",
  blackgram: "🫘",
  lentil: "🍃",
  pomegranate: "🍎",
  banana: "🍌",
  mango: "🥭",
  grapes: "🍇",
  watermelon: "🍉",
  muskmelon: "🍈",
  apple: "🍎",
  orange: "🍊",
  papaya: "🥭",
  coconut: "🥥",
  cotton: "🌸",
  jute: "🌿",
  coffee: "☕",
};

export const FEATURE_RANGES = {
  N: { min: 0, max: 140, step: 1, unit: "kg/ha" },
  P: { min: 5, max: 145, step: 1, unit: "kg/ha" },
  K: { min: 5, max: 205, step: 1, unit: "kg/ha" },
  temperature: { min: 8.8, max: 43.7, step: 0.1, unit: "°C" },
  humidity: { min: 14, max: 99, step: 1, unit: "%" },
  moisture: { min: 0, max: 100, step: 1, unit: "%" },
  ph: { min: 3.5, max: 9.9, step: 0.1, unit: "" },
  rainfall: { min: 20, max: 298, step: 1, unit: "mm" },
} as const;

export const DEFAULT_VALUES = {
  N: 70,
  P: 50,
  K: 50,
  temperature: 25,
  humidity: 65,
  moisture: 50,
  ph: 6.5,
  rainfall: 150,
};

export const FALLBACK_OPTIONS = {
  soil_types: ["Sandy", "Loamy", "Black", "Red", "Clayey"],
  crop_types: [
    "Maize",
    "Sugarcane",
    "Cotton",
    "Tobacco",
    "Paddy",
    "Barley",
    "Wheat",
    "Millets",
    "Oil seeds",
    "Pulses",
    "Ground Nuts",
  ],
};

export const CROP_TO_FERT_CROP_MAP: Record<string, string> = {
  // Direct matches
  maize: "Maize",
  cotton: "Cotton",

  // Cereal/grain family
  rice: "Paddy",
  jute: "Paddy", // moisture-loving, similar profile
  blackgram: "Pulses",
  mungbean: "Pulses",
  lentil: "Pulses",
  pigeonpeas: "Pulses",
  mothbeans: "Pulses",
  kidneybeans: "Pulses",
  chickpea: "Pulses",

  // Oil/cash crops
  coconut: "Oil seeds",
  coffee: "Ground Nuts", // tropical crop, similar nutrient needs
  grapes: "Sugarcane", // high water, high sugar content crop
  banana: "Sugarcane", // tropical, high K requirement

  // Fruit crops — map to closest available
  mango: "Ground Nuts",
  papaya: "Ground Nuts",
  pomegranate: "Ground Nuts",
  orange: "Ground Nuts",
  apple: "Ground Nuts",
  watermelon: "Millets",
  muskmelon: "Millets",
};

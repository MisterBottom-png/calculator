export type FibreConsts = {
  lte7_5?: number;
  c9_10_5?: number;
  c13_5?: number;
  c15?: number;
  nurseryNo?: number;
  nurseryYes?: number;
};

export type FibrePreset = {
  name: string;
  codes: Array<string | null>;
  prc: number[];
  consts: FibreConsts;
};

export type FinishRule = {
  extra: number;
  factor: number;
  halve: boolean;
};

export type ProductPreset = {
  mode: "standard" | "nurseryYes" | "nurseryNo";
  construction: "Sonic Seam" | "Stitched";
  finish: "SONIC SEAM" | "BOUND DUVETS" | "NURSERY";
  corovin: boolean;
  bound: boolean;
};

export type SizePreset = {
  value: string;
  width?: number;
  length?: number;
  labelKey: string;
};

export type DuvetInput = {
  sizeMode: "preset" | "custom";
  sizePreset: string;
  width: number;
  length: number;
  productKey: string;
  tog: number;
  fibreIndex: number;
};

export type DuvetBreakdownRow = {
  label: string;
  code: string;
  pct: number;
  kg: number | null;
  g: number | null;
};

export type DuvetResult = {
  sizeValue: string;
  width: number;
  length: number;
  area: number | null;
  totalKg: number | null;
  rollWidth: number | null;
  baseFabricLength: number | null;
  corovinLength: number | null;
  bindingLength: number | null;
  breakdown: DuvetBreakdownRow[];
  warnings: string[];
  notes: string[];
  fibre: FibrePreset;
  product: ProductPreset;
};

export type PillowInput = {
  fillWeight: number;
  pct1: number;
  pct2: number;
  pct3: number;
};

export type PillowBreakdownRow = {
  label: string;
  pct: number;
  kg: number | null;
};

export type PillowResult = {
  totalPct: number;
  rows: PillowBreakdownRow[];
  warnings: string[];
};

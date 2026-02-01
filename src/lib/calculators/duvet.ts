import type {
  DuvetBreakdownRow,
  DuvetInput,
  DuvetResult,
  FibrePreset,
  FinishRule,
  ProductPreset,
  SizePreset
} from "./types";

export const SIZE_PRESETS: SizePreset[] = [
  { value: "SINGLE", width: 135, length: 200, labelKey: "dyn.size.single" },
  { value: "DOUBLE", width: 200, length: 200, labelKey: "dyn.size.double" },
  { value: "KING", width: 225, length: 220, labelKey: "dyn.size.king" },
  { value: "SUPER KING", width: 260, length: 220, labelKey: "dyn.size.super" },
  { value: "EMPEROR", width: 290, length: 235, labelKey: "dyn.size.emperor" },
  { value: "CUSTOM SIZE", labelKey: "dyn.size.custom" }
];

export const FIBRES: FibrePreset[] = [
  {
    name: "Smartfil Eco",
    codes: ["A6FIBRENO4YGRS", "A6FIBRENO2CGRS", null],
    prc: [0.65, 0.35, 0],
    consts: { lte7_5: 28, c9_10_5: 31, c13_5: 36, c15: 36, nurseryNo: 28, nurseryYes: 25 }
  },
  {
    name: "Smartfil Silk Touch",
    codes: ["A6FIBRENO4YGRS", "A6FIBRENO2CGRS", "A6SILK9767"],
    prc: [0.65, 0.3, 0.05],
    consts: { lte7_5: 28, c9_10_5: 31, c13_5: 36, c15: 36, nurseryNo: 28, nurseryYes: 25 }
  },
  {
    name: "Smartfil Silk Touch 10%",
    codes: ["A6FIBRENO4YGRS", "A6FIBRENO2CGRS", "A6SILK9767"],
    prc: [0.6, 0.3, 0.1],
    consts: { lte7_5: 30, c9_10_5: 31, c13_5: 35, c15: 35 }
  },
  {
    name: "Smartfil Tech - Aegis",
    codes: ["A6FIBRENO4I", null, null],
    prc: [1, 0, 0],
    consts: { lte7_5: 28, c9_10_5: 30, c13_5: 34, c15: 34 }
  },
  {
    name: "Smartfil Tech - Amicor",
    codes: ["A6FIBRENO4YGRS", "A6FIBRENO2CGRS", "A6AM3"],
    prc: [0.6, 0.2, 0.2],
    consts: { lte7_5: 28, c9_10_5: 30, c13_5: 32, c15: 32, nurseryNo: 28 }
  },
  {
    name: "Smartfil Tech - Breathe 20%",
    codes: ["A6FIBRENO4YGRS", "A6FIBRENO2CGRS", "A6MOD1"],
    prc: [0.6, 0.2, 0.2],
    consts: { lte7_5: 30, c9_10_5: 34, c13_5: 34, c15: 34, nurseryNo: 32 }
  },
  {
    name: "Smartfil Tech - Breathe 10%",
    codes: ["A6FIBRENO4YGRS", "A6FIBRENO2CGRS", "A6MOD1"],
    prc: [0.6, 0.3, 0.1],
    consts: { lte7_5: 30, c9_10_5: 34, c13_5: 34, c15: 34, nurseryNo: 32 }
  },
  {
    name: "Primaloft",
    codes: ["A6FIBRENO4YPRIGRS", null, null],
    prc: [1, 0, 0],
    consts: { lte7_5: 28, c9_10_5: 36, c13_5: 36 }
  },
  {
    name: "Smartfil Tech - Breathe 5%",
    codes: ["A6FIBRENO4YGRS", "A6FIBRENO2CGRS", "A6MOD1"],
    prc: [0.65, 0.3, 0.05],
    consts: { lte7_5: 28, c9_10_5: 36, c13_5: 36, c15: 36, nurseryNo: 28, nurseryYes: 25 }
  },
  {
    name: "Smartfil Tech - Clima",
    codes: ["A6FIBRENO4YGRS", "A6FIBRENO2CGRS", "A6LYOPCM"],
    prc: [0.6, 0.2, 0.2],
    consts: { lte7_5: 28, c9_10_5: 28, c13_5: 28, c15: 28 }
  }
];

export const FINISH_RULES: Record<string, FinishRule> = {
  "SONIC SEAM": { extra: 5, factor: 1.028, halve: false },
  "BOUND DUVETS": { extra: 5, factor: 1.0478, halve: false },
  NURSERY: { extra: 5, factor: 1.06, halve: true }
};

export const PRODUCT_PRESETS: Record<string, ProductPreset> = {
  ss_with: { mode: "standard", construction: "Sonic Seam", finish: "SONIC SEAM", corovin: true, bound: false },
  ss_without: { mode: "standard", construction: "Sonic Seam", finish: "SONIC SEAM", corovin: false, bound: false },
  bd_with: { mode: "standard", construction: "Stitched", finish: "BOUND DUVETS", corovin: true, bound: true },
  bd_without: { mode: "standard", construction: "Stitched", finish: "BOUND DUVETS", corovin: false, bound: true },
  n_with: { mode: "nurseryYes", construction: "Sonic Seam", finish: "NURSERY", corovin: true, bound: false },
  n_without: { mode: "nurseryNo", construction: "Sonic Seam", finish: "NURSERY", corovin: false, bound: false },
  nb_with: { mode: "nurseryYes", construction: "Stitched", finish: "NURSERY", corovin: true, bound: true },
  nb_without: { mode: "nurseryNo", construction: "Stitched", finish: "NURSERY", corovin: false, bound: true }
};

export const TOG_OPTIONS = ["1.5", "3.0", "4.0", "4.5", "7.5", "9.0", "10.5", "13.5", "15.0"];

export function sizeArea(size: string, width: number, length: number) {
  switch (size) {
    case "SINGLE":
      return (135 * 200) / 10000;
    case "DOUBLE":
      return (200 * 200) / 10000;
    case "KING":
      return (220 * 225) / 10000;
    case "SUPER KING":
      return (220 * 260) / 10000;
    case "EMPEROR":
      return (290 * 235) / 10000;
    case "CUSTOM SIZE":
      return (width * length) / 10000;
    default:
      return 0;
  }
}

export function pickConstant(fibre: FibrePreset, mode: ProductPreset["mode"], tog: number) {
  const c = fibre.consts || {};
  if (mode === "nurseryNo") return c.nurseryNo ?? c.nurseryYes ?? null;
  if (mode === "nurseryYes") return c.nurseryYes ?? c.nurseryNo ?? null;
  if (tog <= 7.5) return c.lte7_5 ?? null;
  if (tog === 9 || tog === 10.5) return c.c9_10_5 ?? null;
  if (tog === 13.5) return c.c13_5 ?? null;
  if (tog === 15) return c.c15 ?? null;
  return null;
}

export function chooseRoll(lengthCm: number, widthCm: number, sizeVal: string) {
  if (!Number.isFinite(lengthCm)) return null;
  const isEmperor = String(sizeVal || "").toUpperCase() === "EMPEROR" || (Number(widthCm) >= 290 && Number(lengthCm) === 235);
  if (isEmperor) return 260;
  if (lengthCm <= 200) return 220;
  if (lengthCm <= 240) return 240;
  return 260;
}

export function calculateDuvet(input: DuvetInput): DuvetResult {
  const fibre = FIBRES[input.fibreIndex] ?? FIBRES[0];
  const product = PRODUCT_PRESETS[input.productKey] ?? PRODUCT_PRESETS.ss_without;

  const sizeValue = input.sizeMode === "custom" ? "CUSTOM SIZE" : input.sizePreset;
  const width = input.width;
  const length = input.length;

  const warnings: string[] = [];
  const notes: string[] = [];

  const dimsValid = width > 0 && length > 0;
  if (!dimsValid) warnings.push("duvet.warning.dimensions");

  const constant = pickConstant(fibre, product.mode, input.tog);
  if (constant == null) warnings.push("duvet.warning.constant");

  const area = dimsValid ? sizeArea(sizeValue, width, length) : null;

  let totalKg: number | null = null;
  if (constant != null && dimsValid && area != null) {
    const factor = product.construction === "Sonic Seam" ? 1.028 : 1.0478;
    totalKg = Math.round(((area * input.tog * constant * factor) / 1000) * 100) / 100;
  }

  const breakdown: DuvetBreakdownRow[] = [];
  const labels = ["Fibre 1", "Fibre 2", "Fibre 3"];
  for (let i = 0; i < 3; i += 1) {
    const pr = fibre.prc[i] || 0;
    const code = fibre.codes[i] ?? "—";
    let kg: number | null = null;
    if (totalKg != null && Number.isFinite(totalKg)) {
      kg = i < 2 ? Math.round(pr * totalKg * 1000) / 1000 : pr * totalKg;
    }
    const g = kg != null ? Math.round(kg * 1000) : null;
    breakdown.push({ label: labels[i], code, pct: pr * 100, kg, g });
  }

  const rollWidth = dimsValid ? chooseRoll(length, width, sizeValue) : null;
  if (rollWidth == null) warnings.push("duvet.warning.roll");

  let bindingLength: number | null = null;
  if (product.bound && dimsValid) {
    bindingLength = ((length + width) * 2 * 1.08) / 100;
  }

  let baseFabricLength: number | null = null;
  let corovinLength: number | null = null;
  if (dimsValid && rollWidth != null) {
    const rule = FINISH_RULES[product.finish];
    const adjustedRunCm = (runCm: number) => {
      let adj = (runCm + rule.extra) * 2;
      adj *= rule.factor;
      if (rule.halve) adj /= 2;
      return adj;
    };
    const panels = Math.max(1, Math.ceil(length / rollWidth));
    baseFabricLength = panels * (adjustedRunCm(width) / 100);

    let corovinPercent = 0;
    if (product.corovin) {
      if (rollWidth === 260) corovinPercent = 0.06;
      else if (rollWidth === 220 || rollWidth === 240) corovinPercent = 0.04;
    }
    if (corovinPercent > 0) {
      corovinLength = baseFabricLength * (1 + corovinPercent);
    }
  }

  if (dimsValid) {
    notes.push("duvet.notes.allowances");
    if (rollWidth != null) {
      notes.push("duvet.notes.roll" + `:${rollWidth}`);
    }
    if (product.corovin && corovinLength != null && baseFabricLength != null) {
      const pct = rollWidth === 260 ? 6 : 4;
      notes.push(`duvet.notes.corovin:${pct}`);
    }
  }

  return {
    sizeValue,
    width,
    length,
    area,
    totalKg,
    rollWidth,
    baseFabricLength,
    corovinLength,
    bindingLength,
    breakdown,
    warnings,
    notes,
    fibre,
    product
  };
}

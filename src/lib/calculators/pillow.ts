import type { PillowBreakdownRow, PillowInput, PillowResult } from "./types";

export function calculatePillow(input: PillowInput): PillowResult {
  const fill = input.fillWeight;
  const pcts = [input.pct1, input.pct2, input.pct3];
  const totalPct = pcts.reduce((sum, val) => sum + val, 0);

  const rows: PillowBreakdownRow[] = pcts.map((pct, index) => {
    const kg = Number.isFinite(fill) ? (fill * (pct / 100) * 1.01) / 1000 : null;
    return {
      label: `Fibre ${index + 1}`,
      pct,
      kg: Number.isFinite(kg) ? kg : null
    };
  });

  const warnings: string[] = [];
  if (Math.round(totalPct) !== 100) {
    warnings.push("pillow.total.warn");
  }

  return { totalPct, rows, warnings };
}

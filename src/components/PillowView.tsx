import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { PillowInputs, type PillowFormState } from "@/components/PillowInputs";
import { PillowResults } from "@/components/PillowResults";
import { calculatePillow } from "@/lib/calculators/pillow";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";
import { useI18n } from "@/lib/hooks/useI18n";
import { copyText, downloadCsv, formatFixed, rowsToTsv } from "@/lib/utils";

const defaultState: PillowFormState = {
  fillWeight: 600,
  pct1: 50,
  pct2: 30,
  pct3: 20
};

const clampFinite = (value: number, min: number, max: number) => {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
};

const normalizePcts = (state: PillowFormState) => {
  const next1 = clampFinite(state.pct1, 0, 100);
  const next2 = clampFinite(state.pct2, 0, 100 - next1);
  const next3 = 100 - next1 - next2;
  return { ...state, pct1: next1, pct2: next2, pct3: next3 };
};

export function PillowView() {
  const [state, setState] = useLocalStorageState<PillowFormState>("calc-pillow", defaultState);
  const { t } = useI18n();

  useEffect(() => {
    setState((prev) => {
      const normalized = normalizePcts(prev);
      if (normalized.pct1 === prev.pct1 && normalized.pct2 === prev.pct2 && normalized.pct3 === prev.pct3) {
        return prev;
      }
      return normalized;
    });
  }, [setState]);

  const result = useMemo(
    () =>
      calculatePillow({
        fillWeight: state.fillWeight,
        pct1: state.pct1,
        pct2: state.pct2,
        pct3: state.pct3
      }),
    [state]
  );

  const summary = useMemo(() => {
    const total = formatFixed(result.totalPct, 0);
    const weights = result.rows
      .map((row) => `${row.label}: ${formatFixed(row.kg, 3)}`)
      .join(", ");
    return (
      `${t("dyn.summary.pillow.title")}\n` +
      `${t("dyn.summary.fill")}: ${state.fillWeight} g\n` +
      `%: F1 ${state.pct1} | F2 ${state.pct2} | F3 ${state.pct3} (${t("dyn.summary.total")}: ${total}%)\n` +
      `${t("dyn.summary.weights")}: ${weights}`
    );
  }, [result, state, t]);

  const tableRows = result.rows.map((row) => ({
    fibre: row.label,
    pct: `${formatFixed(row.pct, 0)}%`,
    kg: formatFixed(row.kg, 3)
  }));

  const handleCopySummary = async () => {
    await copyText(summary);
    toast.success(t("toast.summary"));
  };

  const handleCopyTable = async () => {
    const headers = [t("pillow.tbl.fibre"), t("pillow.tbl.pct"), t("pillow.tbl.kg")];
    const tsvRows = result.rows.map((row) => [row.label, `${formatFixed(row.pct, 0)}%`, formatFixed(row.kg, 3)]);
    await copyText(rowsToTsv([headers, ...tsvRows]));
    toast.success(t("toast.table"));
  };

  const handleExportCsv = () => {
    const csvRows = result.rows.map((row) => [row.label, `${formatFixed(row.pct, 0)}%`, formatFixed(row.kg, 3)]);
    downloadCsv("pillow-fibre-breakdown.csv", [t("pillow.tbl.fibre"), t("pillow.tbl.pct"), t("pillow.tbl.kg")], csvRows);
    toast.success(t("toast.csv"));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <PillowInputs state={state} onChange={setState} />
        <PillowResults
          result={result}
          breakdownRows={tableRows}
          onCopySummary={handleCopySummary}
          onCopyTable={handleCopyTable}
          onExportCsv={handleExportCsv}
        />
      </div>
    </div>
  );
}

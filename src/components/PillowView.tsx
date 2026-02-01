import { useMemo } from "react";
import { toast } from "sonner";
import { PillowInputs, type PillowFormState } from "@/components/PillowInputs";
import { PillowResults } from "@/components/PillowResults";
import { BreakdownTable } from "@/components/BreakdownTable";
import { TableToolbar } from "@/components/TableToolbar";
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

export function PillowView() {
  const [state, setState] = useLocalStorageState<PillowFormState>("calc-pillow", defaultState);
  const { t } = useI18n();

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
        <PillowResults result={result} />
      </div>
      <section className="space-y-3">
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t("pillow.calc")}</h3>
            <p className="text-xs text-muted-foreground">{t("pillow.calc.helper")}</p>
          </div>
          <TableToolbar
            copySummaryLabel={t("actions.copySummary")}
            actionsLabel={t("actions.menu")}
            copyTableLabel={t("actions.copyTable")}
            exportCsvLabel={t("actions.exportCsv")}
            copySummaryId="pillow-copy-summary"
            onCopySummary={handleCopySummary}
            onCopyTable={handleCopyTable}
            onExportCsv={handleExportCsv}
          />
        </div>
        <BreakdownTable
          columns={[
            { key: "fibre", label: t("pillow.tbl.fibre") },
            { key: "pct", label: t("pillow.tbl.pct"), align: "right" },
            { key: "kg", label: t("pillow.tbl.kg"), align: "right" }
          ]}
          rows={tableRows}
        />
      </section>
    </div>
  );
}

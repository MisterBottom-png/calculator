import { useMemo } from "react";
import { toast } from "sonner";
import { DuvetInputs, type DuvetFormState } from "@/components/DuvetInputs";
import { DuvetResults } from "@/components/DuvetResults";
import { SIZE_PRESETS, calculateDuvet } from "@/lib/calculators/duvet";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";
import { useI18n } from "@/lib/hooks/useI18n";
import { copyText, downloadCsv, formatFixed, formatNumber, rowsToTsv } from "@/lib/utils";

const defaultState: DuvetFormState = {
  sizeMode: "preset",
  sizePreset: "SINGLE",
  width: 135,
  length: 200,
  productKey: "ss_without",
  togOption: "10.5",
  togCustom: 10.5,
  fibreIndex: 0
};

export function DuvetView() {
  const [state, setState] = useLocalStorageState<DuvetFormState>("calc-duvet", defaultState);
  const { t, language } = useI18n();
  const productLabels = useMemo(
    () => ({
      ss_with: t("dyn.product.ss_with"),
      ss_without: t("dyn.product.ss_without"),
      bd_with: t("dyn.product.bd_with"),
      bd_without: t("dyn.product.bd_without"),
      n_with: t("dyn.product.n_with"),
      n_without: t("dyn.product.n_without"),
      nb_with: t("dyn.product.nb_with"),
      nb_without: t("dyn.product.nb_without")
    }),
    [t]
  );

  const resolved = useMemo(() => {
    const preset = SIZE_PRESETS.find((item) => item.value === state.sizePreset);
    const width = state.sizeMode === "preset" && preset?.width ? preset.width : state.width;
    const length = state.sizeMode === "preset" && preset?.length ? preset.length : state.length;
    const tog = state.togOption === "custom" ? state.togCustom : Number(state.togOption);
    return { width, length, tog };
  }, [state]);

  const result = useMemo(
    () =>
      calculateDuvet({
        sizeMode: state.sizeMode,
        sizePreset: state.sizePreset,
        width: resolved.width,
        length: resolved.length,
        productKey: state.productKey,
        tog: resolved.tog,
        fibreIndex: state.fibreIndex
      }),
    [state, resolved]
  );

  const summary = useMemo(() => {
    const sizePreset = SIZE_PRESETS.find((item) => item.value === state.sizePreset);
    const sizeLabel = state.sizeMode === "custom" ? t("dyn.size.custom") : t(sizePreset?.labelKey ?? "dyn.size.custom");
    const baseLen = result.baseFabricLength != null ? `${formatNumber(result.baseFabricLength, language, { maximumFractionDigits: 2 })} m` : "—";
    const corovin = result.corovinLength != null ? `${formatNumber(result.corovinLength, language, { maximumFractionDigits: 2 })} m` : "—";
    const roll = result.rollWidth != null ? `${result.rollWidth} cm` : "—";
    const binding = result.bindingLength != null ? `${formatNumber(result.bindingLength, language, { maximumFractionDigits: 2 })} m` : null;
    const areaValue = formatFixed(result.area, 2);
    const totalValue = formatFixed(result.totalKg, 2);
    const area = areaValue === "—" ? "—" : `${areaValue} m²`;
    const total = totalValue === "—" ? "—" : `${totalValue} kg`;

    return (
      `${t("dyn.summary.duvet")}: ${sizeLabel} ${resolved.width}×${resolved.length}cm\n` +
      `${t("dyn.summary.product")}: ${productLabels[state.productKey]}\n` +
      `${t("dyn.summary.tog")}: ${resolved.tog}\n` +
      `${t("dyn.summary.fibre")}: ${result.fibre.name}\n` +
      `${t("dyn.summary.area")}: ${area} | ${t("dyn.summary.total")}: ${total}\n` +
      `${t("dyn.summary.base")}: ${baseLen} | ${t("dyn.summary.corovin")}: ${corovin} | ${t("dyn.summary.roll")}: ${roll}` +
      `${binding ? ` | ${t("dyn.summary.binding")}: ${binding}` : ""}`
    );
  }, [result, resolved, state, language, t, productLabels]);

  const tableRows = result.breakdown.map((row) => ({
    component: row.label,
    code: row.code,
    pct: `${formatFixed(row.pct, 1)}%`,
    kg: formatFixed(row.kg, 3),
    g: row.g ?? "—"
  }));

  const handleCopySummary = async () => {
    await copyText(summary);
    toast.success(t("toast.summary"));
  };

  const handleCopyTable = async () => {
    const headers = [t("duvet.tbl.component"), t("duvet.tbl.code"), t("duvet.tbl.pct"), t("duvet.tbl.kg"), t("duvet.tbl.g")];
    const tsvRows = result.breakdown.map((row) => [row.label, row.code, `${formatFixed(row.pct, 1)}%`, formatFixed(row.kg, 3), row.g ?? "—"]);
    await copyText(rowsToTsv([headers, ...tsvRows]));
    toast.success(t("toast.table"));
  };

  const handleExportCsv = () => {
    const csvRows = result.breakdown.map((row) => [row.label, row.code, `${formatFixed(row.pct, 1)}%`, formatFixed(row.kg, 3), row.g ?? "—"]);
    downloadCsv("duvet-fibre-breakdown.csv", [t("duvet.tbl.component"), t("duvet.tbl.code"), t("duvet.tbl.pct"), t("duvet.tbl.kg"), t("duvet.tbl.g")], csvRows);
    toast.success(t("toast.csv"));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <DuvetInputs state={state} onChange={setState} />
        <DuvetResults
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

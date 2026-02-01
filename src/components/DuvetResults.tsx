import { BreakdownTable } from "@/components/BreakdownTable";
import { CalcNotes } from "@/components/CalcNotes";
import { KpiCard } from "@/components/KpiCard";
import { TableToolbar } from "@/components/TableToolbar";
import { WarningsPanel } from "@/components/WarningsPanel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useI18n } from "@/lib/hooks/useI18n";
import { formatFixed, formatNumber } from "@/lib/utils";
import type { DuvetResult } from "@/lib/calculators/types";
import { Card } from "@/components/ui/card";

function parseNotes(notes: string[], t: (key: string) => string) {
  return notes.map((note) => {
    if (note.includes(":")) {
      const [key, value] = note.split(":");
      if (key === "duvet.notes.roll") return `${t(key)}: ${value} cm`;
      if (key === "duvet.notes.corovin") return `${t(key)}: +${value}%`;
    }
    return t(note);
  });
}

type DuvetBreakdownRow = { component: string; code: string; pct: string; kg: string; g: string };

export function DuvetResults({
  result,
  breakdownRows,
  onCopySummary,
  onCopyTable,
  onExportCsv
}: {
  result: DuvetResult;
  breakdownRows: DuvetBreakdownRow[];
  onCopySummary: () => void;
  onCopyTable: () => void;
  onExportCsv: () => void;
}) {
  const { t, language } = useI18n();

  const warnings = result.warnings.map((key) => t(key));
  const notes = parseNotes(result.notes, t);

  const baseValue = result.baseFabricLength != null ? `${formatNumber(result.baseFabricLength, language, { maximumFractionDigits: 2 })} m` : "—";
  const corovinValue = result.corovinLength != null ? `${formatNumber(result.corovinLength, language, { maximumFractionDigits: 2 })} m` : "—";
  const bindingValue = result.bindingLength != null ? `${formatNumber(result.bindingLength, language, { maximumFractionDigits: 2 })} m` : "—";
  const rollValue = result.rollWidth != null ? `${result.rollWidth} cm` : "—";
  const areaValue = formatFixed(result.area, 2);
  const totalValue = formatFixed(result.totalKg, 2);

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t("duvet.glance")}</h3>
        </div>
        <WarningsPanel warnings={warnings} />
        <TooltipProvider>
          <div className="grid gap-4 md:grid-cols-2">
            <KpiCard
              variant="primary"
              label={
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="flex items-center gap-2 text-left">
                      {t("duvet.baseLenLbl")}
                      <span className="text-xs text-muted-foreground">ⓘ</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{t("duvet.baseLenInfo")}</TooltipContent>
                </Tooltip>
              }
              value={baseValue}
            />
            <KpiCard
              label={
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="flex items-center gap-2 text-left">
                      {t("duvet.corovinLenLbl")}
                      <span className="text-xs text-muted-foreground">ⓘ</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{t("duvet.corovinLenInfo")}</TooltipContent>
                </Tooltip>
              }
              value={corovinValue}
            />
            {result.product.bound ? (
              <KpiCard
                label={
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" className="flex items-center gap-2 text-left">
                        {t("duvet.bindingLenLbl")}
                        <span className="text-xs text-muted-foreground">ⓘ</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{t("duvet.bindingLenInfo")}</TooltipContent>
                  </Tooltip>
                }
                value={bindingValue}
              />
            ) : null}
            <KpiCard
              label={
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="flex items-center gap-2 text-left">
                      {t("duvet.rollLbl")}
                      <span className="text-xs text-muted-foreground">ⓘ</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{t("duvet.rollInfo")}</TooltipContent>
                </Tooltip>
              }
              value={rollValue}
            />
          </div>
        </TooltipProvider>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-border bg-muted/40 p-3 text-sm">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{t("duvet.area")}</div>
            <div className="text-lg font-semibold">{areaValue === "—" ? "—" : `${areaValue} m²`}</div>
          </div>
          <div className="rounded-md border border-border bg-muted/40 p-3 text-sm">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">{t("duvet.totalFill")}</div>
            <div className="text-lg font-semibold">{totalValue === "—" ? "—" : `${totalValue} kg`}</div>
          </div>
        </div>
        <CalcNotes title={t("duvet.notes.title")} notes={notes} />
        <div className="border-t border-border pt-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t("duvet.breakdown")}</h4>
              <p className="text-xs text-muted-foreground">{t("duvet.breakdown.helper")}</p>
            </div>
            <TableToolbar
              compact
              copySummaryLabel={t("actions.copySummary")}
              actionsLabel={t("actions.menu")}
              copyTableLabel={t("actions.copyTable")}
              exportCsvLabel={t("actions.exportCsv")}
              copySummaryId="duvet-copy-summary"
              onCopySummary={onCopySummary}
              onCopyTable={onCopyTable}
              onExportCsv={onExportCsv}
            />
          </div>
          <div className="mt-3">
            <BreakdownTable
              columns={[
                { key: "component", label: t("duvet.tbl.component") },
                { key: "code", label: t("duvet.tbl.code") },
                { key: "pct", label: t("duvet.tbl.pct"), align: "right" },
                { key: "kg", label: t("duvet.tbl.kg"), align: "right" },
                { key: "g", label: t("duvet.tbl.g"), align: "right" }
              ]}
              rows={breakdownRows}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

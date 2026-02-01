import { BreakdownTable } from "@/components/BreakdownTable";
import { KpiCard } from "@/components/KpiCard";
import { TableToolbar } from "@/components/TableToolbar";
import { Card } from "@/components/ui/card";
import { WarningsPanel } from "@/components/WarningsPanel";
import { useI18n } from "@/lib/hooks/useI18n";
import { formatFixed } from "@/lib/utils";
import type { PillowResult } from "@/lib/calculators/types";

type PillowBreakdownRow = { fibre: string; pct: string; kg: string };

export function PillowResults({
  result,
  breakdownRows,
  onCopySummary,
  onCopyTable,
  onExportCsv
}: {
  result: PillowResult;
  breakdownRows: PillowBreakdownRow[];
  onCopySummary: () => void;
  onCopyTable: () => void;
  onExportCsv: () => void;
}) {
  const { t } = useI18n();
  const warnings = result.warnings.map((key) => t(key));

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t("pillow.calc")}</h3>
        <WarningsPanel warnings={warnings} />
        <div className="grid gap-4 md:grid-cols-2">
          <KpiCard
            variant="primary"
            label={t("pillow.total")}
            value={`${formatFixed(result.totalPct, 0)}%`}
            helper={t("pillow.calc.helper")}
          />
          <KpiCard
            label={t("pillow.formula")}
            value="1.01×"
            helper={t("pillow.calc.helper")}
          />
        </div>
        <div className="border-t border-border pt-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{t("pillow.breakdown.title")}</h4>
            </div>
            <TableToolbar
              compact
              copySummaryLabel={t("actions.copySummary")}
              actionsLabel={t("actions.menu")}
              copyTableLabel={t("actions.copyTable")}
              exportCsvLabel={t("actions.exportCsv")}
              copySummaryId="pillow-copy-summary"
              onCopySummary={onCopySummary}
              onCopyTable={onCopyTable}
              onExportCsv={onExportCsv}
            />
          </div>
          <div className="mt-3">
            <BreakdownTable
              columns={[
                { key: "fibre", label: t("pillow.tbl.fibre") },
                { key: "pct", label: t("pillow.tbl.pct"), align: "right" },
                { key: "kg", label: t("pillow.tbl.kg"), align: "right" }
              ]}
              rows={breakdownRows}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

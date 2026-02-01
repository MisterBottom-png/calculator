import { Card } from "@/components/ui/card";
import { KpiCard } from "@/components/KpiCard";
import { WarningsPanel } from "@/components/WarningsPanel";
import { useI18n } from "@/lib/hooks/useI18n";
import { formatFixed } from "@/lib/utils";
import type { PillowResult } from "@/lib/calculators/types";

export function PillowResults({ result }: { result: PillowResult }) {
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
      </div>
    </Card>
  );
}

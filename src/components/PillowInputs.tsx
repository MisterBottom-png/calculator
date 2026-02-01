import { Card } from "@/components/ui/card";
import { NumberField } from "@/components/fields/NumberField";
import { useI18n } from "@/lib/hooks/useI18n";

export type PillowFormState = {
  fillWeight: number;
  pct1: number;
  pct2: number;
  pct3: number;
};

export function PillowInputs({ state, onChange }: { state: PillowFormState; onChange: (next: PillowFormState) => void }) {
  const { t } = useI18n();
  const fillError = state.fillWeight <= 0 ? t("validation.positive") : null;

  return (
    <Card className="p-4">
      <div className="space-y-6">
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t("pillow.inputs")}</h3>
          <NumberField
            id="pillow-fill"
            label={t("pillow.fill")}
            value={state.fillWeight}
            min={1}
            step={1}
            onChange={(value) => onChange({ ...state, fillWeight: value })}
            error={fillError}
          />
        </section>
        <section className="space-y-4 border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t("pillow.calc")}</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <NumberField
              id="pillow-pct1"
              label={t("pillow.pct1")}
              value={state.pct1}
              min={0}
              step={1}
              onChange={(value) => onChange({ ...state, pct1: value })}
            />
            <NumberField
              id="pillow-pct2"
              label={t("pillow.pct2")}
              value={state.pct2}
              min={0}
              step={1}
              onChange={(value) => onChange({ ...state, pct2: value })}
            />
            <NumberField
              id="pillow-pct3"
              label={t("pillow.pct3")}
              value={state.pct3}
              min={0}
              step={1}
              onChange={(value) => onChange({ ...state, pct3: value })}
            />
          </div>
          <p className="text-xs text-muted-foreground">{t("pillow.formula")}</p>
        </section>
      </div>
    </Card>
  );
}

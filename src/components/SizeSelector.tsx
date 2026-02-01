import { useMemo } from "react";
import { NumberField } from "@/components/fields/NumberField";
import { SelectField } from "@/components/fields/SelectField";
import { Button } from "@/components/ui/button";
import { SIZE_PRESETS } from "@/lib/calculators/duvet";
import { useI18n } from "@/lib/hooks/useI18n";

export type SizeSelectorState = {
  sizeMode: "preset" | "custom";
  sizePreset: string;
  width: number;
  length: number;
};

export function SizeSelector({ state, onChange }: { state: SizeSelectorState; onChange: (next: SizeSelectorState) => void }) {
  const { t } = useI18n();

  const sizeOptions = useMemo(
    () =>
      SIZE_PRESETS.map((preset) => ({
        value: preset.value,
        label: t(preset.labelKey)
      })),
    [t]
  );

  const sizePreset = SIZE_PRESETS.find((preset) => preset.value === state.sizePreset);
  const width = state.sizeMode === "preset" && sizePreset?.width ? sizePreset.width : state.width;
  const length = state.sizeMode === "preset" && sizePreset?.length ? sizePreset.length : state.length;

  const sizeError = width <= 0 || length <= 0 ? t("validation.positive") : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t("duvet.section.size")}</h3>
        <div className="flex gap-2">
          <Button
            variant={state.sizeMode === "preset" ? "default" : "outline"}
            size="sm"
            onClick={() => onChange({ ...state, sizeMode: "preset" })}
          >
            {t("duvet.sizeMode.preset")}
          </Button>
          <Button
            variant={state.sizeMode === "custom" ? "default" : "outline"}
            size="sm"
            onClick={() => onChange({ ...state, sizeMode: "custom" })}
          >
            {t("duvet.sizeMode.custom")}
          </Button>
        </div>
      </div>
      {state.sizeMode === "preset" ? (
        <SelectField
          id="duvet-size"
          label={t("duvet.sizePreset")}
          value={state.sizePreset}
          onChange={(value) => onChange({ ...state, sizePreset: value })}
          options={sizeOptions}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <NumberField
            id="duvet-width"
            label={t("duvet.widthFinished")}
            value={state.width}
            min={1}
            step={1}
            onChange={(value) => onChange({ ...state, width: value })}
            error={state.width <= 0 ? sizeError : null}
          />
          <NumberField
            id="duvet-length"
            label={t("duvet.lengthFinished")}
            value={state.length}
            min={1}
            step={1}
            onChange={(value) => onChange({ ...state, length: value })}
            error={state.length <= 0 ? sizeError : null}
          />
        </div>
      )}
      <p className="text-xs text-muted-foreground">{t("duvet.size.helper")}</p>
      {state.sizeMode === "preset" ? (
        <div className="grid gap-4 md:grid-cols-2">
          <NumberField
            id="duvet-width-readonly"
            label={t("duvet.widthFinished")}
            value={width}
            min={1}
            step={1}
            onChange={() => undefined}
            disabled
          />
          <NumberField
            id="duvet-length-readonly"
            label={t("duvet.lengthFinished")}
            value={length}
            min={1}
            step={1}
            onChange={() => undefined}
            disabled
          />
        </div>
      ) : null}
    </div>
  );
}

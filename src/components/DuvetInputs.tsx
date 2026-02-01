import { useMemo } from "react";
import { FibreCodesAccordion } from "@/components/FibreCodesAccordion";
import { NumberField } from "@/components/fields/NumberField";
import { SelectField } from "@/components/fields/SelectField";
import { SizeSelector } from "@/components/SizeSelector";
import { Card } from "@/components/ui/card";
import { FIBRES, PRODUCT_PRESETS, TOG_OPTIONS } from "@/lib/calculators/duvet";
import { useI18n } from "@/lib/hooks/useI18n";

export type DuvetFormState = {
  sizeMode: "preset" | "custom";
  sizePreset: string;
  width: number;
  length: number;
  productKey: keyof typeof PRODUCT_PRESETS;
  togOption: string;
  togCustom: number;
  fibreIndex: number;
};

export function DuvetInputs({ state, onChange }: { state: DuvetFormState; onChange: (next: DuvetFormState) => void }) {
  const { t } = useI18n();

  const productGroups = useMemo(
    () => [
      {
        label: t("dyn.product.group.ss"),
        options: [
          { value: "ss_with", label: t("dyn.product.ss_with") },
          { value: "ss_without", label: t("dyn.product.ss_without") }
        ]
      },
      {
        label: t("dyn.product.group.bd"),
        options: [
          { value: "bd_with", label: t("dyn.product.bd_with") },
          { value: "bd_without", label: t("dyn.product.bd_without") }
        ]
      },
      {
        label: t("dyn.product.group.nursery"),
        options: [
          { value: "n_with", label: t("dyn.product.n_with") },
          { value: "n_without", label: t("dyn.product.n_without") },
          { value: "nb_with", label: t("dyn.product.nb_with") },
          { value: "nb_without", label: t("dyn.product.nb_without") }
        ]
      }
    ],
    [t]
  );

  const fibreOptions = useMemo(() => {
    return FIBRES.map((fibre, index) => {
      const ints = fibre.prc.map((p) => Math.round(p * 100)).filter((n) => n > 0);
      const pct = ints.length ? ` (${ints.join("/")})` : "";
      return { value: String(index), label: `${fibre.name}${pct}` };
    });
  }, []);

  const fibreCodes = FIBRES[state.fibreIndex]?.codes.map((code) => code ?? "—") ?? [];

  return (
    <Card className="p-4">
      <div className="space-y-6">
        <section className="space-y-4 border-b border-border pb-6">
          <SizeSelector
            state={{
              sizeMode: state.sizeMode,
              sizePreset: state.sizePreset,
              width: state.width,
              length: state.length
            }}
            onChange={(next) =>
              onChange({
                ...state,
                sizeMode: next.sizeMode,
                sizePreset: next.sizePreset,
                width: next.width,
                length: next.length
              })
            }
          />
        </section>

        <section className="space-y-4 border-b border-border pb-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t("duvet.section.product")}</h3>
          <SelectField
            id="duvet-product"
            label={t("duvet.product")}
            value={state.productKey}
            onChange={(value) => onChange({ ...state, productKey: value as DuvetFormState["productKey"] })}
            options={productGroups}
          />
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t("duvet.section.fill")}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              id="duvet-tog"
              label={t("duvet.tog")}
              value={state.togOption}
              onChange={(value) => onChange({ ...state, togOption: value })}
              options={[
                ...TOG_OPTIONS.map((value) => ({ value, label: value })),
                { value: "custom", label: t("duvet.tog.custom") }
              ]}
            />
            {state.togOption === "custom" ? (
              <NumberField
                id="duvet-tog-custom"
                label={t("duvet.togCustom")}
                value={state.togCustom}
                min={0.5}
                step={0.5}
                onChange={(value) => onChange({ ...state, togCustom: value })}
              />
            ) : null}
          </div>
          <SelectField
            id="duvet-fibre"
            label={t("duvet.fibre")}
            value={String(state.fibreIndex)}
            onChange={(value) => onChange({ ...state, fibreIndex: Number(value) })}
            options={fibreOptions}
          />
          <FibreCodesAccordion title={t("duvet.codes")} codes={fibreCodes} />
        </section>
      </div>
    </Card>
  );
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type NumberFieldProps = {
  id: string;
  label: string;
  value: number;
  min?: number;
  step?: number;
  onChange: (value: number) => void;
  helperText?: string;
  error?: string | null;
  disabled?: boolean;
};

export function NumberField({ id, label, value, min, step, onChange, helperText, error, disabled }: NumberFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        min={min}
        step={step}
        disabled={disabled}
        value={Number.isNaN(value) ? "" : value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={cn(error ? "border-destructive focus-visible:ring-destructive" : "")}
      />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
      {helperText ? <p className="text-xs text-muted-foreground">{helperText}</p> : null}
    </div>
  );
}

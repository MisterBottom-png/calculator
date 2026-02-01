import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  helper,
  variant = "secondary"
}: {
  label: ReactNode;
  value: ReactNode;
  helper?: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Card
      className={cn(
        "border-border/80 bg-muted/40 p-4",
        variant === "primary" && "bg-primary/10 border-primary/30"
      )}
    >
      <div className="flex items-center justify-between text-xs text-muted-foreground">{label}</div>
      <div className={cn("mt-2 text-2xl font-semibold", variant === "primary" && "text-foreground")}>{value}</div>
      {helper ? <p className="mt-2 text-xs text-muted-foreground">{helper}</p> : null}
    </Card>
  );
}

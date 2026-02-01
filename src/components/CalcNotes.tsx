import { Info } from "lucide-react";

export function CalcNotes({ title, notes }: { title: string; notes: string[] }) {
  if (notes.length === 0) return null;
  return (
    <div className="rounded-md border border-border bg-muted/40 p-3 text-sm">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Info className="h-4 w-4" />
        {title}
      </div>
      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

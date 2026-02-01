import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AppShell({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          {header}
        </div>
      </header>
      <main className={cn("mx-auto w-full max-w-6xl px-4 py-6")}>{children}</main>
    </div>
  );
}

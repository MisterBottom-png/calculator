import { useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { DuvetView } from "@/components/DuvetView";
import { PillowView } from "@/components/PillowView";
import { TopBar } from "@/components/TopBar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";
import { useTheme } from "@/components/theme-provider";

export function App() {
  const [activeTab, setActiveTab] = useLocalStorageState("calc-tab", "duvet");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key.toLowerCase() === "t") {
        event.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
      }
      if (event.key.toLowerCase() === "c") {
        event.preventDefault();
        const id = activeTab === "duvet" ? "duvet-copy-summary" : "pillow-copy-summary";
        document.getElementById(id)?.click();
      }
      if (event.key === "?") {
        event.preventDefault();
        document.getElementById("help-trigger")?.click();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [activeTab, setTheme, theme]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <AppShell header={<TopBar />}>
        <TabsContent value="duvet">
          <DuvetView />
        </TabsContent>
        <TabsContent value="pillow">
          <PillowView />
        </TabsContent>
      </AppShell>
    </Tabs>
  );
}

import { Info, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/lib/hooks/useI18n";
import { useTheme } from "@/components/theme-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function TopBar() {
  const { t, language, setLanguage } = useI18n();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold sm:text-2xl">{t("hdr.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("hdr.subtitle")}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <TabsList aria-label="Calculator">
          <TabsTrigger value="duvet">{t("tabs.duvet")}</TabsTrigger>
          <TabsTrigger value="pillow">{t("tabs.pillow")}</TabsTrigger>
        </TabsList>
        <Select value={language} onValueChange={(value) => setLanguage(value as typeof language)}>
          <SelectTrigger className="w-[110px]" aria-label={t("a11y.lang")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">EN</SelectItem>
            <SelectItem value="et">ET</SelectItem>
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <Button id="help-trigger" variant="outline" size="sm">
              <Info className="h-4 w-4" />
              {t("btn.help")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("help.title")}</DialogTitle>
              <DialogDescription>{t("hdr.subtitle")}</DialogDescription>
            </DialogHeader>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="font-medium">t</span> — {t("help.t")}
              </li>
              <li>
                <span className="font-medium">c</span> — {t("help.c")}
              </li>
              <li>
                <span className="font-medium">?</span> — {t("help.q")}
              </li>
              <li>{t("help.auto")}</li>
            </ul>
          </DialogContent>
        </Dialog>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" aria-label={t("shortcuts.title")}>
              <Keyboard className="h-4 w-4" />
              {t("shortcuts.label")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="space-y-2 text-sm">
              <p className="font-medium">{t("shortcuts.title")}</p>
              <div className="text-muted-foreground">
                <p>t — {t("help.t")}</p>
                <p>c — {t("help.c")}</p>
                <p>? — {t("help.q")}</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {t("btn.theme")}: {t(`theme.${theme}`)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>{t("theme.light")}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>{t("theme.dark")}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>{t("theme.system")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

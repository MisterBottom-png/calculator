import React, { createContext, useContext, useMemo } from "react";
import { en } from "@/i18n/en";
import { et } from "@/i18n/et";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";

const dictionaries = { en, et };

export type Language = keyof typeof dictionaries;

type I18nContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof en | string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getDefaultLanguage(): Language {
  if (typeof navigator === "undefined") return "en";
  const lang = (navigator.language || "en").slice(0, 2);
  return lang === "et" ? "et" : "en";
}

export function I18nProvider({ children, forcedLanguage }: { children: React.ReactNode; forcedLanguage?: Language }) {
  const [language, setLanguage] = useLocalStorageState<Language>("calc-lang", getDefaultLanguage());
  const activeLanguage = forcedLanguage ?? language;

  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const dict = dictionaries[activeLanguage] ?? dictionaries.en;
    document.documentElement.lang = activeLanguage;
    document.title = dict["app.title"] ?? document.title;
  }, [activeLanguage]);

  const value = useMemo<I18nContextValue>(() => {
    const dict = dictionaries[activeLanguage] ?? dictionaries.en;
    return {
      language: activeLanguage,
      setLanguage,
      t: (key) => dict[key as keyof typeof dict] ?? key
    };
  }, [activeLanguage, setLanguage]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

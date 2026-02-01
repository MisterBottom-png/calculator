import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/App";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/hooks/useI18n";
import { Toaster } from "sonner";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <App />
        <Toaster position="top-right" richColors closeButton />
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>
);

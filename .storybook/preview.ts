import type { Preview } from "@storybook/react";
import React from "react";
import "../src/index.css";
import { ThemeProvider } from "../src/components/theme-provider";
import { I18nProvider } from "../src/lib/hooks/useI18n";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } }
  },
  globalTypes: {
    theme: {
      description: "Global theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        items: ["light", "dark", "system"],
        dynamicTitle: true
      }
    },
    language: {
      description: "Language",
      defaultValue: "en",
      toolbar: {
        title: "Language",
        items: ["en", "et"],
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider forcedTheme={context.globals.theme}>
        <I18nProvider forcedLanguage={context.globals.language}>
          <div className="min-h-screen bg-background text-foreground p-6">
            <Story />
          </div>
        </I18nProvider>
      </ThemeProvider>
    )
  ]
};

export default preview;

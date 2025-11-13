"use client";

import { type ReactNode } from "react";
import { LanguageProvider } from "~/lib/LanguageContext";
import { ThemeProvider } from "~/lib/ThemeContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}

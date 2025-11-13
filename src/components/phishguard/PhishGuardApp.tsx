"use client";

import { useState } from "react";
import { Header } from "~/components/phishguard/Header";
import { Dashboard } from "~/components/phishguard/Dashboard";
import { ManualAnalysis } from "~/components/phishguard/ManualAnalysis";
import { Pricing } from "~/components/phishguard/Pricing";

export default function PhishGuardApp() {
  const [currentView, setCurrentView] = useState<"dashboard" | "analyze" | "pricing">("dashboard");

  return (
    <>
      <Header
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view as "dashboard" | "analyze" | "pricing")}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentView === "dashboard" && <Dashboard />}
        {currentView === "analyze" && <ManualAnalysis />}
        {currentView === "pricing" && <Pricing />}
      </main>
    </>
  );
}

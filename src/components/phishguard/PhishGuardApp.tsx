"use client";

import { useState } from "react";
import { Header } from "~/components/phishguard/Header";
import { Dashboard } from "~/components/phishguard/Dashboard";
import { ManualAnalysis } from "~/components/phishguard/ManualAnalysis";

export default function PhishGuardApp() {
  const [currentView, setCurrentView] = useState<"dashboard" | "analyze" | "pricing">("dashboard");

  return (
    <>
      <Header
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view as any)}
        userName="Maria Ionescu"
        planType="premium"
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentView === "dashboard" && <Dashboard />}
        {currentView === "analyze" && <ManualAnalysis />}
        {currentView === "pricing" && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Pricing Page
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Coming soon...
            </p>
          </div>
        )}
      </main>
    </>
  );
}

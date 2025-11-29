"use client";

import { useState } from "react";
import { Header } from "~/components/phishguard/Header";
import { Dashboard } from "~/components/phishguard/Dashboard";
import { ManualAnalysis } from "~/components/phishguard/ManualAnalysis";
import { Pricing } from "~/components/phishguard/Pricing";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PhishGuardApp() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialView = searchParams.get("view") as "dashboard" | "analyze" | "pricing" | null;
  const [currentView, setCurrentView] = useState<"dashboard" | "analyze" | "pricing">(initialView || "dashboard");

  // Sync state with URL when view changes
  const handleViewChange = (view: "dashboard" | "analyze" | "pricing") => {
    setCurrentView(view);
    const params = new URLSearchParams(searchParams);
    params.set("view", view);
    const newUrl = `${pathname}?${params.toString()}`;

    // Use pushState for immediate visual update and history entry
    window.history.pushState(null, '', newUrl);
    // Use router.replace to sync Next.js router state without adding another history entry (optional but good for consistency)
    router.replace(newUrl, { scroll: false });
  };

  // Sync URL with state on initial load (if view param exists)
  useEffect(() => {
    const viewParam = searchParams.get("view") as "dashboard" | "analyze" | "pricing" | null;
    if (viewParam && viewParam !== currentView) {
      setCurrentView(viewParam);
    }
  }, [searchParams]);

  return (
    <>
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentView === "dashboard" && <Dashboard />}
        {currentView === "analyze" && <ManualAnalysis />}
        {currentView === "pricing" && <Pricing />}
      </main>
    </>
  );
}

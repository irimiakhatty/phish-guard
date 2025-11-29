"use client";

import { useState, useEffect } from "react";
import { Header } from "~/components/phishguard/Header";
import { Dashboard } from "~/components/phishguard/Dashboard";
import { ManualAnalysis } from "~/components/phishguard/ManualAnalysis";
import { Pricing } from "~/components/phishguard/Pricing";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function PhishGuardApp() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialViewParam = searchParams.get("view") as "dashboard" | "analyze" | "pricing" | null;

  let startView: "dashboard" | "analyze" | "pricing" = "dashboard";
  if (pathname === "/pricing") startView = "pricing";
  else if (pathname === "/analyze") startView = "analyze";
  else if (pathname === "/dashboard") startView = "dashboard";
  else if (initialViewParam) startView = initialViewParam;

  const [currentView, setCurrentView] = useState<"dashboard" | "analyze" | "pricing">(startView);

  // Sync state with URL when view changes
  const handleViewChange = (view: "dashboard" | "analyze" | "pricing") => {
    setCurrentView(view);
    if (view === "dashboard") {
      router.push("/dashboard");
    } else {
      router.push(`/${view}`);
    }
  };

  // Sync URL with state on initial load and path changes
  useEffect(() => {
    if (pathname === "/pricing") setCurrentView("pricing");
    else if (pathname === "/analyze") setCurrentView("analyze");
    else if (pathname === "/dashboard") setCurrentView("dashboard");
    else {
      const viewParam = searchParams.get("view") as "dashboard" | "analyze" | "pricing" | null;
      if (viewParam) setCurrentView(viewParam);
    }
  }, [pathname, searchParams]);

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

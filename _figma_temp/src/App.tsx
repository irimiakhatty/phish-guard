import { useState } from "react";
import { Shield, Zap, Eye, Mail, Chrome, CheckCircle, ArrowRight } from "lucide-react";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { ManualAnalysis } from "./components/ManualAnalysis";
import { PricingCard } from "./components/PricingCard";
import { BrowserExtensionPopup } from "./components/BrowserExtensionPopup";
import { PlanSelectionDialog } from "./components/PlanSelectionDialog";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { LanguageProvider, useLanguage } from "./lib/LanguageContext";
import { ThemeProvider } from "./lib/ThemeContext";

function AppContent() {
  const { t, language } = useLanguage();
  const [currentView, setCurrentView] = useState<"dashboard" | "analyze" | "pricing">("dashboard");
  const [showExtensionDemo, setShowExtensionDemo] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<{name: string; price: string; period: string} | null>(null);

  const userName = language === 'ro' ? 'Maria Ionescu' : 'Maria Johnson';

  const handlePlanSelect = (name: string, price: string, period: string) => {
    setSelectedPlan({ name, price, period });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view as any)}
        userName={userName}
        planType="premium"
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentView === "dashboard" && (
          <div className="space-y-6">
            {/* Extension Demo Notification */}
            {showExtensionDemo && (
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Chrome className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-gray-900 dark:text-white">{t.dashboard.extensionInstalled}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {t.dashboard.extensionMonitoring}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowExtensionDemo(false)}
                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                      >
                        {t.dashboard.understood}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Extension Popup Demo */}
            {showExtensionDemo && (
              <div className="flex justify-end">
                <div className="animate-in slide-in-from-right">
                  <BrowserExtensionPopup onClose={() => setShowExtensionDemo(false)} />
                </div>
              </div>
            )}

            <Dashboard />
          </div>
        )}

        {currentView === "analyze" && <ManualAnalysis />}

        {currentView === "pricing" && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8">
              <h1 className="text-gray-900 dark:text-white">
                {t.pricing.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t.pricing.subtitle}
              </p>
            </div>

            {/* Feature Comparison */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-8">
              <h3 className="text-gray-900 dark:text-white mb-4 text-center">{t.pricing.whyPremium}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 dark:bg-blue-700 p-2 rounded-lg flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white mb-1">{t.pricing.realTimeProtection}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t.pricing.realTimeDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 dark:bg-blue-700 p-2 rounded-lg flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white mb-1">{t.pricing.emailMonitoring}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t.pricing.emailDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 dark:bg-blue-700 p-2 rounded-lg flex-shrink-0">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white mb-1">{t.pricing.webAnalysis}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t.pricing.webDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <PricingCard
                name={t.pricing.freeTrial}
                price={language === 'ro' ? 'Gratuit' : 'Free'}
                period={t.pricing.freeTrialPeriod}
                description={t.pricing.freeTrialDesc}
                features={t.pricing.freeTrialFeatures}
                buttonText={t.pricing.startTrial}
                onSelect={() => handlePlanSelect(t.pricing.freeTrial, language === 'ro' ? 'Gratuit' : 'Free', t.pricing.freeTrialPeriod)}
              />

              <PricingCard
                name={t.pricing.premium}
                price={t.pricing.premiumPrice}
                period={t.pricing.month}
                description={t.pricing.premiumDesc}
                features={t.pricing.premiumFeatures}
                highlighted
                badge={t.pricing.recommended}
                buttonText={t.pricing.upgradeToPremium}
                onSelect={() => handlePlanSelect(t.pricing.premium, t.pricing.premiumPrice, t.pricing.month)}
              />

              <PricingCard
                name={t.pricing.business}
                price={t.pricing.businessPrice}
                period={t.pricing.month}
                description={t.pricing.businessDesc}
                features={t.pricing.businessFeatures}
                buttonText={t.pricing.contactSales}
                onSelect={() => handlePlanSelect(t.pricing.business, t.pricing.businessPrice, t.pricing.month)}
              />
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 max-w-4xl mx-auto">
              <h3 className="text-gray-900 dark:text-white mb-6 text-center">{t.pricing.faq}</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-gray-900 dark:text-white mb-2">
                    {t.pricing.faqQ1}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t.pricing.faqA1}
                  </p>
                </div>

                <div>
                  <h4 className="text-gray-900 dark:text-white mb-2">
                    {t.pricing.faqQ2}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t.pricing.faqA2}
                  </p>
                </div>

                <div>
                  <h4 className="text-gray-900 dark:text-white mb-2">
                    {t.pricing.faqQ3}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t.pricing.faqA3}
                  </p>
                </div>

                <div>
                  <h4 className="text-gray-900 dark:text-white mb-2">
                    {t.pricing.faqQ4}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t.pricing.faqA4}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
              <Shield className="w-16 h-16 mx-auto mb-4 text-white/90" />
              <h2 className="text-white mb-4">
                {t.pricing.readyToProtect}
              </h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                {t.pricing.ctaSubtitle}
              </p>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                {t.pricing.startFreeTrial}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-sm text-blue-100 mt-4">
                {t.pricing.noCardRequired}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-1.5 rounded">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-900 dark:text-white">PhishGuard</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <h4 className="text-gray-900 dark:text-white mb-3">{t.footer.product}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t.footer.features}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t.footer.pricing}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t.footer.browserExtension}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t.footer.api}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 dark:text-white mb-3">{t.footer.resources}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t.footer.blog}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t.footer.securityGuides}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t.footer.documentation}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t.footer.support}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 dark:text-white mb-3">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t.footer.terms}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t.footer.privacy}</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">{t.footer.cookies}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.footer.rights}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>{t.footer.protecting}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Plan Selection Dialog */}
      {selectedPlan && (
        <PlanSelectionDialog
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
          planPeriod={selectedPlan.period}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}
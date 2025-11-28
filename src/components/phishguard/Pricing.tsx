"use client";

import { useLanguage } from "~/lib/LanguageContext";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Check } from "lucide-react";

export function Pricing() {
  const { t } = useLanguage();

  const plans = [
    {
      name: t.pricing.freeTrial,
      price: t.pricing.freeTrialPeriod,
      priceLabel: "",
      description: t.pricing.freeTrialDesc,
      features: t.pricing.freeTrialFeatures,
      buttonText: t.pricing.startTrial,
      buttonVariant: "outline" as const,
      highlighted: false,
    },
    {
      name: t.pricing.premium,
      price: t.pricing.premiumPrice,
      priceLabel: t.pricing.month,
      description: t.pricing.premiumDesc,
      features: t.pricing.premiumFeatures,
      buttonText: t.pricing.upgradeToPremium,
      buttonVariant: "default" as const,
      highlighted: true,
      badge: t.pricing.recommended,
    },
    {
      name: t.pricing.business,
      price: t.pricing.businessPrice,
      priceLabel: t.pricing.month,
      description: t.pricing.businessDesc,
      features: t.pricing.businessFeatures,
      buttonText: t.pricing.contactSales,
      buttonVariant: "outline" as const,
      highlighted: false,
    },
  ];

  const faqs = [
    { question: t.pricing.faqQ1, answer: t.pricing.faqA1 },
    { question: t.pricing.faqQ2, answer: t.pricing.faqA2 },
    { question: t.pricing.faqQ3, answer: t.pricing.faqA3 },
    { question: t.pricing.faqQ4, answer: t.pricing.faqA4 },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {t.pricing.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t.pricing.subtitle}
        </p>
      </div>

      {/* Why Premium Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {t.pricing.realTimeProtection}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t.pricing.realTimeDesc}
          </p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {t.pricing.emailMonitoring}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t.pricing.emailDesc}
          </p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {t.pricing.webAnalysis}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t.pricing.webDesc}
          </p>
        </Card>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-8 relative ${
              plan.highlighted
                ? "border-2 border-blue-500 dark:border-blue-400 shadow-lg"
                : ""
            }`}
          >
            {plan.badge && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white">
                {plan.badge}
              </Badge>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">
                  {plan.priceLabel}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {plan.description}
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.buttonVariant}
              className="w-full"
              size="lg"
            >
              {plan.buttonText}
            </Button>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          {t.pricing.faq}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="p-8 md:p-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">{t.pricing.readyToProtect}</h2>
        <p className="text-lg mb-8 opacity-90">{t.pricing.ctaSubtitle}</p>
        <Button size="lg" variant="secondary" className="mb-4">
          {t.pricing.startFreeTrial}
        </Button>
        <p className="text-sm opacity-75">{t.pricing.noCardRequired}</p>
      </Card>
    </div>
  );
}

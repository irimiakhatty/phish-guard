"use client";

import Image from "next/image";
import { Shield, CheckCircle, Zap, Lock, Mail, Globe, Moon, Sun } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useLanguage } from "~/lib/LanguageContext";
import { useTheme } from "~/lib/ThemeContext";

export function LandingPage() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: Shield,
      title: language === "ro" ? "Protecție în Timp Real" : "Real-Time Protection",
      description: language === "ro"
        ? "Scanare automată 24/7 pentru amenințări de phishing"
        : "24/7 automatic scanning for phishing threats",
    },
    {
      icon: Mail,
      title: language === "ro" ? "Monitorizare Email" : "Email Monitoring",
      description: language === "ro"
        ? "Integrare directă cu serviciile tale de email"
        : "Direct integration with your email services",
    },
    {
      icon: Zap,
      title: language === "ro" ? "Analiză AI Avansată" : "Advanced AI Analysis",
      description: language === "ro"
        ? "Detectare inteligentă alimentată de inteligență artificială"
        : "AI-powered intelligent threat detection",
    },
    {
      icon: Lock,
      title: language === "ro" ? "Date Securizate" : "Secure Data",
      description: language === "ro"
        ? "Criptare de nivel enterprise pentru datele tale"
        : "Enterprise-grade encryption for your data",
    },
  ];

  const stats = [
    { value: "10,000+", label: language === "ro" ? "Utilizatori Activi" : "Active Users" },
    { value: "1M+", label: language === "ro" ? "Amenințări Blocate" : "Threats Blocked" },
    { value: "99.9%", label: language === "ro" ? "Rată de Detectare" : "Detection Rate" },
    { value: "24/7", label: language === "ro" ? "Suport" : "Support" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
              <Image
                src="/logo.png"
                alt="PhishGuard Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">PhishGuard</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === "ro" ? "Protecție Avansată Împotriva Înșelătoriilor" : "Advanced Protection Against Scams"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "ro" ? "en" : "ro")}
              className="gap-2 dark:text-gray-300"
            >
              <Globe className="w-4 h-4" />
              {language === "ro" ? "RO" : "EN"}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="gap-2 dark:text-gray-300"
            >
              {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            <SignInButton mode="modal">
              <Button variant="ghost">
                {language === "ro" ? "Autentificare" : "Sign In"}
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>
                {language === "ro" ? "Înregistrare Gratuită" : "Sign Up Free"}
              </Button>
            </SignUpButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 rounded-full text-blue-700 dark:text-blue-400 text-sm font-medium mb-8">
          <Shield className="w-4 h-4" />
          {language === "ro" ? "Încrederea a peste 10,000+ utilizatori" : "Trusted by 10,000+ users"}
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          {language === "ro"
            ? "Protejează-te de Escrocheriile Online"
            : "Protect Yourself from Online Scams"}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          {language === "ro"
            ? "PhishGuard folosește inteligență artificială avansată pentru a detecta și bloca tentativele de phishing, email-urile frauduloase și site-urile web periculoase înainte să te poată afecta."
            : "PhishGuard uses advanced AI to detect and block phishing attempts, fraudulent emails, and dangerous websites before they can harm you."}
        </p>

        <div className="flex items-center justify-center gap-4 mb-12">
          <SignUpButton mode="modal">
            <Button size="lg" className="text-lg px-8">
              {language === "ro" ? "Începe Testul Gratuit" : "Start Free Trial"}
            </Button>
          </SignUpButton>
          <Button size="lg" variant="outline" className="text-lg px-8">
            {language === "ro" ? "Vezi Demo" : "Watch Demo"}
          </Button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {language === "ro"
            ? "Nu este necesar card de credit • Anulare oricând"
            : "No credit card required • Cancel anytime"}
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === "ro" ? "De Ce PhishGuard?" : "Why PhishGuard?"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {language === "ro"
              ? "Protecție completă împotriva amenințărilor online"
              : "Complete protection against online threats"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {language === "ro" ? "Ce Spun Utilizatorii" : "What Users Say"}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <CheckCircle key={j} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {language === "ro"
                    ? "PhishGuard m-a salvat de nenumărate tentative de phishing. Esențial pentru oricine lucrează online!"
                    : "PhishGuard has saved me from countless phishing attempts. Essential for anyone working online!"}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {language === "ro" ? "Maria I." : "Maria I."}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {language === "ro" ? "Designer Freelance" : "Freelance Designer"}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Card className="p-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">
            {language === "ro" ? "Gata să Te Protejezi?" : "Ready to Protect Yourself?"}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {language === "ro"
              ? "Alătură-te miilor de utilizatori care rămân în siguranță online cu PhishGuard."
              : "Join thousands of users staying safe online with PhishGuard."}
          </p>
          <SignUpButton mode="modal">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              {language === "ro" ? "Începe Testul Gratuit" : "Start Free Trial"}
            </Button>
          </SignUpButton>
          <p className="text-sm mt-4 opacity-75">
            {language === "ro"
              ? "Nu este necesar card de credit • Anulare oricând"
              : "No credit card required • Cancel anytime"}
          </p>
        </Card>
      </section>
    </div >
  );
}

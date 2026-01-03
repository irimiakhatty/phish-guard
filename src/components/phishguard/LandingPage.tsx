"use client";

import { Shield, Zap, Brain, Lock, CheckCircle, Users, Building, Heart, ArrowRight, Star, Sparkles, Globe, Moon, Sun, Chrome, Mail, Eye } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { useLanguage } from "~/lib/LanguageContext";
import { useTheme } from "~/lib/ThemeContext";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export function LandingPage() {
    const { t, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20">
            {/* Floating Controls - Top Right */}
            <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
                {/* Language Toggle */}
                <button
                    onClick={toggleLanguage}
                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-full px-4 py-2.5 flex items-center gap-2 hover:shadow-xl hover:scale-105 transition-all shadow-lg group"
                >
                    <Globe className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm text-gray-900 dark:text-white">{language === 'ro' ? 'RO' : 'EN'}</span>
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-full p-2.5 hover:shadow-xl hover:scale-105 transition-all shadow-lg group"
                >
                    {theme === 'light' ? (
                        <Moon className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                    ) : (
                        <Sun className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                    )}
                </button>

                {/* Sign In Button */}
                <SignInButton mode="modal">
                    <Button variant="outline" className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-700 rounded-full px-6 py-2.5 hover:shadow-xl hover:scale-105 transition-all shadow-lg">
                        {language === 'ro' ? 'Autentificare' : 'Sign In'}
                    </Button>
                </SignInButton>
            </div>

            {/* Hero Section - Full Screen */}
            <section className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-20">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
                    <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-blue-400/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Column - Content */}
                        <div className="space-y-10 text-center lg:text-left">
                            {/* Logo & Brand */}
                            <div className="flex items-center gap-3 justify-center lg:justify-start">
                                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-xl shadow-blue-500/30">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-3xl text-gray-900 dark:text-white">PhishGuard</span>
                            </div>

                            {/* Trust Badge */}
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 px-6 py-3 rounded-full border border-blue-200 dark:border-blue-800">
                                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-blue-700 dark:text-blue-300">{t.landing.trustedBy} {t.landing.activeUsers}</span>
                            </div>

                            {/* Main Headline */}
                            <div className="space-y-6">
                                <h1 className="text-6xl lg:text-7xl xl:text-8xl text-gray-900 dark:text-white leading-[1.1]">
                                    {t.landing.heroTitle}
                                </h1>
                                <p className="text-2xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    {t.landing.heroSubtitle}
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <SignUpButton mode="modal">
                                    <Button
                                        size="lg"
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/40 text-xl px-10 py-8 group"
                                    >
                                        {t.landing.getStartedFree}
                                        <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </SignUpButton>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-6">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    <span className="text-gray-600 dark:text-gray-400">{t.pricing.noCardRequired.split(' • ')[0]}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    <span className="text-gray-600 dark:text-gray-400">{t.landing.trialShortText}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                    <span className="text-gray-600 dark:text-gray-400">{language === 'ro' ? 'Anulare oricând' : 'Cancel anytime'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Visual */}
                        <div className="relative flex items-center justify-center min-h-[700px]">
                            {/* Main Shield with Gradient */}
                            <div className="relative z-20 w-full max-w-[500px] mx-auto">
                                {/* Pulsing glow effect */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-[400px] h-[400px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                                </div>

                                {/* Main Shield Container */}
                                <div className="relative aspect-square transform transition-all duration-700 hover:scale-105 hover:rotate-3">
                                    {/* Shield SVG */}
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" className="w-full h-full max-w-[380px] max-h-[380px] drop-shadow-2xl">
                                            <defs>
                                                <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#3b82f6" />
                                                    <stop offset="50%" stopColor="#8b5cf6" />
                                                    <stop offset="100%" stopColor="#3b82f6" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M12 2L4 5v6.09c0 5.29 3.66 10.25 8 11.41 4.34-1.16 8-6.12 8-11.41V5l-8-3z"
                                                fill="url(#shieldGradient)"
                                                stroke="none"
                                            />
                                        </svg>

                                        {/* Center checkmark - positioned absolutely within shield */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-white dark:bg-gray-900 rounded-full p-6 shadow-2xl">
                                                <CheckCircle className="w-20 h-20 text-blue-600 dark:text-blue-400" strokeWidth={2.5} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Feature Cards - positioned relative to container */}
                                <div className="absolute -top-8 -left-16 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-5 rounded-2xl border-2 border-green-200 dark:border-green-800 shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
                                            <CheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-2xl text-gray-900 dark:text-white">99.8%</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{t.landing.statsAccuracy}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -bottom-8 -right-12 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-5 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-2xl" style={{ animation: 'bounce 3s infinite 1s' }}>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                                            <Zap className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-2xl text-gray-900 dark:text-white">50K+</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{t.landing.statsThreats}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-1/2 -translate-y-1/2 -right-20 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-5 rounded-2xl border-2 border-purple-200 dark:border-purple-800 shadow-2xl" style={{ animation: 'bounce 3s infinite 0.5s' }}>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                                            <Shield className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-2xl text-gray-900 dark:text-white">{"<"}1s</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{t.landing.statsResponse}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-20 px-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-y border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        <div className="text-center group cursor-default">
                            <div className="text-6xl bg-gradient-to-br from-blue-600 to-blue-700 bg-clip-text text-transparent mb-3 transition-transform group-hover:scale-110">50K+</div>
                            <div className="text-gray-600 dark:text-gray-400">{t.landing.statsThreats}</div>
                        </div>
                        <div className="text-center group cursor-default">
                            <div className="text-6xl bg-gradient-to-br from-green-600 to-green-700 bg-clip-text text-transparent mb-3 transition-transform group-hover:scale-110">99.8%</div>
                            <div className="text-gray-600 dark:text-gray-400">{t.landing.statsAccuracy}</div>
                        </div>
                        <div className="text-center group cursor-default">
                            <div className="text-6xl bg-gradient-to-br from-purple-600 to-purple-700 bg-clip-text text-transparent mb-3 transition-transform group-hover:scale-110">{"<"}1s</div>
                            <div className="text-gray-600 dark:text-gray-400">{t.landing.statsResponse}</div>
                        </div>
                        <div className="text-center group cursor-default">
                            <div className="text-6xl bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent mb-3 transition-transform group-hover:scale-110">10K+</div>
                            <div className="text-gray-600 dark:text-gray-400">{t.landing.statsUsers}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-32 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-6 mb-24">
                        <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-950/50 px-6 py-3 rounded-full">
                            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <span className="text-blue-700 dark:text-blue-300">{t.landing.howItWorks}</span>
                        </div>
                        <h2 className="text-5xl lg:text-6xl text-gray-900 dark:text-white">
                            {t.landing.howItWorksSubtitle}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Feature 1 - Real-time */}
                        <Card className="group relative overflow-hidden border-2 border-transparent hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 bg-white dark:bg-gray-900">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardContent className="pt-12 pb-10 space-y-6 relative">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-blue-500/40">
                                    <Zap className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl text-gray-900 dark:text-white">
                                    {t.landing.featureRealTime}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {t.landing.featureRealTimeDesc}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 2 - AI */}
                        <Card className="group relative overflow-hidden border-2 border-transparent hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 bg-white dark:bg-gray-900">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardContent className="pt-12 pb-10 space-y-6 relative">
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-purple-500/40">
                                    <Brain className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl text-gray-900 dark:text-white">
                                    {t.landing.featureAI}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {t.landing.featureAIDesc}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 3 - Block */}
                        <Card className="group relative overflow-hidden border-2 border-transparent hover:border-green-400 dark:hover:border-green-600 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 bg-white dark:bg-gray-900">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardContent className="pt-12 pb-10 space-y-6 relative">
                                <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-green-500/40">
                                    <Lock className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl text-gray-900 dark:text-white">
                                    {t.landing.featureBlock}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {t.landing.featureBlockDesc}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Premium Features Showcase */}
            <section className="py-32 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center space-y-6 mb-20">
                        <h2 className="text-5xl lg:text-6xl text-white">
                            {t.pricing.whyPremium}
                        </h2>
                        <p className="text-2xl text-blue-100 max-w-3xl mx-auto">
                            {language === 'ro' ? 'Obține protecție completă cu funcțiile premium' : 'Get complete protection with premium features'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Real-time Protection */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 hover:bg-white/20 transition-all duration-500 group">
                            <div className="bg-white/20 p-5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl text-white mb-4">{t.pricing.realTimeProtection}</h3>
                            <p className="text-blue-100 text-lg leading-relaxed">
                                {t.pricing.realTimeDesc}
                            </p>
                        </div>

                        {/* Email Monitoring */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 hover:bg-white/20 transition-all duration-500 group">
                            <div className="bg-white/20 p-5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                                <Mail className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl text-white mb-4">{t.pricing.emailMonitoring}</h3>
                            <p className="text-blue-100 text-lg leading-relaxed">
                                {t.pricing.emailDesc}
                            </p>
                        </div>

                        {/* Web Analysis */}
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 hover:bg-white/20 transition-all duration-500 group">
                            <div className="bg-white/20 p-5 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
                                <Eye className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl text-white mb-4">{t.pricing.webAnalysis}</h3>
                            <p className="text-blue-100 text-lg leading-relaxed">
                                {t.pricing.webDesc}
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-16">
                        <SignUpButton mode="modal">
                            <Button
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl text-xl px-12 py-8 group"
                            >
                                {language === 'ro' ? 'Începe trial-ul gratuit de 7 zile' : 'Start 7-day free trial'}
                                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </SignUpButton>
                        <p className="text-blue-100 mt-6 text-lg">
                            {t.pricing.noCardRequired}
                        </p>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-32 px-6 bg-white dark:bg-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-6 mb-24">
                        <h2 className="text-5xl lg:text-6xl text-gray-900 dark:text-white">
                            {t.landing.useCasesTitle}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Individuals */}
                        <Card className="group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30">
                            <CardContent className="pt-16 pb-12 space-y-8 text-center">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-7 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto shadow-xl shadow-blue-500/40 group-hover:scale-110 transition-transform">
                                    <Users className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-3xl text-gray-900 dark:text-white">
                                    {t.landing.individuals}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {t.landing.individualsDesc}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Businesses */}
                        <Card className="group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/30">
                            <CardContent className="pt-16 pb-12 space-y-8 text-center">
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-7 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto shadow-xl shadow-purple-500/40 group-hover:scale-110 transition-transform">
                                    <Building className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-3xl text-gray-900 dark:text-white">
                                    {t.landing.businesses}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {t.landing.businessesDesc}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Families */}
                        <Card className="group hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 bg-gradient-to-br from-white to-green-50/30 dark:from-gray-900 dark:to-green-950/30">
                            <CardContent className="pt-16 pb-12 space-y-8 text-center">
                                <div className="bg-gradient-to-br from-green-500 to-green-600 p-7 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto shadow-xl shadow-green-500/40 group-hover:scale-110 transition-transform">
                                    <Heart className="w-12 h-12 text-white" />
                                </div>
                                <h3 className="text-3xl text-gray-900 dark:text-white">
                                    {t.landing.families}
                                </h3>
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {t.landing.familiesDesc}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-32 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-6 mb-24">
                        <h2 className="text-5xl lg:text-6xl text-gray-900 dark:text-white">
                            {t.landing.testimonialsTitle}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Testimonial 1 */}
                        <Card className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-gray-900">
                            <CardContent className="pt-10 pb-10 space-y-8">
                                <div className="flex gap-1.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl italic">
                                    "{t.landing.testimonial1}"
                                </p>
                                <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                                    <div className="text-xl text-gray-900 dark:text-white">{t.landing.testimonial1Author}</div>
                                    <div className="text-gray-500 dark:text-gray-400 mt-1">{t.landing.testimonial1Role}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Testimonial 2 */}
                        <Card className="group hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 bg-white dark:bg-gray-900">
                            <CardContent className="pt-10 pb-10 space-y-8">
                                <div className="flex gap-1.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl italic">
                                    "{t.landing.testimonial2}"
                                </p>
                                <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                                    <div className="text-xl text-gray-900 dark:text-white">{t.landing.testimonial2Author}</div>
                                    <div className="text-gray-500 dark:text-gray-400 mt-1">{t.landing.testimonial2Role}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Testimonial 3 */}
                        <Card className="group hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 border-2 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 bg-white dark:bg-gray-900">
                            <CardContent className="pt-10 pb-10 space-y-8">
                                <div className="flex gap-1.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl italic">
                                    "{t.landing.testimonial3}"
                                </p>
                                <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                                    <div className="text-xl text-gray-900 dark:text-white">{t.landing.testimonial3Author}</div>
                                    <div className="text-gray-500 dark:text-gray-400 mt-1">{t.landing.testimonial3Role}</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-32 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center space-y-12">
                        <div className="bg-white/20 backdrop-blur-sm p-8 rounded-full w-fit mx-auto">
                            <Shield className="w-32 h-32 text-white" />
                        </div>

                        <h2 className="text-5xl lg:text-6xl text-white">
                            {t.landing.ctaTitle}
                        </h2>

                        <p className="text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            {t.landing.ctaSubtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                            <SignUpButton mode="modal">
                                <Button
                                    size="lg"
                                    className="bg-white text-blue-600 hover:bg-blue-50 shadow-2xl text-2xl px-14 py-10 group"
                                >
                                    {t.landing.ctaButton}
                                    <ArrowRight className="w-7 h-7 ml-3 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </SignUpButton>
                        </div>

                        <div className="flex flex-col items-center gap-4 pt-6">
                            <p className="text-blue-100 text-lg">
                                {t.pricing.noCardRequired}
                            </p>
                            <div className="flex flex-wrap items-center gap-6 justify-center">
                                <div className="flex items-center gap-2 text-blue-100">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>7 {language === 'ro' ? 'zile trial gratuit' : 'day free trial'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-blue-100">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>{language === 'ro' ? 'Anulare oricând' : 'Cancel anytime'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

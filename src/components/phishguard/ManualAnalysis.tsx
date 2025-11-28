"use client";

import { useState } from "react";
import { Send, Link as LinkIcon, FileText, Image as ImageIcon, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Badge } from "~/components/ui/badge";
import { ThreatAlert } from "./ThreatAlert";
import { useLanguage } from "~/lib/LanguageContext";

export function ManualAnalysis() {
  const { t, language } = useLanguage();
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
    }, 2000);
  };

  const sampleText = language === 'ro' 
    ? "Bună ziua,\n\nContul dumneavoastră PayPal a fost suspendat temporar din cauza activității suspecte. Pentru a-l reactiva, vă rugăm să vă conectați imediat la:\n\nhttps://secure-paypal-verify.xyz/login\n\nAveți la dispoziție 24 de ore pentru a evita închiderea permanentă a contului.\n\nEchipa PayPal"
    : "Hello,\n\nYour PayPal account has been temporarily suspended due to suspicious activity. To reactivate it, please log in immediately at:\n\nhttps://secure-paypal-verify.xyz/login\n\nYou have 24 hours to avoid permanent account closure.\n\nPayPal Team";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.manualAnalysis.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t.manualAnalysis.description}
          </p>
        </div>
        <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700">
          <Sparkles className="w-3 h-3 mr-1" />
          {t.manualAnalysis.freeTrialActive}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">{t.manualAnalysis.enterContent}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-3 dark:bg-gray-800">
                <TabsTrigger value="text" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
                  <FileText className="w-4 h-4 mr-2" />
                  {t.manualAnalysis.text}
                </TabsTrigger>
                <TabsTrigger value="url" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  {t.manualAnalysis.url}
                </TabsTrigger>
                <TabsTrigger value="image" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  {t.manualAnalysis.image}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <Textarea
                  placeholder={t.manualAnalysis.pasteMessage}
                  className="min-h-[200px] resize-none"
                  defaultValue={sampleText}
                />
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <Textarea
                  placeholder={t.manualAnalysis.pasteUrl}
                  className="min-h-[200px] resize-none font-mono"
                  defaultValue="https://banc-raiffeisen-verificare.xyz/login?urgent=1&token=abc123"
                />
              </TabsContent>

              <TabsContent value="image" className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
                  <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400 mb-1">{t.manualAnalysis.uploadImage}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{t.manualAnalysis.dragDrop}</p>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleAnalyze}
              disabled={analyzing}
            >
              {analyzing ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.manualAnalysis.analyzing}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {t.manualAnalysis.analyzeNow}
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
              {t.manualAnalysis.freeAnalysis}
            </p>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className={`dark:bg-gray-900 dark:border-gray-700 ${showResult ? "" : "opacity-50"}`}>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">{t.manualAnalysis.results}</CardTitle>
          </CardHeader>
          <CardContent>
            {!showResult ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  {t.manualAnalysis.resultsWillAppear}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <ThreatAlert
                  level="high"
                  title={t.manualAnalysis.phishingDetected}
                  description={t.manualAnalysis.phishingDescription}
                  indicators={t.threatAlert.phishingIndicators}
                  recommendations={t.threatAlert.phishingRecommendations}
                />

                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="text-blue-900 dark:text-blue-300 mb-2">💡 {t.manualAnalysis.proTip}</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    {t.manualAnalysis.proTipText}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                3/10
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t.manualAnalysis.freeAnalysesRemaining}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                12
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t.manualAnalysis.scamsDetected}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                5
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t.manualAnalysis.daysRemaining}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

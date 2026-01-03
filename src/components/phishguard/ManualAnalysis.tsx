"use client";
// Last updated: 2026-01-03 16:10

import { useState, useEffect } from "react";
import { Send, Link as LinkIcon, FileText, Image as ImageIcon, Sparkles, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Badge } from "~/components/ui/badge";
import { ThreatAlert } from "./ThreatAlert";
import { useLanguage } from "~/lib/LanguageContext";
import * as tf from "@tensorflow/tfjs";
import { scanContent } from "~/server/actions";

// Configuration (Must match extension)
const TEXT_MAX_LEN = 150;
const URL_MAX_LEN = 150;
const TEXT_OOV = "<OOV>";
const URL_OOV = "<OOV>";

export function ManualAnalysis() {
  const { t, language } = useLanguage();
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("text");
  const [textContent, setTextContent] = useState("");
  const [urlContent, setUrlContent] = useState("");

  // AI Models
  const [textModel, setTextModel] = useState<tf.LayersModel | null>(null);
  const [urlModel, setUrlModel] = useState<tf.LayersModel | null>(null);
  const [textVocab, setTextVocab] = useState<any>(null);
  const [urlVocab, setUrlVocab] = useState<any>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadModels() {
      try {
        console.log("Starting model load...");
        setLoadError(null);

        const tm = await tf.loadLayersModel('/assets/text_model/model.json');
        console.log("Text model loaded");

        const um = await tf.loadLayersModel('/assets/url_model/model.json');
        console.log("URL model loaded");

        const tvReq = await fetch('/assets/word_index.json');
        const tv = await tvReq.json();
        console.log("Text vocab loaded");

        const uvReq = await fetch('/assets/url_char_index.json');
        const uv = await uvReq.json();
        console.log("URL vocab loaded");

        setTextModel(tm);
        setUrlModel(um);
        setTextVocab(tv);
        setUrlVocab(uv);
        setModelsLoaded(true);
        console.log("All models ready!");
      } catch (e) {
        console.error("Failed to load models:", e);
        setLoadError("Failed to load AI models. Please refresh.");
      }
    }
    loadModels();
  }, []);

  // Preprocessing
  const preprocessText = (text: string) => {
    if (!textVocab) return null;
    const words = text.toLowerCase().replace(/[^\w\s]/gi, '').split(/\s+/);
    const sequence = words.map(w => textVocab[w] || textVocab[TEXT_OOV] || 1);
    const padded = new Array(TEXT_MAX_LEN).fill(0);
    for (let i = 0; i < Math.min(sequence.length, TEXT_MAX_LEN); i++) {
      padded[i] = sequence[i];
    }
    return tf.tensor2d([padded]);
  };

  const preprocessURL = (url: string) => {
    if (!urlVocab) return null;
    const chars = url.split('');
    const sequence = chars.map(c => urlVocab[c] || urlVocab[URL_OOV] || 1);
    const padded = new Array(URL_MAX_LEN).fill(0);
    for (let i = 0; i < Math.min(sequence.length, URL_MAX_LEN); i++) {
      padded[i] = sequence[i];
    }
    return tf.tensor2d([padded]);
  };

  const handleAnalyze = async () => {
    console.log("Analyze clicked. Models loaded:", modelsLoaded);
    // if (!modelsLoaded) return; // Removed to allow heuristic fallback
    setAnalyzing(true);
    setShowResult(false);

    try {
      let textScore = 0;
      let urlScore = 0;

      // Predict Text
      if (activeTab === "text" && textContent && textModel) {
        const tensor = preprocessText(textContent);
        if (tensor) {
          const pred = textModel.predict(tensor) as tf.Tensor;
          const data = await pred.data();
          textScore = data[0] as number;
          tensor.dispose();
        }
      }

      // Predict URL
      if (activeTab === "url" && urlContent && urlModel) {
        const tensor = preprocessURL(urlContent);
        if (tensor) {
          const pred = urlModel.predict(tensor) as tf.Tensor;
          const data = await pred.data();
          urlScore = data[0] as number;
          tensor.dispose();
        }
      }

      // Hybrid Scoring Logic
      const finalScore = Math.max(textScore, urlScore, heuristicScore);
      const isPhishing = finalScore > 0.5;
      const confidence = finalScore;
      const riskLevel = isPhishing ? "high" : "safe";

      // 1. Show Result IMMEDIATELY
      setResult({ isPhishing, textScore, urlScore, heuristicScore, reasons });
      setShowResult(true);

      // 2. Save to DB (Background - don't block UI)
      scanContent({
        url: activeTab === "url" ? urlContent : undefined,
        textScore,
        urlScore,
        riskLevel,
        isPhishing,
        confidence
      }).catch(err => console.error("Failed to save scan:", err));

    } catch (e) {
      console.error("Analysis failed:", e);
      setLoadError("Analysis failed. Please try again."); // Reuse loadError for general errors
    } finally {
      setAnalyzing(false);
    }
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
        <Badge variant="outline" className={`${loadError ? "bg-red-50 text-red-600 border-red-200" : "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700"}`}>
          <Sparkles className="w-3 h-3 mr-1" />
          {loadError ? "AI Error" : (modelsLoaded ? "AI Ready" : "Loading AI...")}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">{t.manualAnalysis.enterContent}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="text" className="w-full" onValueChange={setActiveTab}>
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
                  placeholder={sampleText}
                  className="min-h-[200px] resize-none"
                  onChange={(e) => setTextContent(e.target.value)}
                />
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <Textarea
                  placeholder="https://example.com/login"
                  className="min-h-[200px] resize-none font-mono"
                  onChange={(e) => setUrlContent(e.target.value)}
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
                {result?.isPhishing ? (
                  <div className="space-y-4">
                    <ThreatAlert
                      level="high"
                      title={t.manualAnalysis.phishingDetected}
                      description={t.manualAnalysis.phishingDescription}
                      indicators={t.threatAlert.phishingIndicators}
                      recommendations={t.threatAlert.phishingRecommendations}
                    />

                    {/* Detailed Breakdown - Phishing */}
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <h4 className="text-red-900 dark:text-red-300 font-semibold mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Why we flagged this:
                      </h4>
                      <ul className="space-y-2">
                        {result.textScore > 0.5 && (
                          <li className="text-sm text-red-700 dark:text-red-400 flex items-start">
                            <span className="mr-2">•</span>
                            AI detected suspicious language patterns ({Math.round(result.textScore * 100)}% confidence).
                          </li>
                        )}
                        {result.urlScore > 0.5 && (
                          <li className="text-sm text-red-700 dark:text-red-400 flex items-start">
                            <span className="mr-2">•</span>
                            AI detected a malicious URL structure ({Math.round(result.urlScore * 100)}% confidence).
                          </li>
                        )}
                        {result.reasons && result.reasons.map((reason: string, i: number) => (
                          <li key={i} className="text-sm text-red-700 dark:text-red-400 flex items-start">
                            <span className="mr-2">•</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <h4 className="text-green-900 dark:text-green-300 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Safe Content
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Our AI did not detect any phishing indicators in this content.
                      </p>
                    </div>

                    {/* Detailed Breakdown - Safe */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h4 className="text-gray-900 dark:text-gray-300 font-semibold mb-2">
                        Analysis Details:
                      </h4>
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="mr-2 text-green-500">✓</span>
                          No suspicious keywords found.
                        </li>
                        <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                          <span className="mr-2 text-green-500">✓</span>
                          AI Risk Score: {Math.max(result.textScore, result.urlScore).toFixed(2)} (Low)
                        </li>
                        {result.reasons && result.reasons.length === 0 && (
                          <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                            <span className="mr-2 text-green-500">✓</span>
                            No heuristic triggers (urgency, mismatch, etc).
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

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
    </div>
  );
}

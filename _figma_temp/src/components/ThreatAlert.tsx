import { AlertTriangle, XCircle, AlertCircle, CheckCircle, Info } from "lucide-react";
import { Badge } from "./ui/badge";
import { useLanguage } from "../lib/LanguageContext";

interface ThreatAlertProps {
  level: "high" | "medium" | "low" | "safe";
  title: string;
  description: string;
  indicators?: string[];
  recommendations?: string[];
}

export function ThreatAlert({
  level,
  title,
  description,
  indicators = [],
  recommendations = [],
}: ThreatAlertProps) {
  const { t } = useLanguage();
  
  const config = {
    high: {
      icon: XCircle,
      bgColor: "bg-red-50 dark:bg-red-950/30",
      borderColor: "border-red-200 dark:border-red-800",
      iconColor: "text-red-500 dark:text-red-400",
      badgeColor: "bg-red-100 text-red-700 border-red-200",
      titleColor: "text-red-900 dark:text-red-300",
    },
    medium: {
      icon: AlertTriangle,
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      badgeColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
      titleColor: "text-yellow-900 dark:text-yellow-300",
    },
    low: {
      icon: AlertCircle,
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-500 dark:text-blue-400",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
      titleColor: "text-blue-900 dark:text-blue-300",
    },
    safe: {
      icon: CheckCircle,
      bgColor: "bg-green-50 dark:bg-green-950/30",
      borderColor: "border-green-200 dark:border-green-800",
      iconColor: "text-green-500 dark:text-green-400",
      badgeColor: "bg-green-100 text-green-700 border-green-200",
      titleColor: "text-green-900 dark:text-green-300",
    },
  };

  const { icon: Icon, bgColor, borderColor, iconColor, badgeColor, titleColor } = config[level];

  return (
    <div className={`rounded-xl border-2 ${borderColor} ${bgColor} p-4 space-y-3`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 ${iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className={`${titleColor}`}>{title}</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
        </div>
      </div>

      {indicators.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <h4 className="text-gray-900 dark:text-white">{t.manualAnalysis.detectedIndicators}</h4>
          </div>
          <ul className="space-y-1.5">
            {indicators.map((indicator, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>{indicator}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-gray-900 dark:text-white">{t.manualAnalysis.recommendations}</h4>
          <ul className="space-y-1.5">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className={iconColor}>✓</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
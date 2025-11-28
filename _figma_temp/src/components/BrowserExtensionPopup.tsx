import { Shield, X, ExternalLink, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from "../lib/LanguageContext";

interface BrowserExtensionPopupProps {
  onClose?: () => void;
}

export function BrowserExtensionPopup({ onClose }: BrowserExtensionPopupProps) {
  const { t } = useLanguage();
  
  return (
    <div className="w-96 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white">PhishGuard</h3>
            <p className="text-xs text-red-100">{t.extension.threatDetected}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-red-50 dark:bg-red-950/30 p-2 rounded-full">
            <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-gray-900 dark:text-white">{t.extension.suspiciousLinkBlocked}</h4>
              <Badge variant="destructive" className="text-xs">{t.dashboard.highRisk}</Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.extension.phishGuardBlocked}
            </p>
          </div>
        </div>

        {/* Threat Details */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.extension.blockedUrl}</p>
            <p className="text-xs text-gray-900 dark:text-gray-200 break-all bg-white dark:bg-gray-900 px-2 py-1.5 rounded border border-gray-200 dark:border-gray-700 font-mono">
              https://secure-paypal-verify.xyz/login
            </p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.extension.reason}</p>
            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 dark:text-red-400 mt-0.5">•</span>
                <span>{t.extension.suspiciousDomain}</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 dark:text-red-400 mt-0.5">•</span>
                <span>{t.extension.unknownSSL}</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 dark:text-red-400 mt-0.5">•</span>
                <span>{t.extension.inPhishingDatabase}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Shield className="w-4 h-4 mr-2" />
            {t.extension.viewFullReport}
          </Button>
          <Button variant="outline" className="w-full text-gray-600 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-800">
            <ExternalLink className="w-4 h-4 mr-2" />
            {t.extension.reportFalsePositive}
          </Button>
        </div>

        {/* Stats */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">{t.extension.threatsBlockedToday}</span>
            <span className="text-green-600 dark:text-green-400">12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
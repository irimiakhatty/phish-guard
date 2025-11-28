"use client";

import {
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Mail,
  Link as LinkIcon,
  Globe,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useLanguage } from "~/lib/LanguageContext";

export function Dashboard() {
  const { t, language } = useLanguage();
  
  const threats = [
    {
      type: "email",
      title: t.threats.emailPhishing,
      url: "noreply@paypal-secure.xyz",
      time: language === 'ro' ? "Acum 5 min" : "5 min ago",
      status: "blocked",
      risk: "high",
    },
    {
      type: "link",
      title: t.threats.suspiciousLink,
      url: "banc-raiffeisen-verificare.xyz",
      time: language === 'ro' ? "Acum 23 min" : "23 min ago",
      status: "blocked",
      risk: "high",
    },
    {
      type: "website",
      title: t.threats.fakePage,
      url: "amazon-promotion.tk",
      time: language === 'ro' ? "Acum 1 oră" : "1 hour ago",
      status: "blocked",
      risk: "medium",
    },
    {
      type: "email",
      title: t.threats.suspiciousEmail,
      url: "support@ing-ro.info",
      time: language === 'ro' ? "Acum 2 ore" : "2 hours ago",
      status: "blocked",
      risk: "high",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400">{t.dashboard.threatsBlocked}</CardTitle>
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-gray-900 dark:text-white" style={{ fontSize: '2rem', lineHeight: '1' }}>127</span>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm mb-1">
                <TrendingUp className="w-3 h-3" />
                <span>+12%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.dashboard.vsLastWeek}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400">{t.dashboard.emailsScanned}</CardTitle>
            <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-gray-900 dark:text-white" style={{ fontSize: '2rem', lineHeight: '1' }}>3,492</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.dashboard.inLast30Days}</p>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400">{t.dashboard.detectionRate}</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-gray-900 dark:text-white" style={{ fontSize: '2rem', lineHeight: '1' }}>99.8%</span>
            </div>
            <Progress value={99.8} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400">{t.dashboard.timeSaved}</CardTitle>
            <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-gray-900 dark:text-white" style={{ fontSize: '2rem', lineHeight: '1' }}>8.4</span>
              <span className="text-gray-500 dark:text-gray-400 mb-1">{language === 'ro' ? 'ore' : 'hrs'}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t.dashboard.thisMonth}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="dark:bg-gray-900 dark:border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="dark:text-white">{t.dashboard.recentActivity}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.dashboard.realTimeProtection}</p>
            </div>
            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-0">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 dark:bg-gray-800">
              <TabsTrigger value="all" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
                {t.dashboard.all}
              </TabsTrigger>
              <TabsTrigger value="emails" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
                {t.dashboard.emails}
              </TabsTrigger>
              <TabsTrigger value="links" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
                {t.dashboard.links}
              </TabsTrigger>
              <TabsTrigger value="websites" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">
                {t.dashboard.websites}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {threats.map((threat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      threat.type === "email"
                        ? "bg-blue-50 dark:bg-blue-900/30"
                        : threat.type === "link"
                        ? "bg-purple-50 dark:bg-purple-900/30"
                        : "bg-orange-50 dark:bg-orange-900/30"
                    }`}
                  >
                    {threat.type === "email" && (
                      <Mail
                        className={`w-5 h-5 ${
                          threat.type === "email" ? "text-blue-600 dark:text-blue-400" : ""
                        }`}
                      />
                    )}
                    {threat.type === "link" && (
                      <LinkIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    )}
                    {threat.type === "website" && (
                      <Globe className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-900 dark:text-white truncate">{threat.title}</h4>
                      <Badge
                        variant={threat.risk === "high" ? "destructive" : "secondary"}
                        className="flex-shrink-0"
                      >
                        {threat.risk === "high" ? t.dashboard.highRisk : t.dashboard.mediumRisk}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate font-mono">
                      {threat.url}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{threat.time}</span>
                    <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-full">
                      <Shield className="w-3 h-3 text-green-600 dark:text-green-400" />
                      <span className="text-xs text-green-700 dark:text-green-400">{t.dashboard.blocked}</span>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="emails">
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {t.dashboard.filteringEmails}
              </div>
            </TabsContent>

            <TabsContent value="links">
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {t.dashboard.filteringLinks}
              </div>
            </TabsContent>

            <TabsContent value="websites">
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {t.dashboard.filteringWebsites}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

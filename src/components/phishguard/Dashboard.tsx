"use client";

import { useState, useEffect } from "react";
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

  const [stats, setStats] = useState({
    totalScans: 0,
    threatsBlocked: 0,
    detectionRate: "0",
    timeSaved: "0"
  });
  const [threats, setThreats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { getDashboardStats } = await import("~/server/actions");
        const data = await getDashboardStats();
        setStats(data.stats);

        const mappedThreats = data.recentScans.map((scan: any) => ({
          type: scan.contentType === "url" ? "link" : "email",
          title: scan.isPhishing ? t.threats.suspiciousLink : "Safe Content", // Simplified title logic
          url: scan.url || "No URL",
          time: new Date(scan.createdAt).toLocaleTimeString(), // Simplified time
          status: scan.isPhishing ? "blocked" : "scanned",
          risk: scan.riskLevel,
        }));
        setThreats(mappedThreats);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [t]);

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
              <span className="text-gray-900 dark:text-white" style={{ fontSize: '2rem', lineHeight: '1' }}>{stats.threatsBlocked}</span>
              {stats.threatsBlocked > 0 && (
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm mb-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+100%</span>
                </div>
              )}
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
              <span className="text-gray-900 dark:text-white" style={{ fontSize: '2rem', lineHeight: '1' }}>{stats.totalScans}</span>
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
              <span className="text-gray-900 dark:text-white" style={{ fontSize: '2rem', lineHeight: '1' }}>{stats.detectionRate}%</span>
            </div>
            <Progress value={parseFloat(stats.detectionRate)} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-400">{t.dashboard.timeSaved}</CardTitle>
            <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-gray-900 dark:text-white" style={{ fontSize: '2rem', lineHeight: '1' }}>{stats.timeSaved}</span>
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
                    className={`p-2 rounded-lg ${threat.type === "email"
                      ? "bg-blue-50 dark:bg-blue-900/30"
                      : threat.type === "link"
                        ? "bg-purple-50 dark:bg-purple-900/30"
                        : "bg-orange-50 dark:bg-orange-900/30"
                      }`}
                  >
                    {threat.type === "email" && (
                      <Mail
                        className={`w-5 h-5 ${threat.type === "email" ? "text-blue-600 dark:text-blue-400" : ""
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

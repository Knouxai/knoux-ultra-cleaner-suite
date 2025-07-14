import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToolsManager from "@/components/ToolsManager";
import AdvancedToolCard from "@/components/AdvancedToolCard";
import { toolsEngine, Tool } from "@/lib/tools";
import { allTools, getToolsByCategory } from "@/lib/toolsRegistry";
import {
  Settings,
  Zap,
  Shield,
  Activity,
  Globe,
  Folder,
  Eye,
  Crown,
  Star,
  Rocket,
  Flame,
  Atom,
  Sparkles,
  Target,
  Power,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const AdvancedToolsHub = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [systemHealth, setSystemHealth] = useState({
    cpu: 15,
    memory: 68,
    disk: 42,
    network: 89,
  });
  const [quickStats, setQuickStats] = useState({
    toolsExecuted: 0,
    successRate: 0,
    totalTime: 0,
    errorsFixed: 0,
  });

  // محاكاة تحديث إحصائيات النظام
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth((prev) => ({
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(
          20,
          Math.min(90, prev.memory + (Math.random() - 0.5) * 8),
        ),
        disk: Math.max(15, Math.min(85, prev.disk + (Math.random() - 0.5) * 5)),
        network: Math.max(
          50,
          Math.min(100, prev.network + (Math.random() - 0.5) * 15),
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // إحصائيات سريعة للأدوات
  const toolCategories = [
    {
      id: "security",
      name: "الأمان",
      icon: Shield,
      count: getToolsByCategory("security").length,
      color: "from-red-500 to-pink-600",
    },
    {
      id: "performance",
      name: "الأداء",
      icon: Zap,
      count: getToolsByCategory("performance").length,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "network",
      name: "الشبكة",
      icon: Globe,
      count: getToolsByCategory("network").length,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "files",
      name: "الملفات",
      icon: Folder,
      count: getToolsByCategory("files").length,
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "privacy",
      name: "الخصوصية",
      icon: Eye,
      count: getToolsByCategory("privacy").length,
      color: "from-purple-500 to-violet-600",
    },
    {
      id: "system",
      name: "النظام",
      icon: Settings,
      count: getToolsByCategory("system").length,
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: "cosmic",
      name: "كونية",
      icon: Crown,
      count: getToolsByCategory("cosmic").length,
      color: "from-pink-500 to-rose-600",
    },
  ];

  // الأدوات المميزة (أعلى مستوى)
  const featuredTools = allTools
    .filter((tool) =>
      ["legendary", "cosmic", "divine", "omnipotent"].includes(tool.powerLevel),
    )
    .slice(0, 6);

  // الأدوات الأكثر استخداماً
  const popularTools = allTools
    .filter((tool) => tool.statistics.timesUsed > 0)
    .sort((a, b) => b.statistics.timesUsed - a.statistics.timesUsed)
    .slice(0, 6);

  // أدوات سريعة للوصول المباشر
  const quickAccessTools = [
    allTools.find((t) => t.id === "ghost_app_remover"),
    allTools.find((t) => t.id === "quantum_ram_optimizer"),
    allTools.find((t) => t.id === "deep_threat_scanner"),
    allTools.find((t) => t.id === "hyper_disk_cleaner"),
  ].filter(Boolean) as Tool[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* العنوان الرئيسي */}
        <div className="glass-card p-8 rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center pulse-glow">
                <Settings className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold neon-glow mb-2">
                  مركز الأدوات المتقدمة
                </h1>
                <p className="text-lg text-muted-foreground">
                  منصة شاملة لإدارة وتشغيل الأدوات المتخصصة والكونية
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                  >
                    {allTools.length} أداة متوفرة
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-green-500/10 to-emerald-500/10"
                  >
                    {allTools.filter((t) => t.isEnabled).length} مفعلة
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10"
                  >
                    {allTools.filter((t) => t.isPremium).length} مميزة
                  </Badge>
                </div>
              </div>
            </div>

            {/* مراقب حالة النظام */}
            <div className="glass-card p-4 rounded-xl">
              <h3 className="text-sm font-semibold mb-3 text-center">
                حالة النظام
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">المعالج</div>
                  <div className="text-lg font-bold text-blue-500">
                    {systemHealth.cpu}%
                  </div>
                  <Progress value={systemHealth.cpu} className="h-1 mt-1" />
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">الذاكرة</div>
                  <div className="text-lg font-bold text-green-500">
                    {systemHealth.memory}%
                  </div>
                  <Progress value={systemHealth.memory} className="h-1 mt-1" />
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">القرص</div>
                  <div className="text-lg font-bold text-yellow-500">
                    {systemHealth.disk}%
                  </div>
                  <Progress value={systemHealth.disk} className="h-1 mt-1" />
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">الشبكة</div>
                  <div className="text-lg font-bold text-purple-500">
                    {systemHealth.network}%
                  </div>
                  <Progress value={systemHealth.network} className="h-1 mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* إحصائيات الفئات */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {toolCategories.map((category) => (
            <Card
              key={category.id}
              className="glass-card hover:glass-button transition-all duration-300 cursor-pointer group"
              onClick={() => setActiveCategory(category.id)}
            >
              <CardContent className="p-4 text-center">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:pulse-glow`}
                >
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm group-hover:neon-glow transition-all">
                  {category.name}
                </h3>
                <p className="text-2xl font-bold text-primary mt-1">
                  {category.count}
                </p>
                <p className="text-xs text-muted-foreground">أداة</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* الوصول السريع للأدوات */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>الوصول السريع</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickAccessTools.map((tool) => (
                <div
                  key={tool.id}
                  className="glass-card p-4 rounded-lg hover:glass-button transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:pulse-glow">
                      <tool.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm group-hover:neon-glow transition-all">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {tool.category}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Power className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* الأدوات المميزة */}
        {featuredTools.length > 0 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span>الأدوات الأسطورية والكونية</span>
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-yellow-500/10 to-pink-500/10"
                >
                  قوة عالية
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTools.map((tool) => (
                  <AdvancedToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* مدير الأدوات الرئيسي */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="glass-card p-1 h-auto">
            <TabsTrigger
              value="all"
              className="data-[state=active]:glass-button"
            >
              جميع الأدوات
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:glass-button"
            >
              <Shield className="w-4 h-4 mr-2" />
              الأمان
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:glass-button"
            >
              <Zap className="w-4 h-4 mr-2" />
              الأداء
            </TabsTrigger>
            <TabsTrigger
              value="network"
              className="data-[state=active]:glass-button"
            >
              <Globe className="w-4 h-4 mr-2" />
              الشبكة
            </TabsTrigger>
            <TabsTrigger
              value="cosmic"
              className="data-[state=active]:glass-button"
            >
              <Crown className="w-4 h-4 mr-2" />
              كونية
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ToolsManager />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    <span>أدوات الأمان والحماية</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getToolsByCategory("security").map((tool) => (
                      <AdvancedToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-green-500" />
                    <span>أدوات تحسين الأداء</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getToolsByCategory("performance").map((tool) => (
                      <AdvancedToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="network" className="mt-6">
            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <span>أدوات الشبكة والاتصالات</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getToolsByCategory("network").map((tool) => (
                      <AdvancedToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cosmic" className="mt-6">
            <div className="space-y-6">
              <Card className="glass-card border-2 border-gradient-to-r from-pink-500 to-purple-600">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="w-5 h-5 text-yellow-500" />
                    <span>الأدوات الكونية والإلهية</span>
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500"
                    >
                      تحذير: قوة عالية
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold text-yellow-600">
                        تحذير هام
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      الأدوات الكونية والإلهية تحتوي على قوة استثن��ئية وقد تؤثر
                      على استقرار النظام. استخدمها بحذر وتحت إشراف متخصص.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getToolsByCategory("cosmic").map((tool) => (
                      <AdvancedToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* الأدوات الأكثر استخداماً */}
        {popularTools.length > 0 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>الأكثر استخداماً</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularTools.map((tool) => (
                  <AdvancedToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdvancedToolsHub;

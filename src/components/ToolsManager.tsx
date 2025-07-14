import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import AdvancedToolCard from "./AdvancedToolCard";
import { toolsEngine, Tool, ToolExecutionResult } from "@/lib/tools";
import { allTools, getToolsByCategory } from "@/lib/toolsRegistry";
import {
  Search,
  Filter,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
  Star,
  Crown,
  Zap,
  RefreshCw,
  Download,
  Upload,
  Power,
  BarChart3,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolsManagerProps {
  className?: string;
}

const ToolsManager: React.FC<ToolsManagerProps> = ({ className = "" }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPowerLevel, setSelectedPowerLevel] = useState("all");
  const [showEnabledOnly, setShowEnabledOnly] = useState(false);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [executionResults, setExecutionResults] = useState<
    ToolExecutionResult[]
  >([]);
  const [isExecutingBatch, setIsExecutingBatch] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);

  // فلترة الأدوات
  const filteredTools = allTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;
    const matchesPowerLevel =
      selectedPowerLevel === "all" || tool.powerLevel === selectedPowerLevel;
    const matchesEnabled = !showEnabledOnly || tool.isEnabled;
    const matchesPremium = !showPremiumOnly || tool.isPremium;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPowerLevel &&
      matchesEnabled &&
      matchesPremium
    );
  });

  // ترتيب الأدوات
  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "powerLevel":
        const powerOrder = [
          "basic",
          "advanced",
          "professional",
          "expert",
          "legendary",
          "cosmic",
          "divine",
          "omnipotent",
        ];
        return (
          powerOrder.indexOf(a.powerLevel) - powerOrder.indexOf(b.powerLevel)
        );
      case "category":
        return a.category.localeCompare(b.category);
      case "usage":
        return b.statistics.timesUsed - a.statistics.timesUsed;
      case "success":
        return b.statistics.successRate - a.statistics.successRate;
      default:
        return 0;
    }
  });

  // إحصائيات سريعة
  const stats = {
    total: allTools.length,
    enabled: allTools.filter((t) => t.isEnabled).length,
    premium: allTools.filter((t) => t.isPremium).length,
    running: allTools.filter((t) => t.status === "running").length,
    avgSuccessRate:
      allTools.reduce((acc, t) => acc + t.statistics.successRate, 0) /
      allTools.length,
  };

  // معالج نتائج التنفيذ
  const handleToolExecution = (result: ToolExecutionResult) => {
    setExecutionResults((prev) => [result, ...prev.slice(0, 9)]); // الاحتفاظ بآخر 10 نتائج
  };

  // تنفيذ مجموعة من الأدوات
  const executeBatch = async (toolIds: string[]) => {
    setIsExecutingBatch(true);
    setBatchProgress(0);

    for (let i = 0; i < toolIds.length; i++) {
      const result = await toolsEngine.executeTool(toolIds[i]);
      handleToolExecution(result);
      setBatchProgress(((i + 1) / toolIds.length) * 100);

      // توقف قصير بين الأدوات
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsExecutingBatch(false);
    setBatchProgress(0);
  };

  // تنفيذ جميع أدوات الأمان
  const executeSecuritySuite = () => {
    const securityTools = allTools.filter(
      (t) => t.category === "security" && t.isEnabled,
    );
    executeBatch(securityTools.map((t) => t.id));
  };

  // تنفيذ جميع أدوات الأداء
  const executePerformanceSuite = () => {
    const performanceTools = allTools.filter(
      (t) => t.category === "performance" && t.isEnabled,
    );
    executeBatch(performanceTools.map((t) => t.id));
  };

  return (
    <TooltipProvider>
      <div className={`space-y-6 ${className}`}>
        {/* العنوان والإحصائيات */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center pulse-glow">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold neon-glow">
                  مدير الأدوات المتقدم
                </h1>
                <p className="text-muted-foreground">
                  إدارة وتشغيل الأدوات المتخصصة والكونية
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  {stats.total}
                </div>
                <div className="text-xs text-muted-foreground">
                  إجمالي الأدوات
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {stats.enabled}
                </div>
                <div className="text-xs text-muted-foreground">مفعلة</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-500">
                  {stats.premium}
                </div>
                <div className="text-xs text-muted-foreground">مميزة</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-500">
                  {stats.running}
                </div>
                <div className="text-xs text-muted-foreground">قيد التشغيل</div>
              </div>
            </div>
          </div>

          {/* أشرطة سريعة للتنفيذ */}
          <div className="flex items-center space-x-4 mb-4">
            <Button
              onClick={executeSecuritySuite}
              disabled={isExecutingBatch}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              تشغيل حزمة الأمان
            </Button>

            <Button
              onClick={executePerformanceSuite}
              disabled={isExecutingBatch}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              تشغيل حزمة الأداء
            </Button>

            <Button
              variant="outline"
              disabled={isExecutingBatch}
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              إعادة تحميل
            </Button>
          </div>

          {/* شريط التقدم للتنفيذ المجمع */}
          {isExecutingBatch && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  جاري تنفيذ الحزمة...
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.floor(batchProgress)}%
                </span>
              </div>
              <Progress value={batchProgress} className="h-3 bg-muted/20" />
            </div>
          )}
        </div>

        {/* فلاتر البحث والترتيب */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>فلاتر البحث والترتيب</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">البحث</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ابحث في الأدوات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">الفئة</label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    <SelectItem value="security">الأمان</SelectItem>
                    <SelectItem value="performance">الأداء</SelectItem>
                    <SelectItem value="network">الشبكة</SelectItem>
                    <SelectItem value="files">الملفات</SelectItem>
                    <SelectItem value="privacy">الخصوصية</SelectItem>
                    <SelectItem value="system">النظام</SelectItem>
                    <SelectItem value="cosmic">كونية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">مستوى القوة</label>
                <Select
                  value={selectedPowerLevel}
                  onValueChange={setSelectedPowerLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المستوى" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المستويات</SelectItem>
                    <SelectItem value="basic">أساسي</SelectItem>
                    <SelectItem value="advanced">متقدم</SelectItem>
                    <SelectItem value="professional">احترافي</SelectItem>
                    <SelectItem value="expert">خبير</SelectItem>
                    <SelectItem value="legendary">أسطوري</SelectItem>
                    <SelectItem value="cosmic">كوني</SelectItem>
                    <SelectItem value="divine">إلهي</SelectItem>
                    <SelectItem value="omnipotent">قادر على كل شيء</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">ترتيب حسب</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">الاسم</SelectItem>
                    <SelectItem value="powerLevel">مستوى القوة</SelectItem>
                    <SelectItem value="category">الفئة</SelectItem>
                    <SelectItem value="usage">مرات الاستخدام</SelectItem>
                    <SelectItem value="success">معدل النجاح</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="enabled-only"
                  checked={showEnabledOnly}
                  onCheckedChange={setShowEnabledOnly}
                />
                <label htmlFor="enabled-only" className="text-sm">
                  المفعلة فقط
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="premium-only"
                  checked={showPremiumOnly}
                  onCheckedChange={setShowPremiumOnly}
                />
                <label htmlFor="premium-only" className="text-sm">
                  المميزة فقط
                </label>
              </div>

              <Badge variant="outline" className="ml-auto">
                {sortedTools.length} من {allTools.length} أداة
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* الأدوات */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedTools.map((tool) => (
            <AdvancedToolCard
              key={tool.id}
              tool={tool}
              onExecute={handleToolExecution}
            />
          ))}
        </div>

        {/* عدم وجود نتائج */}
        {sortedTools.length === 0 && (
          <Card className="glass-card text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    لا توجد أدوات مطابقة
                  </h3>
                  <p className="text-muted-foreground">
                    جرب تعديل معايير البحث أو الفلاتر
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedPowerLevel("all");
                    setShowEnabledOnly(false);
                    setShowPremiumOnly(false);
                  }}
                >
                  إعادة تعيين الفلاتر
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* سجل نتائج التنفيذ */}
        {executionResults.length > 0 && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>سجل نتائج التنفيذ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {executionResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      result.success
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {result.success ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                        <span className="font-medium">{result.message}</span>
                      </div>
                      {result.duration && (
                        <span className="text-xs text-muted-foreground">
                          {result.duration}ms
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ToolsManager;

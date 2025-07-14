import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tool, ToolExecutionResult, toolsEngine } from "@/lib/tools";
import {
  Play,
  Pause,
  Settings,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Star,
  Crown,
  Sparkles,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdvancedToolCardProps {
  tool: Tool;
  onExecute?: (result: ToolExecutionResult) => void;
  className?: string;
}

const AdvancedToolCard: React.FC<AdvancedToolCardProps> = ({
  tool,
  onExecute,
  className = "",
}) => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [lastResult, setLastResult] = useState<ToolExecutionResult | null>(
    null,
  );
  const [showDetails, setShowDetails] = useState(false);

  // تحديث حالة التنفيذ
  useEffect(() => {
    if (tool.status === "running") {
      setIsExecuting(true);
      // محاكاة شريط التقدم
      const interval = setInterval(() => {
        setExecutionProgress((prev) => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setIsExecuting(false);
      setExecutionProgress(0);
    }
  }, [tool.status]);

  const handleExecute = async () => {
    if (isExecuting) return;

    setIsExecuting(true);
    setExecutionProgress(0);
    setLastResult(null);

    try {
      const result = await toolsEngine.executeTool(tool.id);
      setLastResult(result);
      setExecutionProgress(100);

      if (onExecute) {
        onExecute(result);
      }

      // إشعار بصري للنتيجة
      if (result.success) {
        // توهج أخضر للنجاح
        const cardElement = document.getElementById(`tool-card-${tool.id}`);
        if (cardElement) {
          cardElement.classList.add("success-glow");
          setTimeout(() => cardElement.classList.remove("success-glow"), 2000);
        }
      } else {
        // توهج أحمر للفشل
        const cardElement = document.getElementById(`tool-card-${tool.id}`);
        if (cardElement) {
          cardElement.classList.add("error-glow");
          setTimeout(() => cardElement.classList.remove("error-glow"), 2000);
        }
      }
    } catch (error) {
      setLastResult({
        success: false,
        message: `خطأ في التنفيذ: ${error instanceof Error ? error.message : "خطأ غير معروف"}`,
      });
    } finally {
      setTimeout(() => {
        setIsExecuting(false);
        setExecutionProgress(0);
      }, 1500);
    }
  };

  const getPowerLevelColor = (powerLevel: string) => {
    switch (powerLevel) {
      case "basic":
        return "text-gray-500";
      case "advanced":
        return "text-blue-500";
      case "professional":
        return "text-purple-500";
      case "expert":
        return "text-indigo-500";
      case "legendary":
        return "text-yellow-500";
      case "cosmic":
        return "text-pink-500";
      case "divine":
        return "text-red-500";
      case "omnipotent":
        return "text-rainbow";
      default:
        return "text-gray-500";
    }
  };

  const getPowerLevelIcon = (powerLevel: string) => {
    switch (powerLevel) {
      case "legendary":
        return Star;
      case "cosmic":
        return Sparkles;
      case "divine":
        return Crown;
      case "omnipotent":
        return Crown;
      default:
        return Zap;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "enabled":
        return "text-green-500";
      case "disabled":
        return "text-gray-500";
      case "running":
        return "text-blue-500";
      case "completed":
        return "text-green-600";
      case "error":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const PowerIcon = getPowerLevelIcon(tool.powerLevel);

  return (
    <TooltipProvider>
      <Card
        id={`tool-card-${tool.id}`}
        className={`glass-card hover:glass-button transition-all duration-300 group cursor-pointer ${className} 
          ${!tool.isEnabled ? "opacity-60" : ""} 
          ${isExecuting ? "executing-glow" : ""}
          ${tool.isPremium ? "premium-border" : ""}
        `}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center ${isExecuting ? "pulse-glow" : "group-hover:pulse-glow"}`}
              >
                <tool.icon className="w-6 h-6 text-white" />
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <PowerIcon
                    className={`w-4 h-4 ${getPowerLevelColor(tool.powerLevel)}`}
                  />
                  {tool.isPremium && (
                    <Crown className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <Badge
                  variant={tool.status === "enabled" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {tool.status}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>عرض التفاصيل</p>
                </TooltipContent>
              </Tooltip>

              {tool.requirements.minPermission === "cosmic" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>يتطلب صلاحيات كونية</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          <CardTitle className="text-lg font-bold group-hover:neon-glow transition-all">
            {tool.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{tool.description}</p>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* شريط التقدم أثناء التنفيذ */}
            {isExecuting && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">جاري التنفيذ...</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.floor(executionProgress)}%
                  </span>
                </div>
                <Progress
                  value={executionProgress}
                  className="h-2 bg-muted/20"
                />
              </div>
            )}

            {/* نتيجة آخر تنفيذ */}
            {lastResult && !isExecuting && (
              <div
                className={`p-3 rounded-lg border ${lastResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  {lastResult.success ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm font-medium">
                    {lastResult.message}
                  </span>
                </div>

                {lastResult.data && (
                  <div className="text-xs text-muted-foreground space-y-1">
                    {lastResult.duration && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>مدة التنفيذ: {lastResult.duration}ms</span>
                      </div>
                    )}
                    {lastResult.affectedFiles && (
                      <div>
                        الملفات المعالجة:{" "}
                        {lastResult.affectedFiles.toLocaleString()}
                      </div>
                    )}
                    {lastResult.freedSpace && (
                      <div>المساحة المحررة: {lastResult.freedSpace}</div>
                    )}
                  </div>
                )}

                {lastResult.warnings && lastResult.warnings.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {lastResult.warnings.map((warning, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-1 text-xs text-yellow-600"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        <span>{warning}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* التفاصيل المتقدمة */}
            {showDetails && (
              <div className="space-y-3 p-3 bg-muted/20 rounded-lg border">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">الإصدار:</span>
                    <span className="ml-2 font-mono">{tool.version}</span>
                  </div>
                  <div>
                    <span className="font-medium">الفئ��:</span>
                    <span className="ml-2">{tool.category}</span>
                  </div>
                  <div>
                    <span className="font-medium">مستوى القوة:</span>
                    <span
                      className={`ml-2 font-bold ${getPowerLevelColor(tool.powerLevel)}`}
                    >
                      {tool.powerLevel}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">مرات الاستخدام:</span>
                    <span className="ml-2 font-mono">
                      {tool.statistics.timesUsed}
                    </span>
                  </div>
                </div>

                {tool.statistics.successRate > 0 && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>معدل النجاح</span>
                      <span>
                        {Math.floor(tool.statistics.successRate * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={tool.statistics.successRate * 100}
                      className="h-2"
                    />
                  </div>
                )}

                {tool.statistics.lastUsed && (
                  <div className="text-xs text-muted-foreground">
                    آخر استخدام:{" "}
                    {tool.statistics.lastUsed.toLocaleString("ar-SA")}
                  </div>
                )}

                {tool.requirements.systemRequirements && (
                  <div className="text-xs">
                    <span className="font-medium">متطلبات النظام:</span>
                    <ul className="mt-1 space-y-1">
                      {tool.requirements.systemRequirements.map(
                        (req, index) => (
                          <li key={index} className="text-muted-foreground">
                            • {req}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* أزرار التحكم */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleExecute}
                  disabled={!tool.isEnabled || isExecuting}
                  className={`glass-button rounded-lg hover:neon-border ${
                    isExecuting ? "opacity-50" : ""
                  }`}
                  size="sm"
                >
                  {isExecuting ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      جاري التنفيذ...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      تشغيل
                    </>
                  )}
                </Button>

                {tool.powerLevel === "cosmic" ||
                tool.powerLevel === "divine" ||
                tool.powerLevel === "omnipotent" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="cosmic-button"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    إعدادات كونية
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    إعدادات
                  </Button>
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                {tool.requirements.requiresElevation && "🔒 "}
                {tool.requirements.requiresInternet && "🌐 "}
                {tool.isPremium && "⭐ "}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default AdvancedToolCard;

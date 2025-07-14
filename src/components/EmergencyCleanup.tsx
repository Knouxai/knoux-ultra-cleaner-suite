import React, { useState } from "react";
import { AlertTriangle, Zap, Trash2, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { emergencyCleanup } from "@/lib/diagnostics";

interface EmergencyCleanupProps {
  isVisible: boolean;
  onClose: () => void;
}

const EmergencyCleanup: React.FC<EmergencyCleanupProps> = ({
  isVisible,
  onClose,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    spaceFreed: string;
    filesRemoved: number;
    success: boolean;
  } | null>(null);

  const runEmergencyCleanup = async () => {
    setIsRunning(true);
    setProgress(0);
    setResult(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    try {
      const cleanupResult = await emergencyCleanup();
      setResult(cleanupResult);
      setProgress(100);
    } catch (error) {
      console.error("Emergency cleanup failed:", error);
    } finally {
      clearInterval(progressInterval);
      setIsRunning(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-red-900/20 via-orange-900/20 to-red-900/20 border-2 border-red-500/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-400">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
            <span>تنظيف ��وارئ للتخزين</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <Trash2 className="w-5 h-5 text-red-400" />
              <span className="text-sm font-bold text-red-400">
                تحذير: مساحة التخزين منخفضة
              </span>
            </div>
            <p className="text-xs text-gray-300">
              سيقوم التنظيف الطارئ بحذف الملفات المؤقتة والكاش لتحرير مساحة
              فورية
            </p>
          </div>

          {isRunning && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">جاري التنظيف...</span>
                <span className="text-yellow-400">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-700" />
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>فحص وحذف الملفات المؤقتة...</span>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-bold">تم التنظيف بنجاح!</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded bg-black/30 text-center">
                  <div className="text-lg font-bold text-green-400">
                    {result.spaceFreed}
                  </div>
                  <div className="text-xs text-gray-400">مساحة محررة</div>
                </div>
                <div className="p-3 rounded bg-black/30 text-center">
                  <div className="text-lg font-bold text-blue-400">
                    {result.filesRemoved.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">ملفات محذوفة</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            {!isRunning && !result && (
              <>
                <Button
                  onClick={runEmergencyCleanup}
                  className="flex-1 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  بدء التنظيف الطارئ
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-gray-600/50 hover:bg-gray-700/50"
                >
                  إلغاء
                </Button>
              </>
            )}

            {result && (
              <Button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                تم
              </Button>
            )}
          </div>

          <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400">نصيحة</span>
            </div>
            <p className="text-xs text-gray-300">
              لتجنب هذه المشكلة مستقبلاً، فعل التنظيف التلقائي من الإعدادات
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyCleanup;

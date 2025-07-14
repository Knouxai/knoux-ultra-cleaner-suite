import React, { useState } from "react";
import {
  Shield,
  Trash2,
  Eye,
  Lock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Scan,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdvancedToolCard from "@/components/AdvancedToolCard";
import { getToolsByCategory } from "@/lib/toolsRegistry";
import { useNavigate } from "react-router-dom";

const SecurityVault = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const threats = [
    {
      name: "PUP.Optional.OpenCandy",
      type: "برنامج غير مرغوب",
      severity: "متوسط",
      location: "C:\\Users\\User\\AppData\\Local\\Temp\\ochelper.exe",
      size: "2.3 MB",
      detected: "2025-01-11 14:25",
      action: "حجر",
    },
    {
      name: "Tracking.Cookie.DoubleClick",
      type: "كوكيز التتبع",
      severity: "منخفض",
      location: "Multiple Browser Locations",
      size: "15 KB",
      detected: "2025-01-11 13:10",
      action: "حذف",
    },
    {
      name: "Adware.Generic.12435",
      type: "برمجية إعلانية",
      severity: "عالي",
      location: "C:\\Program Files\\FakeApp\\adware.dll",
      size: "847 KB",
      detected: "2025-01-11 11:45",
      action: "عزل",
    },
  ];

  const permissions = [
    {
      app: "Microsoft Teams",
      permissions: ["الكاميرا", "الميكروفون", "الإشعارات"],
      risk: "آمن",
      lastUsed: "2025-01-11 14:30",
    },
    {
      app: "Chrome Browser",
      permissions: ["الموقع", "الكاميرا", "الميكروفون", "الإشعارات"],
      risk: "آمن",
      lastUsed: "2025-01-11 14:25",
    },
    {
      app: "Unknown App",
      permissions: ["ملفات ا��نظام", "شبكة", "تسجيل المفاتيح"],
      risk: "مشبوه",
      lastUsed: "2025-01-11 12:15",
    },
  ];

  const services = [
    {
      name: "إزالة ملفات التجسس",
      description: "فحص وإزالة برمجيات التجسس والتتبع",
      icon: Eye,
      threats: { found: 12, removed: 10, quarantined: 2 },
      lastScan: "2025-01-11 14:30",
      status: "نشط",
    },
    {
      name: "فحص البرمجيات الخفية",
      description: "كشف الفيروسات والبرمجيات الخبيثة المخفية",
      icon: Scan,
      threats: { scanned: 45678, detected: 3, cleaned: 3 },
      lastScan: "2025-01-11 12:15",
      status: "مكتمل",
    },
    {
      name: "إدارة صلاحيات التطبيقات",
      description: "مراقبة والتحكم في صلاحيات البرامج",
      icon: Lock,
      permissions: { apps: 67, restricted: 8, monitoring: 12 },
      lastScan: "2025-01-11 16:00",
      status: "مراقب",
    },
    {
      name: "سجل التعديلات السيئة",
      description: "تتبع التغييرات المشبوهة في النظام",
      icon: AlertTriangle,
      changes: { monitored: 234, suspicious: 5, blocked: 2 },
      lastScan: "2025-01-11 15:45",
      status: "نشط",
    },
    {
      name: "حماية الخصوصية",
      description: "حذف آثار التصفح والبيانات الشخصية",
      icon: Shield,
      privacy: { cleared: 156, protected: 89, encrypted: 12 },
      lastScan: "2025-01-11 13:20",
      status: "محمي",
    },
    {
      name: "حذف غير قابل للاسترجاع",
      description: "حذف آمن للملفات الحساسة نهائياً",
      icon: Trash2,
      files: { deleted: 45, shredded: 12, size: "2.8 GB" },
      lastScan: "2025-01-11 10:30",
      status: "جاهز",
    },
    {
      name: "قفل أدوات النظام",
      description: "حماية إعدادات النظام من التعديل غير المصرح",
      icon: Lock,
      protection: { locked: 23, monitored: 45, alerts: 2 },
      lastScan: "2025-01-11 09:15",
      status: "مفعل",
    },
  ];

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 3;
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center pulse-glow">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold neon-glow">خزنة الأمان</h1>
                <p className="text-muted-foreground">
                  حماية شاملة ضد التهديدات والبرمجيات الخبيثة
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-500">15</div>
                <div className="text-sm text-muted-foreground">
                  تهديدات مكتشفة
                </div>
              </div>
              <Button
                onClick={startScan}
                disabled={isScanning}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3"
              >
                {isScanning ? "جاري الفحص..." : "فحص شامل"}
              </Button>
            </div>
          </div>

          {isScanning && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">
                  جاري فحص النظام للتهديدات...
                </span>
                <span className="text-sm text-muted-foreground">
                  {scanProgress}%
                </span>
              </div>
              <Progress value={scanProgress} className="h-3 bg-muted/20" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <span>التهديدات المكتشفة</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threats.map((threat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-lg border bg-muted/20"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{threat.name}</h4>
                          <Badge
                            variant={
                              threat.severity === "عالي"
                                ? "destructive"
                                : threat.severity === "متوسط"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {threat.severity}
                          </Badge>
                          <Badge variant="outline">{threat.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1 font-mono">
                          {threat.location}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>الحجم: {threat.size}</span>
                          <span>اكتُشف: {threat.detected}</span>
                          <span>الإجراء: {threat.action}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="destructive">
                          إزالة
                        </Button>
                        <Button size="sm" variant="outline">
                          حجر
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-primary" />
                  <span>صلاحيات التطبيقات</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {permissions.map((perm, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-lg border bg-muted/20"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{perm.app}</h4>
                          <Badge
                            variant={
                              perm.risk === "مشبوه" ? "destructive" : "outline"
                            }
                          >
                            {perm.risk}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {perm.permissions.map((permission, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              {permission}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          آخر استخدام: {perm.lastUsed}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          تعديل
                        </Button>
                        {perm.risk === "مشبوه" && (
                          <Button size="sm" variant="destructive">
                            حظر
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>حالة الأمان</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">مستوى الحماية</span>
                    <Badge variant="default" className="bg-green-500">
                      عالي
                    </Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>الأمان العام</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>التهديدات المحجورة:</span>
                      <span className="font-bold text-red-500">15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الفحوصات اليوم:</span>
                      <span className="font-mono">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>آخر تحديث:</span>
                      <span className="font-mono text-xs">14:30</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="glass-card hover:glass-button transition-all duration-300 group cursor-pointer"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center group-hover:pulse-glow`}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        service.status === "نشط" ? "default" : "secondary"
                      }
                    >
                      {service.status}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold group-hover:neon-glow transition-all">
                  {service.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(
                        service.threats ||
                          service.permissions ||
                          service.changes ||
                          service.privacy ||
                          service.files ||
                          service.protection,
                      ).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key}:</span>
                          <span className="font-mono">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    آخر فحص: {service.lastScan}
                  </div>

                  <Button className="w-full glass-button rounded-lg hover:neon-border">
                    تشغيل الآن
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityVault;

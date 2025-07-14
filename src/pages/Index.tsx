import React, { useState, useEffect } from "react";
import {
  Heart,
  Zap,
  Wrench,
  Shield,
  Search,
  FlaskConical,
  Brain,
  Settings as SettingsIcon,
  Sparkles,
  Crown,
  Gem,
  Star,
  Rocket,
  Target,
  Play,
  Pause,
  Info,
  TrendingUp,
  Activity,
  Cpu,
  HardDrive,
  Battery,
  Wifi,
  Settings,
  Globe,
  Eye,
  Brain,
  Rocket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import KnouxHeader from "@/components/KnouxHeader";
import UltraServiceCard from "@/components/UltraServiceCard";
import SystemStatus from "@/components/SystemStatus";
import BlackDiamondModal from "@/components/BlackDiamondModal";
import KnouxAISidekick from "@/components/KnouxAISidekick";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showBlackDiamond, setShowBlackDiamond] = useState(false);
  const [systemPulse, setSystemPulse] = useState(98);
  const [activeHolo, setActiveHolo] = useState<string | null>(null);
  const [showAISidekick, setShowAISidekick] = useState(true);
  const navigate = useNavigate();

  // تأثير النبض الحي للنظام
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemPulse((prev) =>
        Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 2)),
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const ultraServices = [
    {
      title: "Health AI Center",
      titleAr: "مركز الصحة الذكي الخارق",
      description:
        "نظام ذكاء اصطناعي متطور لمراقبة وتحليل صحة النظام مع قدرات التنبؤ الكمية",
      icon: Heart,
      color: "from-red-500 via-pink-500 to-purple-600",
      level: "LEGENDARY" as const,
      power: 9850,
      status: "ACTIVE" as const,
      route: "/health-ai-center",
      services: [
        "تحليل صحة النظام AI",
        "التنبؤ بالأعطال المستقبلية",
        "مراقبة الموارد الحيوية",
        "ت��صيات الصيانة الذكية",
        "فحص صحة البطارية",
        "التحليل البيئي المتقدم",
        "نظام الإنذار المبكر",
        "التشخيص الجزيئي",
        "إصلاح الأخطاء تلقائياً",
      ],
      actions: [
        {
          id: "scan",
          name: "فحص شامل",
          description: "فحص عميق للنظام",
          icon: Search,
          type: "primary" as const,
        },
        {
          id: "predict",
          name: "تحليل تنبؤي",
          description: "توقع المشاكل",
          icon: Brain,
          type: "info" as const,
        },
        {
          id: "heal",
          name: "الشفاء التلقائي",
          description: "إصلاح فوري",
          icon: Heart,
          type: "secondary" as const,
        },
        {
          id: "boost",
          name: "تعزيز صحي",
          description: "تحسين الأداء",
          icon: TrendingUp,
          type: "primary" as const,
        },
      ],
      stats: {
        "مشاكل حُلت": 2847,
        "توقعات دقيقة": 156,
        "وقت الاستجابة": "0.3ms",
        "دقة ال��شخيص": "99.7%",
        "عمليات ناجحة": 15420,
        "طاقة AI": "∞",
      },
    },
    {
      title: "Hyper Clean Engine",
      titleAr: "محرك التنظيف الفائق الكمي",
      description:
        "محرك تنظيف متعدد الأبعاد يستخدم تقنيات الكموم لإزالة البيانات على المستوى الذري",
      icon: Zap,
      color: "from-green-500 via-emerald-500 to-teal-600",
      level: "COSMIC" as const,
      power: 12000,
      status: "READY" as const,
      route: "/hyper-clean-engine",
      services: [
        "تنظيف الملفات المؤقتة",
        "إزالة مخلفات التحديثات",
        "تنظيف المتصفحات العميق",
        "تحليل الملفات غير المستخدمة",
        "تنظيف آثار البرامج القديمة",
        "تفريغ الحافظة الذكي",
        "التنظيف التلقائي المجدول",
        "تنظيف على مستوى الذرة",
        "ضغط الفراغ الكمي",
      ],
      actions: [
        {
          id: "quantum-clean",
          name: "تنظيف كمي",
          description: "تنظيف متعدد الأبعاد",
          icon: Sparkles,
          type: "primary" as const,
        },
        {
          id: "deep-scan",
          name: "فحص عميق",
          description: "تحليل شامل",
          icon: Search,
          type: "info" as const,
        },
        {
          id: "auto-schedule",
          name: "جدولة ذكية",
          description: "تنظيف تلقائي",
          icon: Activity,
          type: "secondary" as const,
        },
        {
          id: "emergency-clean",
          name: "تنظيف طوارئ",
          description: "تنظيف فوري",
          icon: Zap,
          type: "danger" as const,
        },
      ],
      stats: {
        "مساحة محررة": "847 GB",
        "ملفات محذوفة": 95847,
        "سرعة التنظيف": "2.8 GB/s",
        "كفاءة الطاقة": "99.9%",
        "عمليات تنظيف": 5627,
        "طاقة كمية": "∞",
      },
    },
    {
      title: "Performance Reactor",
      titleAr: "مفاعل الأداء النووي",
      description:
        "مفاعل طاقة متقدم يولد قوة ��اسوبية خارقة ويحسن الأداء باستخدام تقنيات الاندماج",
      icon: Rocket,
      color: "from-orange-500 via-red-500 to-pink-600",
      level: "EXPERT" as const,
      power: 8500,
      status: "PROCESSING" as const,
      route: "/performance-reactor",
      services: [
        "إدارة العمليات الثقيلة",
        "تسريع الإقلاع النووي",
        "إدارة الخدمات الذكية",
        "ضغط العمليات الكمي",
        "تحسين PageFile المتقدم",
        "تحرير RAM الفوري",
        "وضع Turbo Mode الخارق",
        "توليد طاقة إضافية",
        "تسريع الضوء",
      ],
      actions: [
        {
          id: "turbo-boost",
          name: "Turbo Mode",
          description: "تسريع خارق",
          icon: Rocket,
          type: "primary" as const,
        },
        {
          id: "nuclear-optimize",
          name: "تحسين نووي",
          description: "قوة قصوى",
          icon: Zap,
          type: "danger" as const,
        },
        {
          id: "energy-manage",
          name: "إدارة الطاقة",
          description: "توفير ذكي",
          icon: Battery,
          type: "secondary" as const,
        },
        {
          id: "quantum-speed",
          name: "سرعة كمية",
          description: "تجاوز الضوء",
          icon: Star,
          type: "info" as const,
        },
      ],
      stats: {
        "سرعة المعالج": "+340%",
        "ذاكرة محررة": "15.8 GB",
        "وقت الإقلاع": "3.2s",
        "طاقة مولدة": "2.4 TW",
        "عمليات/ثانية": "∞",
        "كفاءة نووية": "99.99%",
      },
    },
    {
      title: "Driver & Software Hub",
      titleAr: "مركز التعريفات الكوني",
      description:
        "محطة فضائية متقدمة لإدارة جميع التعريفات والبرامج عبر الأبعاد المتعددة",
      icon: Wrench,
      color: "from-blue-500 via-indigo-500 to-purple-600",
      level: "ADVANCED" as const,
      power: 7200,
      status: "ACTIVE" as const,
      route: "/driver-software-hub",
      services: [
        "تحديث التعريفات الفوري",
        "تحليل التوافق الكمي",
        "نسخ احتياطي بعدي",
        "إزالة التعريفات المتحجرة",
        "ت��ديث البرامج التلقائي",
        "كشف البرامج الشبحية",
        "تحليل التوافق الجيني",
        "استقدام من بعد آخر",
        "إصلاح الحمض النووي",
      ],
      actions: [
        {
          id: "auto-update",
          name: "تحديث تلقائي",
          description: "تحديث شامل",
          icon: TrendingUp,
          type: "primary" as const,
        },
        {
          id: "driver-heal",
          name: "شفاء التعريفات",
          description: "إصلاح الأخطاء",
          icon: Heart,
          type: "secondary" as const,
        },
        {
          id: "dimension-sync",
          name: "مزامنة بعدية",
          description: "ربط الأبعاد",
          icon: Target,
          type: "info" as const,
        },
        {
          id: "force-install",
          name: "تثبيت قسري",
          description: "تثبيت جبري",
          icon: Zap,
          type: "danger" as const,
        },
      ],
      stats: {
        "تعريفات محدثة": 2847,
        "برامج مثبتة": 156,
        "مشاكل حُلت": 89,
        "نسب نجاح": "97.8%",
        "أبعاد متصلة": 7,
        "طاقة بعدية": "∞",
      },
    },
    {
      title: "Security Vault",
      titleAr: "خزنة الأمان الكونية",
      description:
        "حصن أمني منيع يحمي النظام باستخدام درع طاقة متعدد الطبقات وحماية كمية",
      icon: Shield,
      color: "from-purple-600 via-indigo-600 to-blue-700",
      level: "LEGENDARY" as const,
      power: 11500,
      status: "ACTIVE" as const,
      route: "/security-vault",
      services: [
        "إز��لة ملفات التجسس الكمية",
        "فحص البرمجيات الخفية",
        "إدارة صلاحيات البعد",
        "سجل التعديلات الزمنية",
        "حماية الخصوصية المطلقة",
        "حذف غير قابل للاستعادة",
        "قفل أدوات النظام الكمي",
        "درع الطاقة النشط",
        "حماية من السفر الزمني",
      ],
      actions: [
        {
          id: "quantum-shield",
          name: "درع كمي",
          description: "حماية مطلقة",
          icon: Shield,
          type: "primary" as const,
        },
        {
          id: "threat-scan",
          name: "فحص التهديدات",
          description: "كشف الأخطار",
          icon: Search,
          type: "info" as const,
        },
        {
          id: "privacy-mode",
          name: "وضع الخصوصية",
          description: "حماية شاملة",
          icon: Crown,
          type: "secondary" as const,
        },
        {
          id: "secure-wipe",
          name: "محو آمن",
          description: "حذف نهائي",
          icon: Zap,
          type: "danger" as const,
        },
      ],
      stats: {
        "تهديدات أُحبطت": 15847,
        "مستوى الحماية": "∞",
        "ملفات محمية": 2847596,
        "خروقات منعت": 0,
        "طبقات الدرع": 12,
        "طاقة الحماية": "∞",
      },
    },
    {
      title: "Deep Analysis & Logs",
      titleAr: "مختبر التحليل العميق",
      description:
        "مختبر تحليل متقدم يستكشف أعماق النظام ويحلل البيانات على المستوى الجزيئي",
      icon: Search,
      color: "from-teal-500 via-cyan-500 to-blue-600",
      level: "EXPERT" as const,
      power: 9200,
      status: "READY" as const,
      route: "/deep-analysis-logs",
      services: [
        "تحليل القرص الذري",
        "رسومات بيانية هولوجرافية",
        "عرض السجلات الزمنية",
        "تتبع تغييرات الكمو��",
        "تحليل التطبيقات العصبي",
        "كش�� الملفات المكررة الكمي",
        "سجل النظام AI",
        "تحليل البصمة الرقمية",
        "رؤية الأبعاد المخفية",
      ],
      actions: [
        {
          id: "deep-scan",
          name: "تحليل عميق",
          description: "فحص شامل",
          icon: Search,
          type: "primary" as const,
        },
        {
          id: "molecular-view",
          name: "رؤية جزيئية",
          description: "تحليل دقيق",
          icon: Eye,
          type: "info" as const,
        },
        {
          id: "time-trace",
          name: "تتبع زمني",
          description: "سجل التغييرات",
          icon: Activity,
          type: "secondary" as const,
        },
        {
          id: "data-mine",
          name: "تعدين البيانات",
          description: "استخراج معلومات",
          icon: Gem,
          type: "primary" as const,
        },
      ],
      stats: {
        "بيانات محللة": "847 TB",
        "أنماط مكتشفة": 15847,
        "ت��ارير منتجة": 2847,
        "دقة الت��ليل": "99.97%",
        "أبعاد مستكشفة": 11,
        "ذكاء مكتسب": "∞",
      },
    },
  ];

  // معلومات النظام الحية
  const liveSystemData = [
    {
      name: "نبض النظام",
      value: systemPulse,
      icon: Heart,
      color: "text-red-400",
    },
    { name: "الطاقة الكمية", value: 94.7, icon: Zap, color: "text-yellow-400" },
    {
      name: "الشبكة العصبية",
      value: 87.3,
      icon: Brain,
      color: "text-purple-400",
    },
    { name: "درع الحماية", value: 99.9, icon: Shield, color: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 relative overflow-hidden">
      {/* خلفية النجوم المتحركة */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <KnouxHeader
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode(!darkMode)}
          onBlackDiamondAccess={() => setShowBlackDiamond(true)}
          onSettingsClick={() => navigate("/settings")}
        />

        {/* شريط الحالة المتقدم */}
        <div className="glass-card rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 animate-pulse" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="flex items-center space-x-4 mb-4">
                <Sparkles className="w-8 h-8 text-purple-400 animate-spin" />
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    مركز التحكم الكوني النشط
                  </h2>
                  <p className="text-gray-400">
                    جميع الأنظمة تعمل بكفاءة خارقة
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {liveSystemData.map((metric, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl bg-black/20 border border-gray-600/30"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <div className="text-xl font-bold text-white mb-1">
                      {metric.value.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-400">{metric.name}</div>
                    <Progress
                      value={metric.value}
                      className="h-1 mt-2 bg-gray-700"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => navigate("/knoux-ultra-hub")}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:scale-105 transition-transform shadow-xl"
              >
                <Crown className="w-5 h-5 mr-2" />
                Ultra Hub الخارق
              </Button>

              <div className="glass-card p-4 rounded-xl">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-green-400" />
                  العمليات النشطة
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">تنظيف كمي</span>
                    <span className="text-green-400">جاري</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">حماية نشطة</span>
                    <span className="text-blue-400">��فعل</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">مراقبة AI</span>
                    <span className="text-purple-400">نشط</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* الخدمات الخارقة */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Gem className="w-8 h-8 text-purple-400 animate-pulse" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              الخدمات الخارقة المتطورة
            </h2>
            <Star className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ultraServices.map((service, index) => (
              <UltraServiceCard
                key={index}
                {...service}
                onClick={() => navigate(service.route)}
              />
            ))}
          </div>
        </div>

        {/* لوحة معلومات سريعة */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SystemStatus />
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>النصائح الكمية الذكية</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-black/20 border border-purple-500/30">
                <Sparkles className="w-4 h-4 text-purple-400 mt-1" />
                <p className="text-gray-300">
                  نظامك يعمل بكفاءة خارقة! جرب الـ Ultra Hub للقوى الإضافية
                </p>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-black/20 border border-blue-500/30">
                <Rocket className="w-4 h-4 text-blue-400 mt-1" />
                <p className="text-gray-300">
                  تم تفعيل وضع Turbo Mode تلقائياً لتحسين الأداء
                </p>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-black/20 border border-green-500/30">
                <Shield className="w-4 h-4 text-green-400 mt-1" />
                <p className="text-gray-300">
                  درع الحماية الكمي نشط ويحمي نظامك من جميع التهديدات
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* الوصول السريع للأدوات المتقدمة */}
        <div className="glass-card p-6 rounded-2xl mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center pulse-glow">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold neon-glow">
                  مركز الأدوات المتقدمة
                </h3>
                <p className="text-muted-foreground">
                  أدوات متخصصة وكونية للمحترفين
                </p>
              </div>
            </div>

            <Button
              onClick={() => navigate("/advanced-tools-hub")}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3"
            >
              <SettingsIcon className="w-4 h-4 mr-2" />
              فتح مدير الأدوات
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-lg text-center hover:glass-button transition-all cursor-pointer group">
              <Shield className="w-8 h-8 text-red-500 mx-auto mb-2 group-hover:animate-pulse" />
              <h4 className="font-semibold text-sm">أدوات الأمان</h4>
              <p className="text-xs text-muted-foreground">4 أدوات متوفرة</p>
            </div>

            <div className="glass-card p-4 rounded-lg text-center hover:glass-button transition-all cursor-pointer group">
              <Zap className="w-8 h-8 text-green-500 mx-auto mb-2 group-hover:animate-pulse" />
              <h4 className="font-semibold text-sm">تحسين ��لأداء</h4>
              <p className="text-xs text-muted-foreground">3 أدوات متوفرة</p>
            </div>

            <div className="glass-card p-4 rounded-lg text-center hover:glass-button transition-all cursor-pointer group">
              <Globe className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:animate-pulse" />
              <h4 className="font-semibold text-sm">أدوات الشبكة</h4>
              <p className="text-xs text-muted-foreground">2 أدوات متوفرة</p>
            </div>

            <div className="glass-card p-4 rounded-lg text-center hover:glass-button transition-all cursor-pointer group">
              <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2 group-hover:animate-pulse" />
              <h4 className="font-semibold text-sm">أدوات كونية</h4>
              <p className="text-xs text-muted-foreground">2 أدوات متوفرة</p>
            </div>
          </div>
        </div>

        {/* خارطة التطوير القادمة - Omega Update 1.1 */}
        <div className="glass-card p-6 rounded-2xl mt-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 animate-pulse" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl flex items-center justify-center pulse-glow">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rainbow">
                    Omega Update 1.1 - النقلة التطويرية الكبرى
                  </h3>
                  <p className="text-muted-foreground">
                    من الكمال إلى ما وراء الخيال • 10 ميزات ثورية قادمة
                  </p>
                </div>
              </div>

              <Button
                onClick={() => navigate("/omega-roadmap")}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-6 py-3 cosmic-button"
              >
                <Star className="w-4 h-4 mr-2" />
                استكشف المستقبل
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-lg text-center hover:glass-button transition-all cursor-pointer group">
                <Bot className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:animate-pulse" />
                <h4 className="font-semibold text-sm">مساعد ذكي Knoux-AI</h4>
                <p className="text-xs text-muted-foreground">
                  محادثة AI في كل أداة
                </p>
              </div>

              <div className="glass-card p-4 rounded-lg text-center hover:glass-button transition-all cursor-pointer group">
                <Eye className="w-8 h-8 text-pink-400 mx-auto mb-2 group-hover:animate-pulse" />
                <h4 className="font-semibold text-sm">Matrix View Mode</h4>
                <p className="text-xs text-muted-foreground">
                  واجهة ثلاثية الأبعاد
                </p>
              </div>

              <div className="glass-card p-4 rounded-lg text-center hover:glass-button transition-all cursor-pointer group">
                <Brain className="w-8 h-8 text-red-400 mx-auto mb-2 group-hover:animate-pulse" />
                <h4 className="font-semibold text-sm">Neural-Sync™</h4>
                <p className="text-xs text-muted-foreground">
                  تعلم من سلوك المستخدم
                </p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                🚀 التقدم الإجمالي:{" "}
                <span className="text-purple-400 font-semibold">42%</span> • ⏰
                موعد الإطلاق:{" "}
                <span className="text-pink-400 font-semibold">Q2 2025</span> •
                💎 مستوى التعقيد:{" "}
                <span className="text-red-400 font-semibold">ما وراء كوني</span>
              </p>
            </div>
          </div>
        </div>

        {/* شعار نهائي */}
        <div className="text-center glass-card p-8 rounded-2xl mt-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 animate-pulse" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
              "كنوكس ماشي معاك في ��حلة الكون الرقمي 🚀✨"
            </h2>
            <p className="text-gray-300 text-lg">
              أول نظام ذكاء كوني متكامل في الكون • تقنيات ما وراء المستقبل
            </p>
          </div>
        </div>
      </div>

      <BlackDiamondModal
        isOpen={showBlackDiamond}
        onClose={() => setShowBlackDiamond(false)}
      />
    </div>
  );
};

export default Index;

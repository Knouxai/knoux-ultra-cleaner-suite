import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Palette,
  Shield,
  Zap,
  Brain,
  Crown,
  Sparkles,
  Star,
  Gem,
  Diamond,
  Eye,
  Lock,
  Unlock,
  Target,
  Moon,
  Sun,
  Globe,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Activity,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  Gauge,
  Sliders,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    // إعدادات عامة
    theme: "dark",
    language: "ar",
    autoClean: true,
    notifications: true,
    soundEffects: true,
    animations: true,

    // إعدادات الأداء
    turboMode: false,
    quantumOptimization: true,
    neuralSync: true,
    autoBoost: [85],
    cleaningIntensity: [75],

    // إعدادات الأمان
    blackDiamondAccess: true,
    securityLevel: "maximum",
    privacyMode: true,
    autoDefense: true,

    // إعدادات متقدمة
    cosmicMode: false,
    dimensionalAccess: false,
    quantumField: [60],
    aiAssistance: true,
    experimentalFeatures: false,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const settingsSections = [
    {
      id: "general",
      name: "عام",
      icon: SettingsIcon,
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "performance",
      name: "الأداء",
      icon: Zap,
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "security",
      name: "الأمان",
      icon: Shield,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "advanced",
      name: "متقدم",
      icon: Brain,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "cosmic",
      name: "كوني",
      icon: Crown,
      color: "from-indigo-600 to-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 relative overflow-hidden">
      {/* خلفية النجوم */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(100)].map((_, i) => (
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* الهيدر */}
        <div className="glass-card p-8 rounded-3xl mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 animate-pulse" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div
                className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 
                            rounded-full flex items-center justify-center shadow-2xl"
              >
                <SettingsIcon
                  className="w-10 h-10 text-white animate-spin"
                  style={{ animationDuration: "8s" }}
                />
              </div>
              <div>
                <h1
                  className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 
                             bg-clip-text text-transparent mb-2"
                >
                  ⚙️ مركز التحكم الكوني
                </h1>
                <p className="text-gray-300 text-lg">
                  إعدادات النظام الخارق المتطور
                </p>
                <p className="text-sm text-gray-400 font-mono">
                  Cosmic Control Center • Advanced System Configuration
                </p>
              </div>
            </div>

            <div className="text-right">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-4 py-2 mb-2">
                SYSTEM OPTIMAL
              </Badge>
              <div className="text-sm text-gray-300">
                جميع الأنظمة تعمل بكفاءة 100%
              </div>
            </div>
          </div>
        </div>

        {/* التبويبات */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5 bg-black/30 border border-gray-600/50 rounded-2xl p-2">
            {settingsSections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className={`flex items-center space-x-2 rounded-xl py-3 px-4 text-sm font-medium
                           transition-all duration-300 hover:scale-105
                           ${
                             activeTab === section.id
                               ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                               : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                           }`}
              >
                <section.icon className="w-4 h-4" />
                <span>{section.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* الإعدادات العامة */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5 text-blue-400" />
                    <span>المظهر والواجهة</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">السمة</label>
                      <p className="text-xs text-gray-400">
                        اختيار السمة الظاهرة
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant={
                          settings.theme === "dark" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => updateSetting("theme", "dark")}
                        className="px-3"
                      >
                        <Moon className="w-4 h-4 mr-1" />
                        داكن
                      </Button>
                      <Button
                        variant={
                          settings.theme === "light" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => updateSetting("theme", "light")}
                        className="px-3"
                      >
                        <Sun className="w-4 h-4 mr-1" />
                        فاتح
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">اللغة</label>
                      <p className="text-xs text-gray-400">لغة الواجهة</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant={
                          settings.language === "ar" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => updateSetting("language", "ar")}
                      >
                        العربية
                      </Button>
                      <Button
                        variant={
                          settings.language === "en" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => updateSetting("language", "en")}
                      >
                        English
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">
                        التأثيرات البصرية
                      </label>
                      <p className="text-xs text-gray-400">
                        تفعيل الحركات والتأثيرات
                      </p>
                    </div>
                    <Switch
                      checked={settings.animations}
                      onCheckedChange={(value) =>
                        updateSetting("animations", value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-green-400" />
                    <span>التنبيهات والأصوات</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">التنبيهات</label>
                      <p className="text-xs text-gray-400">إشعارات النظام</p>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(value) =>
                        updateSetting("notifications", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">
                        المؤثرات الصوتية
                      </label>
                      <p className="text-xs text-gray-400">أصوات التفاعل</p>
                    </div>
                    <Switch
                      checked={settings.soundEffects}
                      onCheckedChange={(value) =>
                        updateSetting("soundEffects", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">
                        التنظيف التلقائي
                      </label>
                      <p className="text-xs text-gray-400">تنظيف دوري للنظام</p>
                    </div>
                    <Switch
                      checked={settings.autoClean}
                      onCheckedChange={(value) =>
                        updateSetting("autoClean", value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* إعدادات الأداء */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span>تحسين الأداء</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">وضع Turbo</label>
                      <p className="text-xs text-gray-400">أداء فائق السرعة</p>
                    </div>
                    <Switch
                      checked={settings.turboMode}
                      onCheckedChange={(value) =>
                        updateSetting("turboMode", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">
                        التحسين الكمي
                      </label>
                      <p className="text-xs text-gray-400">خوارزميات متقدمة</p>
                    </div>
                    <Switch
                      checked={settings.quantumOptimization}
                      onCheckedChange={(value) =>
                        updateSetting("quantumOptimization", value)
                      }
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>قوة التعزيز التلقائي</span>
                      <span>{settings.autoBoost[0]}%</span>
                    </div>
                    <Slider
                      value={settings.autoBoost}
                      onValueChange={(value) =>
                        updateSetting("autoBoost", value)
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>شدة التنظيف</span>
                      <span>{settings.cleaningIntensity[0]}%</span>
                    </div>
                    <Slider
                      value={settings.cleaningIntensity}
                      onValueChange={(value) =>
                        updateSetting("cleaningIntensity", value)
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    <span>مراقبة النظام</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        name: "المعالج",
                        value: 45,
                        icon: Cpu,
                        color: "text-blue-400",
                      },
                      {
                        name: "الذاكرة",
                        value: 68,
                        icon: HardDrive,
                        color: "text-green-400",
                      },
                      {
                        name: "الشبكة",
                        value: 23,
                        icon: Wifi,
                        color: "text-yellow-400",
                      },
                      {
                        name: "البطارية",
                        value: 89,
                        icon: Battery,
                        color: "text-red-400",
                      },
                    ].map((metric, index) => (
                      <div
                        key={index}
                        className="text-center p-3 rounded-lg bg-black/30 border border-gray-600/30"
                      >
                        <metric.icon
                          className={`w-5 h-5 mx-auto mb-2 ${metric.color}`}
                        />
                        <div className="text-sm font-bold text-white">
                          {metric.value}%
                        </div>
                        <div className="text-xs text-gray-400">
                          {metric.name}
                        </div>
                        <Progress value={metric.value} className="h-1 mt-2" />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">
                        المزامنة العصبية
                      </label>
                      <p className="text-xs text-gray-400">تزامن مع AI</p>
                    </div>
                    <Switch
                      checked={settings.neuralSync}
                      onCheckedChange={(value) =>
                        updateSetting("neuralSync", value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* إعدادات الأمان */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span>الحماية والأمان</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">
                        BlackDiamond™ Access
                      </label>
                      <p className="text-xs text-gray-400">
                        الوصول للأدوات السرية
                      </p>
                    </div>
                    <Switch
                      checked={settings.blackDiamondAccess}
                      onCheckedChange={(value) =>
                        updateSetting("blackDiamondAccess", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">
                        وضع الخصوصية
                      </label>
                      <p className="text-xs text-gray-400">
                        حماية البيانات الشخصية
                      </p>
                    </div>
                    <Switch
                      checked={settings.privacyMode}
                      onCheckedChange={(value) =>
                        updateSetting("privacyMode", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">
                        الدفاع التلقائي
                      </label>
                      <p className="text-xs text-gray-400">
                        حماية تلقائية من التهديدات
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoDefense}
                      onCheckedChange={(value) =>
                        updateSetting("autoDefense", value)
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      مستوى الأمان
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["basic", "enhanced", "maximum"].map((level) => (
                        <Button
                          key={level}
                          variant={
                            settings.securityLevel === level
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => updateSetting("securityLevel", level)}
                          className="text-xs"
                        >
                          {level === "basic"
                            ? "أساسي"
                            : level === "enhanced"
                              ? "محسن"
                              : "أقصى"}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-blue-400" />
                    <span>المراقبة الأمنية</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      {
                        name: "تهديدات محبطة",
                        value: 15847,
                        color: "text-red-400",
                      },
                      {
                        name: "فحوصات أمنية",
                        value: 2847,
                        color: "text-green-400",
                      },
                      {
                        name: "ملفات محمية",
                        value: 156234,
                        color: "text-blue-400",
                      },
                      {
                        name: "خروقات منعت",
                        value: 0,
                        color: "text-purple-400",
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 rounded-lg bg-black/30 border border-gray-600/30"
                      >
                        <span className="text-sm text-gray-300">
                          {stat.name}
                        </span>
                        <span className={`text-sm font-bold ${stat.color}`}>
                          {stat.value.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* الإعدادات المتقدمة */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span>الذكاء الاصطناعي</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">
                        مساعد الذكاء الاصطناعي
                      </label>
                      <p className="text-xs text-gray-400">AI Assistant نشط</p>
                    </div>
                    <Switch
                      checked={settings.aiAssistance}
                      onCheckedChange={(value) =>
                        updateSetting("aiAssistance", value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">
                        الميزات التجريبية
                      </label>
                      <p className="text-xs text-gray-400">ميزات قيد التطوير</p>
                    </div>
                    <Switch
                      checked={settings.experimentalFeatures}
                      onCheckedChange={(value) =>
                        updateSetting("experimentalFeatures", value)
                      }
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-bold text-yellow-400">
                        تحذير
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">
                      الميزات التجريبية قد تؤثر على استقرار النظام
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sliders className="w-5 h-5 text-cyan-400" />
                    <span>تحكم متقدم</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>قوة الحقل الكمي</span>
                      <span>{settings.quantumField[0]}%</span>
                    </div>
                    <Slider
                      value={settings.quantumField}
                      onValueChange={(value) =>
                        updateSetting("quantumField", value)
                      }
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform"
                      onClick={() => console.log("تم تطبيق الإعدادات")}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      تطبيق
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-600/50 hover:bg-gray-700/50"
                      onClick={() => console.log("تم إعادة التعيين")}
                    >
                      إعادة تعيين
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* الإعدادات الكونية */}
          <TabsContent value="cosmic" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="w-5 h-5 text-purple-400" />
                    <span>الإعدادات الكونية الخارقة</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 rounded-lg bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 border border-purple-500/30">
                    <div className="flex items-center space-x-4 mb-4">
                      <Diamond className="w-8 h-8 text-purple-400 animate-pulse" />
                      <div>
                        <h3 className="text-lg font-bold text-purple-400">
                          الوضع الكوني
                        </h3>
                        <p className="text-sm text-gray-300">
                          إطلاق القوى الخارقة للنظام
                        </p>
                      </div>
                      <Switch
                        checked={settings.cosmicMode}
                        onCheckedChange={(value) =>
                          updateSetting("cosmicMode", value)
                        }
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 rounded bg-black/30">
                        <Star className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                        <div className="text-xs text-gray-300">
                          الطاقة النجمية
                        </div>
                        <div className="text-sm font-bold text-white">∞</div>
                      </div>
                      <div className="p-3 rounded bg-black/30">
                        <Gem className="w-6 h-6 mx-auto mb-1 text-purple-400" />
                        <div className="text-xs text-gray-300">
                          البلورات الكمية
                        </div>
                        <div className="text-sm font-bold text-white">247</div>
                      </div>
                      <div className="p-3 rounded bg-black/30">
                        <Crown className="w-6 h-6 mx-auto mb-1 text-blue-400" />
                        <div className="text-xs text-gray-300">
                          الأبعاد النشطة
                        </div>
                        <div className="text-sm font-bold text-white">11</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-gray-600/30">
                    <div>
                      <label className="text-sm font-medium">
                        الوصول البُعدي
                      </label>
                      <p className="text-xs text-gray-400">
                        السفر عبر الأبعاد المتعددة
                      </p>
                    </div>
                    <Switch
                      checked={settings.dimensionalAccess}
                      onCheckedChange={(value) =>
                        updateSetting("dimensionalAccess", value)
                      }
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <Lock className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-bold text-red-400">
                        تحذير كوني
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">
                      تفعيل الوضع الكوني قد يؤدي إلى تغييرات جذرية في بنية
                      الواقع الرقمي. استخدم بحذر شديد ومسؤوليتك الشخصية.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;

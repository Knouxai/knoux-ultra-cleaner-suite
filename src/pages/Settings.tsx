
import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Globe, Bell, Shield, HardDrive, Cpu, Palette, Key, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoClean, setAutoClean] = useState(true);
  const [highPerformance, setHighPerformance] = useState(false);

  const generalSettings = [
    {
      title: 'الوضع المظلم',
      description: 'تفعيل الوضع المظلم للواجهة',
      icon: Moon,
      value: darkMode,
      onChange: setDarkMode
    },
    {
      title: 'الإشعارات',
      description: 'تلقي إشعارات حول حالة النظام والتحديثات',
      icon: Bell,
      value: notifications,
      onChange: setNotifications
    },
    {
      title: 'التنظيف التلقائي',
      description: 'تشغيل التنظيف التلقائي يومياً',
      icon: HardDrive,
      value: autoClean,
      onChange: setAutoClean
    },
    {
      title: 'الأداء العالي',
      description: 'تفعيل وضع الأداء العالي (يستهلك طاقة أكثر)',
      icon: Cpu,
      value: highPerformance,
      onChange: setHighPerformance
    }
  ];

  const appearanceSettings = [
    { name: 'الثيم الافتراضي', active: false, preview: 'bg-gradient-to-r from-purple-500 to-blue-600' },
    { name: 'الثيم الأخضر', active: false, preview: 'bg-gradient-to-r from-green-500 to-emerald-600' },
    { name: 'الثيم الأحمر', active: true, preview: 'bg-gradient-to-r from-red-500 to-pink-600' },
    { name: 'الثيم الذهبي', active: false, preview: 'bg-gradient-to-r from-yellow-500 to-orange-600' }
  ];

  const systemInfo = {
    version: 'Knoux CleanMaster Ultra™ v2.1.0',
    build: '2025.01.11.1420',
    license: 'Pro License - مدى الحياة',
    lastUpdate: '2025-01-11',
    database: 'محدثة - 2025-01-11',
    aiModels: 'GPT4All v1.4, LLaMA 2 7B'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center pulse-glow">
              <SettingsIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold neon-glow">الإعدادات المتقدمة</h1>
              <p className="text-muted-foreground">تخصيص وإعداد جميع جوانب النظام</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="glass-card p-1 grid w-full grid-cols-5">
            <TabsTrigger value="general" className="flex items-center space-x-2">
              <SettingsIcon className="w-4 h-4" />
              <span>عام</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>المظهر</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>الأمان</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>متقدم</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>حول</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generalSettings.map((setting, index) => (
                <Card key={index} className="glass-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <setting.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{setting.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{setting.description}</p>
                        </div>
                      </div>
                      <Switch 
                        checked={setting.value}
                        onCheckedChange={setting.onChange}
                      />
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <span>إعدادات اللغة والمنطقة</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">اللغة</label>
                    <select className="w-full p-2 rounded-lg bg-muted/20 border border-border">
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">المنطقة الزمنية</label>
                    <select className="w-full p-2 rounded-lg bg-muted/20 border border-border">
                      <option value="asia/riyadh">الرياض (GMT+3)</option>
                      <option value="asia/dubai">دبي (GMT+4)</option>
                      <option value="africa/cairo">القاهرة (GMT+2)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>اختيار الثيم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {appearanceSettings.map((theme, index) => (
                    <div key={index} className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      theme.active ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg ${theme.preview}`}></div>
                        <div>
                          <div className="font-medium">{theme.name}</div>
                          {theme.active && <div className="text-sm text-primary">مفعل حالياً</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>إعدادات الواجهة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>التأثيرات الزجاجية</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>الأنيميشن المتقدم</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>التأثيرات النيون</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">شفافية الواجهة</label>
                    <input type="range" min="10" max="100" defaultValue="80" className="w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>إعدادات الأمان</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>حماية BlackDiamond™</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>تشفير السجلات</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>التحقق الثنائي</span>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">كلمة مرور BlackDiamond™</label>
                    <input 
                      type="password" 
                      placeholder="كلمة المرور الحالية"
                      className="w-full p-2 rounded-lg bg-muted/20 border border-border"
                    />
                  </div>
                  <Button className="w-full glass-button">
                    تحديث كلمة المرور
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>إعدادات الأداء المتقدمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">أولوية العمليات</label>
                    <select className="w-full p-2 rounded-lg bg-muted/20 border border-border">
                      <option value="normal">عادي</option>
                      <option value="high">عالي</option>
                      <option value="realtime">وقت حقيقي</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">تكرار المراقبة (ثانية)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="60" 
                      defaultValue="5"
                      className="w-full p-2 rounded-lg bg-muted/20 border border-border"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>وضع المطور</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>السجلات المفصلة</span>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>معلومات النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>الإصدار:</span>
                    <span className="font-mono">{systemInfo.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رقم البناء:</span>
                    <span className="font-mono">{systemInfo.build}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الترخيص:</span>
                    <span className="text-green-500">{systemInfo.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>آخر تحديث:</span>
                    <span>{systemInfo.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>قاعدة البيانات:</span>
                    <span className="text-green-500">{systemInfo.database}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>نماذج AI:</span>
                    <span className="font-mono text-xs">{systemInfo.aiModels}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="glass-button">
                التحقق من التحديثات
              </Button>
              <Button className="glass-button">
                تصدير الإعدادات
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;

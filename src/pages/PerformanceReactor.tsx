
import React, { useState } from 'react';
import { Zap, Cpu, MemoryStick, HardDrive, Settings, Power, TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const PerformanceReactor = () => {
  const [turboMode, setTurboMode] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const [performanceMetrics, setPerformanceMetrics] = useState({
    bootTime: 28.4,
    responseTime: 145,
    memoryEfficiency: 87,
    cpuOptimization: 92,
    diskPerformance: 78
  });

  const optimizationServices = [
    {
      name: 'إدارة العمليات الثقيلة',
      icon: Activity,
      description: 'تحديد وإدارة العمليات التي تستهلك موارد النظام',
      status: 'نشط',
      impact: 'عالي',
      processes: [
        { name: 'chrome.exe', cpu: 15.2, memory: '2.1 GB', action: 'مراقب' },
        { name: 'discord.exe', cpu: 8.7, memory: '890 MB', action: 'محسن' },
        { name: 'steam.exe', cpu: 0.1, memory: '145 MB', action: 'خامل' }
      ],
      savings: '22% معالج، 1.8 GB ذاكرة'
    },
    {
      name: 'تسريع الإقلاع',
      icon: Power,
      description: 'تحسين برامج بدء التشغيل وتقليل وقت الإقلاع',
      status: 'محسن',
      impact: 'عالي',
      startupApps: [
        { name: 'Discord', status: 'معطل', impact: '8.2s' },
        { name: 'Spotify', status: 'مؤجل', impact: '4.1s' },
        { name: 'Steam', status: 'معطل', impact: '12.5s' },
        { name: 'Adobe Updater', status: 'محذوف', impact: '3.8s' }
      ],
      savings: 'توفير 28.6 ثانية من وقت الإقلاع'
    },
    {
      name: 'إدارة الخدمات غير الهامة',
      icon: Settings,
      description: 'تعطيل خدمات الويندوز غير الضرورية لتحسين الأداء',
      status: 'نشط',
      impact: 'متوسط',
      services: [
        { name: 'Windows Search', status: 'معطل', cpu: '5%' },
        { name: 'Superfetch', status: 'محسن', cpu: '3%' },
        { name: 'Print Spooler', status: 'معطل', cpu: '1%' },
        { name: 'Fax Service', status: 'محذوف', cpu: '0.5%' }
      ],
      savings: '9.5% من استهلاك المعالج'
    },
    {
      name: 'ضغط العمليات غير النشطة',
      icon: MemoryStick,
      description: 'ضغط العمليات الخاملة في الذاكرة لتوفير RAM',
      status: 'نشط',
      impact: 'عالي',
      compressed: [
        { name: 'Background Apps', original: '1.2 GB', compressed: '340 MB' },
        { name: 'System Services', original: '890 MB', compressed: '210 MB' },
        { name: 'Cached Data', original: '2.1 GB', compressed: '520 MB' }
      ],
      savings: '2.8 GB ذاكرة محررة'
    },
    {
      name: 'تحسين PageFile',
      icon: HardDrive,
      description: 'إعادة تكوين ملف الصفحات للحصول على أداء أمثل',
      status: 'محسن',
      impact: 'متوسط',
      config: {
        size: '8192 MB',
        location: 'C:\\ (SSD)',
        management: 'تلقائي ذكي',
        optimization: 'مُحسن للألعاب'
      },
      savings: '45% تحسن في سرعة التبديل'
    },
    {
      name: 'تحرير RAM آنياً',
      icon: MemoryStick,
      description: 'تنظيف فوري للذاكرة عند الوصول للحد الأحمر',
      status: 'جاهز',
      impact: 'عالي',
      threshold: 85,
      lastClean: '2025-01-11 14:22',
      methods: ['Cache Clear', 'Process Trim', 'GC Force'],
      savings: 'متوسط 1.2 GB لكل عملية'
    },
    {
      name: 'Turbo Mode',
      icon: Zap,
      description: 'تخصيص كامل موارد النظام للتطبيق النشط',
      status: turboMode ? 'نشط' : 'متوقف',
      impact: 'أقصى',
      features: [
        'إيقاف العمليات غير الضرورية',
        'تعطيل التأثيرات البصرية',
        'تحسين أولوية المعالج',
        'تخصيص كامل الذاكرة'
      ],
      savings: 'حتى 40% تحسن في الأداء'
    }
  ];

  const startOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => setIsOptimizing(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center pulse-glow">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold neon-glow">مفاعل الأداء</h1>
                <p className="text-muted-foreground">نظام تحسين الأداء المتقدم والتحكم في الموارد</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-red-500">92%</div>
                <div className="text-sm text-muted-foreground">كفاءة الأداء</div>
              </div>
              <Button 
                onClick={startOptimization}
                disabled={isOptimizing}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-3"
              >
                {isOptimizing ? 'جاري التحسين...' : 'تحسين الآن'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">وقت الإقلاع</p>
                  <p className="text-2xl font-bold text-green-500">{performanceMetrics.bootTime}s</p>
                  <p className="text-xs text-muted-foreground">-12.3s محسن</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">زمن الاستجابة</p>
                  <p className="text-2xl font-bold text-blue-500">{performanceMetrics.responseTime}ms</p>
                  <p className="text-xs text-muted-foreground">-89ms محسن</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">كفاءة الذاكرة</p>
                  <p className="text-2xl font-bold text-purple-500">{performanceMetrics.memoryEfficiency}%</p>
                  <p className="text-xs text-muted-foreground">+15% محسن</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">المعالج</p>
                  <p className="text-2xl font-bold text-orange-500">{performanceMetrics.cpuOptimization}%</p>
                  <p className="text-xs text-muted-foreground">+8% محسن</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">القرص</p>
                  <p className="text-2xl font-bold text-teal-500">{performanceMetrics.diskPerformance}%</p>
                  <p className="text-xs text-muted-foreground">+22% محسن</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {optimizationServices.map((service, index) => (
                <Card key={index} className="glass-card hover:glass-button transition-all duration-300 group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center group-hover:pulse-glow`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${
                          service.status === 'نشط' ? 'text-green-500' :
                          service.status === 'محسن' ? 'text-blue-500' :
                          'text-yellow-500'
                        }`}>{service.status}</div>
                        <div className="text-xs text-muted-foreground">تأثير {service.impact}</div>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:neon-glow transition-all">
                      {service.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
                        <div className="font-medium text-green-400 mb-1">النتائج:</div>
                        <div>{service.savings}</div>
                      </div>
                      
                      {service.name === 'Turbo Mode' && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm">تفعيل Turbo Mode</span>
                          <Switch 
                            checked={turboMode}
                            onCheckedChange={setTurboMode}
                          />
                        </div>
                      )}
                      
                      <Button className="w-full glass-button rounded-lg hover:neon-border">
                        {service.name === 'Turbo Mode' ? 
                          (turboMode ? 'إيقاف Turbo' : 'تفعيل Turbo') :
                          'إعادة تحسين'
                        }
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>أداء الوقت الحقيقي</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>المعالج</span>
                      <span>24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>الذاكرة</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>القرص</span>
                      <span>12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>الشبكة</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>إحصائيات الأداء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>التحسينات المطبقة:</span>
                    <span className="font-bold text-green-500">27</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الأداء المحسن:</span>
                    <span className="font-bold text-blue-500">+34%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الذاكرة المحررة:</span>
                    <span className="font-bold text-purple-500">4.2 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>وقت الاستجابة:</span>
                    <span className="font-bold text-orange-500">-145ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReactor;

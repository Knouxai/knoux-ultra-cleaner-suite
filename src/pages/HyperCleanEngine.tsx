
import React, { useState } from 'react';
import { Zap, Trash2, HardDrive, Globe, FolderX, Clipboard, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const HyperCleanEngine = () => {
  const [cleaningProgress, setCleaningProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [autoCleanEnabled, setAutoCleanEnabled] = useState(true);

  const [scanResults, setScanResults] = useState({
    tempFiles: { size: '2.4 GB', count: 15420, status: 'ready' },
    updateResidue: { size: '1.8 GB', count: 8, status: 'ready' },
    browserCache: { size: '890 MB', count: 4562, status: 'ready' },
    unusedFiles: { size: '5.2 GB', count: 2134, status: 'ready' },
    appTraces: { size: '340 MB', count: 89, status: 'ready' },
    clipboard: { size: '12 MB', count: 1, status: 'ready' },
    scheduled: { nextClean: 'غداً 2:00 AM', enabled: true }
  });

  const cleaningServices = [
    {
      name: 'تنظيف الملفات المؤقتة',
      icon: Trash2,
      description: 'إزالة جميع الملفات المؤقتة من النظام والتطبيقات',
      size: scanResults.tempFiles.size,
      count: scanResults.tempFiles.count,
      paths: ['%TEMP%', 'C:\\Windows\\Temp', '%LOCALAPPDATA%\\Temp'],
      risk: 'آمن',
      color: 'text-green-500'
    },
    {
      name: 'إزالة مخلفات التحديثات',
      icon: HardDrive,
      description: 'حذف ملفات Windows.old وبقايا التحديثات القديمة',
      size: scanResults.updateResidue.size,
      count: scanResults.updateResidue.count,
      paths: ['C:\\Windows.old', 'C:\\Windows\\SoftwareDistribution'],
      risk: 'آمن',
      color: 'text-blue-500'
    },
    {
      name: 'تنظيف المتصفحات',
      icon: Globe,
      description: 'مسح الكاش والكوكيز وملفات التصفح المؤقتة',
      size: scanResults.browserCache.size,
      count: scanResults.browserCache.count,
      paths: ['Chrome Cache', 'Edge Cache', 'Firefox Cache'],
      risk: 'منخفض',
      color: 'text-orange-500'
    },
    {
      name: 'تحليل الملفات غير المستخدمة',
      icon: FolderX,
      description: 'العثور على الملفات التي لم يتم الوصول إليها لأكثر من 6 أشهر',
      size: scanResults.unusedFiles.size,
      count: scanResults.unusedFiles.count,
      paths: ['Documents', 'Pictures', 'Videos', 'Downloads'],
      risk: 'متوسط',
      color: 'text-yellow-500'
    },
    {
      name: 'تنظيف آثار البرامج القديمة',
      icon: RotateCcw,
      description: 'إزالة مجلدات وملفات البرامج المحذوفة من Registry',
      size: scanResults.appTraces.size,
      count: scanResults.appTraces.count,
      paths: ['Registry Keys', 'Program Files Remnants'],
      risk: 'منخفض',
      color: 'text-purple-500'
    },
    {
      name: 'تفريغ الحافظة',
      icon: Clipboard,
      description: 'مسح محتويات الحافظة وتاريخ النسخ واللصق',
      size: scanResults.clipboard.size,
      count: scanResults.clipboard.count,
      paths: ['Clipboard History'],
      risk: 'آمن',
      color: 'text-cyan-500'
    },
    {
      name: 'التنظيف التلقائي الزمني',
      icon: Clock,
      description: 'جدولة تنظيف تلقائي يومي/اسبوعي حسب الإعدادات',
      size: 'مجدول',
      count: 'يومياً',
      paths: ['Auto Schedule'],
      risk: 'آمن',
      color: 'text-indigo-500'
    }
  ];

  const startCleaning = () => {
    setIsScanning(true);
    setCleaningProgress(0);
    
    // محاكاة عملية التنظيف
    const interval = setInterval(() => {
      setCleaningProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center pulse-glow">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold neon-glow">محرك التنظيف الفائق</h1>
                <p className="text-muted-foreground">نظام تنظيف ذكي متقدم لتحسين أداء النظام</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-500">10.8 GB</div>
                <div className="text-sm text-muted-foreground">قابل للتنظيف</div>
              </div>
              <Button 
                onClick={startCleaning}
                disabled={isScanning}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3"
              >
                {isScanning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isScanning ? 'إيقاف' : 'بدء التنظيف'}
              </Button>
            </div>
          </div>

          {isScanning && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">جاري التنظيف...</span>
                <span className="text-sm text-muted-foreground">{cleaningProgress}%</span>
              </div>
              <Progress value={cleaningProgress} className="h-3 bg-muted/20" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cleaningServices.map((service, index) => (
                <Card key={index} className="glass-card hover:glass-button transition-all duration-300 group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center group-hover:pulse-glow`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{service.size}</div>
                        <div className="text-xs text-muted-foreground">{service.count} عنصر</div>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:neon-glow transition-all">
                      {service.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>المستوى:</span>
                        <span className={`font-medium ${
                          service.risk === 'آمن' ? 'text-green-500' :
                          service.risk === 'منخفض' ? 'text-yellow-500' :
                          'text-orange-500'
                        }`}>{service.risk}</span>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <div className="font-medium mb-1">المسارات:</div>
                        {service.paths.map((path, idx) => (
                          <div key={idx} className="font-mono text-xs opacity-70">• {path}</div>
                        ))}
                      </div>
                      
                      <Button className="w-full glass-button rounded-lg hover:neon-border">
                        تنظيف الآن
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
                  <Clock className="w-5 h-5 text-primary" />
                  <span>التنظيف التلقائي</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">تفعيل التنظيف التلقائي</span>
                    <Switch 
                      checked={autoCleanEnabled}
                      onCheckedChange={setAutoCleanEnabled}
                    />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>التنظيف القادم:</span>
                      <span className="font-mono text-xs">غداً 2:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>التكرار:</span>
                      <span>يومياً</span>
                    </div>
                    <div className="flex justify-between">
                      <span>آخر تنظيف:</span>
                      <span className="font-mono text-xs">أمس</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>إحصائيات الأسبوع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>المساحة المحررة:</span>
                    <span className="font-bold text-green-500">24.6 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الملفات المحذوفة:</span>
                    <span className="font-mono">89,420</span>
                  </div>
                  <div className="flex justify-between">
                    <span>عمليات التنظيف:</span>
                    <span>12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الوقت الموفر:</span>
                    <span>~2.5 ساعة</span>
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

export default HyperCleanEngine;

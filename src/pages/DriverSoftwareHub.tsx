
import React, { useState } from 'react';
import { Wrench, Download, Shield, Archive, RefreshCw, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DriverSoftwareHub = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const driverUpdates = [
    {
      name: 'NVIDIA GeForce RTX 4070',
      currentVersion: '537.58',
      latestVersion: '546.17',
      size: '1.2 GB',
      priority: 'مهم',
      status: 'متاح للتحديث',
      releaseDate: '2025-01-10',
      description: 'تحسينات الأداء للألعاب الجديدة وإصلاح مشاكل الاستقرار'
    },
    {
      name: 'Intel Wi-Fi 6E AX210',
      currentVersion: '23.20.0',
      latestVersion: '23.30.0',
      size: '45 MB',
      priority: 'عادي',
      status: 'متاح للتحديث',
      releaseDate: '2025-01-08',
      description: 'تحسين سرعة الاتصال وإصلاح مشاكل الانقطاع'
    },
    {
      name: 'AMD Ryzen Chipset',
      currentVersion: '5.12.0.58',
      latestVersion: '5.12.0.58',
      size: '-',
      priority: 'منخفض',
      status: 'محدث',
      releaseDate: '2024-12-15',
      description: 'أحدث إصدار مثبت'
    }
  ];

  const softwareUpdates = [
    {
      name: 'Google Chrome',
      currentVersion: '120.0.6099.199',
      latestVersion: '121.0.6167.85',
      size: '156 MB',
      priority: 'أمني',
      status: 'تحديث أمني متاح',
      vulnerability: 'CVE-2025-0001'
    },
    {
      name: 'Adobe Acrobat Reader',
      currentVersion: '23.008.20458',
      latestVersion: '24.001.20643',
      size: '234 MB',
      priority: 'مهم',
      status: 'متاح للتحديث',
      features: 'ميزات جديدة للأمان والأداء'
    },
    {
      name: 'Visual Studio Code',
      currentVersion: '1.85.2',
      latestVersion: '1.86.0',
      size: '98 MB',
      priority: 'عادي',
      status: 'متاح للتحديث',
      features: 'تحسينات على الأداء وإضافات جديدة'
    }
  ];

  const services = [
    {
      name: 'تحديث الدرايفرات',
      description: 'فحص وتحديث جميع تعريفات الأجهزة تلقائياً',
      icon: Download,
      stats: { found: 12, updated: 8, pending: 4 },
      lastScan: '2025-01-11 14:30'
    },
    {
      name: 'تحليل التوافق',
      description: 'فحص توافق البرامج والتعريفات مع النظام',
      icon: Shield,
      stats: { compatible: 98, issues: 2, recommendations: 5 },
      lastScan: '2025-01-11 12:15'
    },
    {
      name: 'نسخ احتياطي للتعريفات',
      description: 'إنشاء نسخة احتياطية من جميع التعريفات المثبتة',
      icon: Archive,
      stats: { backed: 45, size: '2.8 GB', last: '2025-01-10' },
      lastScan: '2025-01-10 08:00'
    },
    {
      name: 'إزالة الدرايفرات القديمة',
      description: 'حذف التعريفات القديمة وغير المستخدمة',
      icon: RefreshCw,
      stats: { found: 8, removed: 6, space: '340 MB' },
      lastScan: '2025-01-11 10:00'
    },
    {
      name: 'تحديث البرامج',
      description: 'فحص وتحديث جميع البرامج المثبتة',
      icon: Download,
      stats: { programs: 67, updates: 12, security: 3 },
      lastScan: '2025-01-11 16:20'
    },
    {
      name: 'كشف البرامج المعطوبة',
      description: 'اكتشاف البرامج التالفة أو غير المكتملة',
      icon: AlertTriangle,
      stats: { scanned: 89, corrupted: 2, repaired: 1 },
      lastScan: '2025-01-11 13:45'
    },
    {
      name: 'تحليل التوافق مع النظام',
      description: 'فحص متطلبات النظام للبرامج والتعريفات',
      icon: CheckCircle,
      stats: { analyzed: 156, compatible: 152, warnings: 4 },
      lastScan: '2025-01-11 11:30'
    }
  ];

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center pulse-glow">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold neon-glow">مركز البرامج والتعريفات</h1>
                <p className="text-muted-foreground">إدارة وتحديث التعريفات والبرامج بذكاء</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-500">16</div>
                <div className="text-sm text-muted-foreground">تحديثات متاحة</div>
              </div>
              <Button 
                onClick={startScan}
                disabled={isScanning}
                className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-8 py-3"
              >
                {isScanning ? 'جاري الفحص...' : 'فحص التحديثات'}
              </Button>
            </div>
          </div>

          {isScanning && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">جاري فحص التعريفات والبرامج...</span>
                <span className="text-sm text-muted-foreground">{scanProgress}%</span>
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
                  <Download className="w-5 h-5 text-primary" />
                  <span>تحديثات التعريفات</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {driverUpdates.map((driver, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{driver.name}</h4>
                          <Badge variant={driver.priority === 'مهم' ? 'destructive' : driver.priority === 'عادي' ? 'secondary' : 'outline'}>
                            {driver.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{driver.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>الحالي: {driver.currentVersion}</span>
                          <span>الجديد: {driver.latestVersion}</span>
                          <span>الحجم: {driver.size}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {driver.status === 'محدث' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Button size="sm" className="glass-button">
                            تحديث
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  <span>تحديثات البرامج</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {softwareUpdates.map((software, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{software.name}</h4>
                          <Badge variant={software.priority === 'أمني' ? 'destructive' : 'secondary'}>
                            {software.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {software.vulnerability ? `تحديث أمني: ${software.vulnerability}` : software.features}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>الحالي: {software.currentVersion}</span>
                          <span>الجديد: {software.latestVersion}</span>
                          <span>الحجم: {software.size}</span>
                        </div>
                      </div>
                      <Button size="sm" className="glass-button">
                        تحديث
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>إحصائيات النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>التعريفات المثبتة:</span>
                    <span className="font-mono">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>البرامج المثبتة:</span>
                    <span className="font-mono">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تحديثات مهمة:</span>
                    <span className="font-bold text-orange-500">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تحديثات أمنية:</span>
                    <span className="font-bold text-red-500">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>آخر فحص:</span>
                    <span className="font-mono text-xs">14:30 اليوم</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="glass-card hover:glass-button transition-all duration-300 group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-600 flex items-center justify-center group-hover:pulse-glow`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {service.lastScan}
                    </span>
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
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(service.stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key}:</span>
                          <span className="font-mono">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full glass-button rounded-lg hover:neon-border">
                    تشغيل الخدمة
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

export default DriverSoftwareHub;

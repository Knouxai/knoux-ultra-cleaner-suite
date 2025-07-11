
import React, { useState } from 'react';
import { Search, BarChart3, Activity, FileText, HardDrive, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DeepAnalysisLogs = () => {
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const diskAnalysis = [
    {
      drive: 'C:',
      total: '1 TB',
      used: '456 GB',
      free: '544 GB',
      percentage: 45.6,
      health: 'جيد',
      type: 'SSD NVMe',
      temperature: '42°C'
    },
    {
      drive: 'D:',
      total: '2 TB', 
      used: '1.2 TB',
      free: '800 GB',
      percentage: 60,
      health: 'ممتاز',
      type: 'HDD SATA',
      temperature: '38°C'
    }
  ];

  const performanceMetrics = [
    { name: 'استخدام المعالج', current: 24, avg: 18, peak: 89, unit: '%' },
    { name: 'استخدام الذاكرة', current: 68, avg: 45, peak: 92, unit: '%' },
    { name: 'استخدام القرص', current: 12, avg: 8, peak: 78, unit: '%' },
    { name: 'استخدام الشبكة', current: 35, avg: 22, peak: 98, unit: '%' },
    { name: 'درجة الحرارة', current: 67, avg: 62, peak: 84, unit: '°C' },
    { name: 'سرعة المراوح', current: 1250, avg: 980, peak: 2100, unit: 'RPM' }
  ];

  const systemLogs = [
    {
      time: '2025-01-11 14:32:15',
      level: 'معلومات',
      source: 'Windows Update',
      message: 'تم تثبيت التحديث KB5034441 بنجاح',
      category: 'نظام'
    },
    {
      time: '2025-01-11 14:28:03',
      level: 'تحذير',
      source: 'Disk Manager',
      message: 'مساحة القرص C: أقل من 20%',
      category: 'تخزين'
    },
    {
      time: '2025-01-11 14:25:45',
      level: 'خطأ',
      source: 'Application Error',
      message: 'فشل تشغيل التطبيق chrome.exe - خطأ في الذاكرة',
      category: 'تطبيق'
    },
    {
      time: '2025-01-11 14:20:12',
      level: 'معلومات',
      source: 'User Login',
      message: 'تم تسجيل دخول المستخدم بنجاح',
      category: 'أمان'
    },
    {
      time: '2025-01-11 14:15:33',
      level: 'تحذير',
      source: 'Hardware Monitor',
      message: 'درجة حرارة المعالج تجاوزت 80°C',
      category: 'أجهزة'
    }
  ];

  const duplicateFiles = [
    {
      name: 'Document.pdf',
      size: '2.3 MB',
      copies: 5,
      locations: ['Desktop', 'Downloads', 'Documents', 'Backup', 'OneDrive'],
      totalWaste: '11.5 MB'
    },
    {
      name: 'Photo.jpg',
      size: '4.8 MB', 
      copies: 3,
      locations: ['Pictures', 'Desktop', 'Camera Roll'],
      totalWaste: '14.4 MB'
    },
    {
      name: 'Video.mp4',
      size: '156 MB',
      copies: 2,
      locations: ['Videos', 'Downloads'],
      totalWaste: '156 MB'
    }
  ];

  const services = [
    {
      name: 'تحليل القرص',
      description: 'فحص مفصل لاستخدام المساحة وصحة الأقراص',
      icon: HardDrive,
      stats: { scanned: '2 TB', issues: 3, health: '92%' },
      lastScan: '2025-01-11 14:30',
      status: 'مكتمل'
    },
    {
      name: 'رسومات بيانية للأداء',
      description: 'عرض بياني لأداء النظام عبر الزمن',
      icon: BarChart3,
      stats: { metrics: 156, charts: 12, period: '30 يوم' },
      lastScan: 'الآن',
      status: 'نشط'
    },
    {
      name: 'عرض السجلات الزمنية',
      description: 'تحليل وعرض سجلات النظام والأحداث',
      icon: FileText,
      stats: { logs: 2847, errors: 12, warnings: 45 },
      lastScan: 'الآن',
      status: 'مراقب'
    },
    {
      name: 'تتبع تغييرات البرامج',
      description: 'مراقبة تثبيت وحذف وتحديث البرامج',
      icon: Activity,
      stats: { tracked: 89, changes: 15, alerts: 3 },
      lastScan: '2025-01-11 13:45',
      status: 'نشط'
    },
    {
      name: 'تحليل التطبيقات النشطة',
      description: 'مراقبة أداء واستهلاك التطبيقات الجارية',
      icon: TrendingUp,
      stats: { processes: 156, monitored: 45, optimized: 12 },
      lastScan: 'الآن',
      status: 'مراقب'
    },
    {
      name: 'كشف الملفات المكررة',
      description: 'العثور على الملفات المكررة لتوفير المساحة',
      icon: Search,
      stats: { scanned: '456 GB', duplicates: 234, saved: '2.1 GB' },
      lastScan: '2025-01-11 12:15',
      status: 'مكتمل'
    },
    {
      name: 'سجل النظام الذكي',
      description: 'تحليل ذكي للسجلات باستخدام الذكاء الاصطناعي',
      icon: AlertCircle,
      stats: { analyzed: 15678, patterns: 23, predictions: 8 },
      lastScan: '2025-01-11 14:00',
      status: 'تحليل'
    }
  ];

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center pulse-glow">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold neon-glow">التحليل العميق والسجلات</h1>
                <p className="text-muted-foreground">تحليل شامل للنظام وسجلات مفصلة للأداء</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-teal-500">2.1 TB</div>
                <div className="text-sm text-muted-foreground">تم تحليلها</div>
              </div>
              <Button 
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-8 py-3"
              >
                {isAnalyzing ? 'جاري التحليل...' : 'تحليل شامل'}
              </Button>
            </div>
          </div>

          {isAnalyzing && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">جاري تحليل النظام والسجلات...</span>
                <span className="text-sm text-muted-foreground">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-3 bg-muted/20" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HardDrive className="w-5 h-5 text-primary" />
                  <span>تحليل الأقراص</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {diskAnalysis.map((disk, idx) => (
                    <div key={idx} className="p-4 rounded-lg border bg-muted/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-lg">{disk.drive}</h4>
                          <Badge variant="outline">{disk.type}</Badge>
                          <Badge variant={disk.health === 'ممتاز' ? 'default' : 'secondary'}>
                            {disk.health}
                          </Badge>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          {disk.temperature}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>المستخدم: {disk.used} من {disk.total}</span>
                          <span>{disk.percentage}%</span>
                        </div>
                        <Progress value={disk.percentage} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">الإجمالي</span>
                          <div className="font-mono">{disk.total}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">المستخدم</span>
                          <div className="font-mono">{disk.used}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">المتاح</span>
                          <div className="font-mono">{disk.free}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>سجلات النظام</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg border-r-4 bg-muted/20" 
                         style={{
                           borderRightColor: log.level === 'خطأ' ? '#ef4444' : 
                                           log.level === 'تحذير' ? '#f59e0b' : '#10b981'
                         }}>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant={
                            log.level === 'خطأ' ? 'destructive' : 
                            log.level === 'تحذير' ? 'secondary' : 'outline'
                          }>
                            {log.level}
                          </Badge>
                          <Badge variant="outline">{log.category}</Badge>
                        </div>
                        <p className="text-sm font-medium mb-1">{log.message}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{log.time}</span>
                          <span>المصدر: {log.source}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>مقاييس الأداء</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{metric.name}</span>
                        <span className="font-mono">{metric.current}{metric.unit}</span>
                      </div>
                      <Progress value={metric.current} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>متوسط: {metric.avg}{metric.unit}</span>
                        <span>أقصى: {metric.peak}{metric.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-primary" />
                  <span>الملفات المكررة</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {duplicateFiles.map((file, idx) => (
                    <div key={idx} className="p-3 rounded-lg border bg-muted/20">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{file.name}</span>
                        <Badge variant="secondary">{file.copies} نسخ</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        المساحة المهدرة: {file.totalWaste}
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground">المواقع: </span>
                        {file.locations.slice(0, 2).join(', ')}
                        {file.locations.length > 2 && ` +${file.locations.length - 2}`}
                      </div>
                    </div>
                  ))}
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
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center group-hover:pulse-glow`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <Badge variant={service.status === 'نشط' || service.status === 'مراقب' ? 'default' : 'secondary'}>
                      {service.status}
                    </Badge>
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
                  
                  <div className="text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 inline mr-1" />
                    آخر تحديث: {service.lastScan}
                  </div>
                  
                  <Button className="w-full glass-button rounded-lg hover:neon-border">
                    عرض التفاصيل
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

export default DeepAnalysisLogs;


import React, { useState } from 'react';
import { FlaskConical, Trash2, Power, FolderX, FileText, Settings, Download, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const AdvancedToolsLab = () => {
  const [operationProgress, setOperationProgress] = useState(0);
  const [isOperating, setIsOperating] = useState(false);
  const [oneClickMode, setOneClickMode] = useState(true);

  const stubbornPrograms = [
    {
      name: 'Adobe Creative Suite CS6',
      size: '2.3 GB',
      status: 'متجذر',
      difficulty: 'صعب',
      registryEntries: 1247,
      leftoverFiles: 456,
      services: 8
    },
    {
      name: 'Norton Antivirus',
      size: '890 MB', 
      status: 'محمي',
      difficulty: 'صعب جداً',
      registryEntries: 2156,
      leftoverFiles: 234,
      services: 12
    },
    {
      name: 'Microsoft Office 2019',
      size: '1.8 GB',
      status: 'جزئي',
      difficulty: 'متوسط',
      registryEntries: 567,
      leftoverFiles: 123,
      services: 4
    }
  ];

  const bootAnalysis = [
    {
      name: 'Windows Boot Manager',
      status: 'سليم',
      loadTime: '2.3s',
      priority: 'حرج',
      issues: 0
    },
    {
      name: 'Steam Client Service',
      status: 'بطيء',
      loadTime: '8.7s', 
      priority: 'منخفض',
      issues: 1
    },
    {
      name: 'Adobe Update Service',
      status: 'غير ضروري',
      loadTime: '12.4s',
      priority: 'غير مهم',
      issues: 2
    },
    {
      name: 'Spotify Web Helper',
      status: 'معطل',
      loadTime: '0s',
      priority: 'منخفض',
      issues: 0
    }
  ];

  const oneDriveComponents = [
    { name: 'OneDrive Client', path: 'C:\\Users\\User\\AppData\\Local\\Microsoft\\OneDrive', size: '234 MB', type: 'تطبيق' },
    { name: 'OneDrive Registry Keys', path: 'HKEY_CURRENT_USER\\Software\\Microsoft\\OneDrive', size: '12 KB', type: 'سجل' },
    { name: 'OneDrive System Integration', path: 'C:\\Windows\\System32\\OneDriveSetup.exe', size: '45 MB', type: 'نظام' },
    { name: 'OneDrive Shell Extensions', path: 'Multiple Registry Locations', size: '8 MB', type: 'امتداد' },
    { name: 'OneDrive Sync Engine', path: 'C:\\Program Files\\Microsoft OneDrive', size: '156 MB', type: 'خدمة' }
  ];

  const systemFiles = [
    { name: 'System Registry', entries: 45678, size: '256 MB', health: 'جيد' },
    { name: 'Windows Services', services: 156, running: 67, health: 'ممتاز' },
    { name: 'Startup Programs', programs: 23, enabled: 12, health: 'متوسط' },
    { name: 'System Drivers', drivers: 89, loaded: 78, health: 'جيد' },
    { name: 'Environment Variables', variables: 45, system: 23, health: 'جيد' }
  ];

  const services = [
    {
      name: 'إزالة البرامج بالقوة',
      description: 'حذف البرامج المستعصية والمتجذرة في النظام',
      icon: Trash2,
      stats: { removed: 12, stubborn: 3, cleaned: '2.8 GB' },
      lastRun: '2025-01-11 13:30',
      status: 'جاهز',
      risk: 'متوسط'
    },
    {
      name: 'فاحص الإقلاع',
      description: 'تحليل وتحسين عملية إقلاع النظام',
      icon: Power,
      stats: { analyzed: 45, optimized: 12, saved: '18.3s' },
      lastRun: '2025-01-11 11:15',
      status: 'مكتمل',
      risk: 'منخفض'
    },
    {
      name: 'حذف OneDrive كلياً',
      description: 'إزالة تامة لجميع مكونات OneDrive من النظام',
      icon: FolderX,
      stats: { components: 23, removed: 18, size: '445 MB' },
      lastRun: '2025-01-10 16:45',
      status: 'جاهز',
      risk: 'عالي'
    },
    {
      name: 'متصفح ملفات النظام',
      description: 'استكشاف ملفات النظام المخفية والمحمية',
      icon: FileText,
      stats: { scanned: 15678, hidden: 234, protected: 45 },
      lastRun: 'الآن',
      status: 'نشط',
      risk: 'عالي'
    },
    {
      name: 'مدير مهام مخصص',
      description: 'أداة متقدمة لإدارة العمليات والخدمات',
      icon: Settings,
      stats: { processes: 156, managed: 67, terminated: 12 },
      lastRun: 'الآن',
      status: 'نشط',
      risk: 'متوسط'
    },
    {
      name: 'تقارير أداء قابلة للتصدير',
      description: 'إنشاء تقارير مفصلة عن حالة النظام',
      icon: Download,
      stats: { reports: 45, exported: 23, formats: 'PDF,CSV,JSON' },
      lastRun: '2025-01-11 14:00',
      status: 'جاهز',
      risk: 'آمن'
    },
    {
      name: 'صيانة بنقرة واحدة',
      description: 'تشغيل جميع أدوات الصيانة تلقائياً',
      icon: FlaskConical,
      stats: { tasks: 15, completed: 12, failed: 1 },
      lastRun: '2025-01-11 08:00',
      status: 'مجدول',
      risk: 'متوسط'
    }
  ];

  const startOperation = () => {
    setIsOperating(true);
    setOperationProgress(0);
    
    const interval = setInterval(() => {
      setOperationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOperating(false);
          return 100;
        }
        return prev + 4;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center pulse-glow">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold neon-glow">مختبر الأدوات المتقدمة</h1>
                <p className="text-muted-foreground">أدوات احترافية للتحكم العميق في النظام</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm">الصيانة بنقرة واحدة</span>
                <Switch 
                  checked={oneClickMode}
                  onCheckedChange={setOneClickMode}
                />
              </div>
              <Button 
                onClick={startOperation}
                disabled={isOperating}
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-8 py-3"
              >
                {isOperating ? 'جاري التشغيل...' : 'تشغيل الأدوات'}
              </Button>
            </div>
          </div>

          {isOperating && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">جاري تشغيل الأدوات المتقدمة...</span>
                <span className="text-sm text-muted-foreground">{operationProgress}%</span>
              </div>
              <Progress value={operationProgress} className="h-3 bg-muted/20" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg border bg-muted/20">
              <div className="text-2xl font-bold text-violet-500">23</div>
              <div className="text-sm text-muted-foreground">أدوات متاحة</div>
            </div>
            <div className="text-center p-4 rounded-lg border bg-muted/20">
              <div className="text-2xl font-bold text-green-500">156</div>
              <div className="text-sm text-muted-foreground">عمليات نجحت</div>
            </div>
            <div className="text-center p-4 rounded-lg border bg-muted/20">
              <div className="text-2xl font-bold text-red-500">3</div>
              <div className="text-sm text-muted-foreground">تحذيرات نشطة</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trash2 className="w-5 h-5 text-destructive" />
                  <span>البرامج المستعصية</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stubbornPrograms.map((program, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{program.name}</h4>
                          <Badge variant={program.difficulty === 'صعب جداً' ? 'destructive' : 'secondary'}>
                            {program.difficulty}
                          </Badge>
                          <Badge variant="outline">{program.status}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                          <span>الحجم: {program.size}</span>
                          <span>السجل: {program.registryEntries}</span>
                          <span>الملفات: {program.leftoverFiles}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="destructive">
                          إزالة قسرية
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
                  <Power className="w-5 h-5 text-primary" />
                  <span>تحليل الإقلاع</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bootAnalysis.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{item.name}</h4>
                          <Badge variant={
                            item.status === 'سليم' ? 'default' :
                            item.status === 'بطيء' ? 'secondary' :
                            item.status === 'غير ضروري' ? 'destructive' : 'outline'
                          }>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>وقت التحميل: {item.loadTime}</span>
                          <span>الأولوية: {item.priority}</span>
                          <span>المشاكل: {item.issues}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.status !== 'معطل' && (
                          <Button size="sm" variant="outline">
                            تحسين
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
                  <FolderX className="w-5 h-5 text-destructive" />
                  <span>مكونات OneDrive</span>
                  <Badge variant="destructive" className="text-xs">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    خطر عالي
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {oneDriveComponents.map((component, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h5 className="font-medium text-sm">{component.name}</h5>
                          <Badge variant="outline" className="text-xs">{component.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono mb-1">{component.path}</p>
                        <p className="text-xs text-muted-foreground">الحجم: {component.size}</p>
                      </div>
                      <Button size="sm" variant="destructive" className="text-xs">
                        حذف
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-destructive mb-1">تحذير مهم!</p>
                      <p className="text-muted-foreground text-xs">
                        حذف OneDrive كلياً سيؤثر على المزامنة مع حساب Microsoft وقد يؤدي لفقدان البيانات غير المحفوظة محلياً.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>ملفات النظام</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemFiles.map((file, idx) => (
                    <div key={idx} className="p-3 rounded-lg border bg-muted/20">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium text-sm">{file.name}</h5>
                        <Badge variant={file.health === 'ممتاز' ? 'default' : file.health === 'جيد' ? 'secondary' : 'outline'}>
                          {file.health}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        {file.entries && <div>الإدخالات: {file.entries}</div>}
                        {file.services && <div>الخدمات: {file.services} (نشط: {file.running})</div>}
                        {file.programs && <div>البرامج: {file.programs} (مفعل: {file.enabled})</div>}
                        {file.drivers && <div>التعريفات: {file.drivers} (محمل: {file.loaded})</div>}
                        {file.variables && <div>المتغيرات: {file.variables} (نظام: {file.system})</div>}
                        {file.size && <div>الحجم: {file.size}</div>}
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
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center group-hover:pulse-glow`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <Badge variant={service.status === 'نشط' ? 'default' : 'secondary'} className="mb-1">
                      {service.status}
                    </Badge>
                    <div>
                      <Badge variant={
                        service.risk === 'عالي' ? 'destructive' :
                        service.risk === 'متوسط' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {service.risk}
                      </Badge>
                    </div>
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
                    آخر تشغيل: {service.lastRun}
                  </div>
                  
                  <Button 
                    className={`w-full glass-button rounded-lg hover:neon-border ${
                      service.risk === 'عالي' ? 'bg-destructive/20 hover:bg-destructive/30' : ''
                    }`}
                  >
                    {service.risk === 'عالي' ? 'تشغيل بحذر' : 'تشغيل الأداة'}
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

export default AdvancedToolsLab;

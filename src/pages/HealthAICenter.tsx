
import React, { useState, useEffect } from 'react';
import { Heart, Activity, Cpu, MemoryStick, HardDrive, Battery, Thermometer, TrendingUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const HealthAICenter = () => {
  const [systemHealth, setSystemHealth] = useState({
    overallScore: 78,
    cpuHealth: 85,
    ramHealth: 72,
    diskHealth: 68,
    thermalHealth: 91,
    batteryHealth: 84,
    networkHealth: 76
  });

  const [predictions, setPredictions] = useState([
    { type: 'warning', message: 'تتوقع خوارزمية AI انخفاض أداء القرص الصلب خلال 15 يوم', severity: 'medium' },
    { type: 'info', message: 'موصى بتنظيف ملفات مؤقتة - توفير 2.3 GB متوقع', severity: 'low' },
    { type: 'critical', message: 'درجة حرارة المعالج مرتفعة - يحتاج تنظيف المراوح', severity: 'high' }
  ]);

  const [realTimeData, setRealTimeData] = useState({
    cpuTemp: 67,
    cpuUsage: 24,
    ramUsage: 68,
    diskUsage: 45,
    networkSpeed: 125.6,
    uptime: '2 أيام، 14 ساعة'
  });

  const services = [
    {
      name: 'تحليل صحة النظام AI',
      status: 'نشط',
      lastScan: '2025-01-11 14:30',
      issues: 3,
      description: 'فحص شامل للنظام باستخدام خوارزميات التعلم الآلي'
    },
    {
      name: 'التنبؤ بالأعطال المستقبلية',
      status: 'مراقب',
      lastScan: '2025-01-11 12:15',
      issues: 1,
      description: 'نظام إنذار مبكر يتنبأ بالمشاكل قبل حدوثها'
    },
    {
      name: 'مراقبة الموارد الحيوية',
      status: 'نشط',
      lastScan: 'الآن',
      issues: 0,
      description: 'مراقبة مستمرة للمعالج والذاكرة والقرص'
    },
    {
      name: 'توصيات الصيانة الذكية',
      status: 'جاهز',
      lastScan: '2025-01-11 10:00',
      issues: 2,
      description: 'اقتراحات مخصصة لتحسين أداء النظام'
    },
    {
      name: 'فحص صحة البطارية',
      status: 'نشط',
      lastScan: '2025-01-11 13:45',
      issues: 0,
      description: 'تحليل دورة شحن البطارية وتوقع عمرها الافتراضي'
    },
    {
      name: 'الحالة البيئية',
      status: 'مراقب',
      lastScan: 'الآن',
      issues: 1,
      description: 'مراقبة درجة الحرارة والرطوبة وتأثيرها على الأداء'
    },
    {
      name: 'سجل تحليلي زمني',
      status: 'نشط',
      lastScan: 'الآن',
      issues: 0,
      description: 'تسجيل وتحليل أنماط الاستخدام والأداء عبر الزمن'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center pulse-glow">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold neon-glow">مركز الصحة الذكي</h1>
              <p className="text-muted-foreground">نظام مراقبة وتحليل صحة النظام بالذكاء الاصطناعي</p>
            </div>
            <div className="ml-auto">
              <div className="text-right">
                <div className="text-3xl font-bold neon-glow">{systemHealth.overallScore}%</div>
                <div className="text-sm text-muted-foreground">الحالة العامة</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">المعالج</p>
                    <p className="text-xl font-bold">{realTimeData.cpuUsage}%</p>
                    <p className="text-xs text-muted-foreground">{realTimeData.cpuTemp}°C</p>
                  </div>
                  <Cpu className="w-8 h-8 text-blue-500" />
                </div>
                <Progress value={realTimeData.cpuUsage} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">الذاكرة</p>
                    <p className="text-xl font-bold">{realTimeData.ramUsage}%</p>
                    <p className="text-xs text-muted-foreground">12.8 / 16 GB</p>
                  </div>
                  <MemoryStick className="w-8 h-8 text-green-500" />
                </div>
                <Progress value={realTimeData.ramUsage} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">القرص</p>
                    <p className="text-xl font-bold">{realTimeData.diskUsage}%</p>
                    <p className="text-xs text-muted-foreground">450 / 1000 GB</p>
                  </div>
                  <HardDrive className="w-8 h-8 text-orange-500" />
                </div>
                <Progress value={realTimeData.diskUsage} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">الشبكة</p>
                    <p className="text-xl font-bold">{realTimeData.networkSpeed} Mbps</p>
                    <p className="text-xs text-muted-foreground">Download</p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>التنبؤات الذكية</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictions.map((prediction, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                      prediction.severity === 'high' ? 'border-red-500 bg-red-500/10' :
                      prediction.severity === 'medium' ? 'border-yellow-500 bg-yellow-500/10' :
                      'border-blue-500 bg-blue-500/10'
                    }`}>
                      <div className="flex items-start space-x-3">
                        {prediction.severity === 'high' ? 
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5" /> :
                          prediction.severity === 'medium' ?
                          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" /> :
                          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                        }
                        <p className="text-sm">{prediction.message}</p>
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
                <CardTitle>معلومات النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>وقت التشغيل:</span>
                    <span className="font-mono">{realTimeData.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>نظام التشغيل:</span>
                    <span>Windows 11 Pro</span>
                  </div>
                  <div className="flex justify-between">
                    <span>المعالج:</span>
                    <span>Intel i7-12700K</span>
                  </div>
                  <div className="flex justify-between">
                    <span>كرت الرسوميات:</span>
                    <span>RTX 4070</span>
                  </div>
                  <div className="flex justify-between">
                    <span>اللوحة الأم:</span>
                    <span>ASUS ROG STRIX</span>
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
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'نشط' ? 'bg-green-500' :
                    service.status === 'مراقب' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  } pulse-glow`}></div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">
                      {service.issues} مشاكل
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
                  <div className="flex justify-between text-sm">
                    <span>الحالة:</span>
                    <span className="font-medium">{service.status}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>آخر فحص:</span>
                    <span className="font-mono text-xs">{service.lastScan}</span>
                  </div>
                  <Button className="w-full glass-button rounded-lg hover:neon-border">
                    تشغيل الفحص
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

export default HealthAICenter;

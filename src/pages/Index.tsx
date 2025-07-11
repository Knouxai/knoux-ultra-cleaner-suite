
import React, { useState } from 'react';
import { Heart, Zap, Wrench, Shield, Search, FlaskConical, Brain } from 'lucide-react';
import KnouxHeader from '@/components/KnouxHeader';
import SectionCard from '@/components/SectionCard';
import SystemStatus from '@/components/SystemStatus';
import BlackDiamondModal from '@/components/BlackDiamondModal';

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showBlackDiamond, setShowBlackDiamond] = useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const sections = [
    {
      title: 'Health AI Center',
      description: 'مركز الصحة الذكي',
      icon: Heart,
      color: 'bg-gradient-to-r from-blue-500 to-purple-600',
      services: [
        'تحليل صحة النظام AI',
        'التنبؤ بالأعطال المستقبلية',
        'مراقبة الموارد الحيوية',
        'توصيات الصيانة الذكية',
        'فحص صحة البطارية',
        'الحالة البيئية',
        'سجل تحليلي زمني'
      ]
    },
    {
      title: 'Hyper Clean Engine',
      description: 'محرك التنظيف الفائق',
      icon: Zap,
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
      services: [
        'تنظيف الملفات المؤقتة',
        'إزالة مخلفات التحديثات',
        'تنظيف المتصفحات',
        'تحليل الملفات غير المستخدمة',
        'تنظيف آثار البرامج القديمة',
        'تفريغ الحافظة',
        'التنظيف التلقائي الزمني'
      ]
    },
    {
      title: 'Performance Reactor',
      description: 'مفاعل الأداء',
      icon: Zap,
      color: 'bg-gradient-to-r from-red-500 to-pink-600',
      services: [
        'إدارة العمليات الثقيلة',
        'تسريع الإقلاع',
        'إدارة الخدمات غير الهامة',
        'ضغط العمليات غير النشطة',
        'تحسين PageFile',
        'تحرير RAM آنياً',
        'وضع Turbo Mode'
      ]
    },
    {
      title: 'Driver & Software Hub',
      description: 'مركز البرامج والتعريفات',
      icon: Wrench,
      color: 'bg-gradient-to-r from-orange-500 to-yellow-600',
      services: [
        'تحديث الدرايفرات',
        'تحليل التوافق',
        'نسخ احتياطي للتعريفات',
        'إزالة الدرايفرات القديمة',
        'تحديث البرامج',
        'كشف البرامج المعطوبة',
        'تحليل التوافق مع النظام'
      ]
    },
    {
      title: 'Security Vault',
      description: 'خزنة الأمان',
      icon: Shield,
      color: 'bg-gradient-to-r from-indigo-500 to-purple-600',
      services: [
        'إزالة ملفات التجسس',
        'فحص البرمجيات الخفية',
        'إدارة صلاحيات التطبيقات',
        'سجل التعديلات السيئة',
        'حماية الخصوصية',
        'حذف غير قابل للاسترجاع',
        'قفل أدوات النظام'
      ]
    },
    {
      title: 'Deep Analysis & Logs',
      description: 'التحليل العميق',
      icon: Search,
      color: 'bg-gradient-to-r from-teal-500 to-cyan-600',
      services: [
        'تحليل القرص',
        'رسومات بيانية للأداء',
        'عرض السجلات الزمنية',
        'تتبع تغييرات البرامج',
        'تحليل التطبيقات النشطة',
        'كشف الملفات المكررة',
        'AI System Log'
      ]
    },
    {
      title: 'Advanced Tools Lab',
      description: 'مختبر الأدوات',
      icon: FlaskConical,
      color: 'bg-gradient-to-r from-violet-500 to-purple-600',
      services: [
        'إزالة البرامج بالقوة',
        'فاحص الإقلاع',
        'حذف OneDrive كلياً',
        'متصفح ملفات النظام',
        'مدير مهام مخصص',
        'تقارير أداء قابلة للتصدير',
        'صيانة بنقرة واحدة'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-7xl mx-auto">
        <KnouxHeader
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode(!darkMode)}
          onBlackDiamondAccess={() => setShowBlackDiamond(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sections.map((section, index) => (
                <SectionCard
                  key={index}
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  services={section.services}
                  color={section.color}
                  onClick={() => console.log(`Opening ${section.title}`)}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <SystemStatus />
            
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <Brain className="w-5 h-5 text-primary" />
                <span>نصائح ذكية</span>
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    ينصح بتنظيف الملفات المؤقتة كل أسبوع
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    استخدم وضع Turbo Mode عند الحاجة فقط
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">
                    اعمل نسخة احتياطية قبل حذف الملفات
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center glass-card p-6 rounded-2xl">
          <h2 className="text-2xl font-bold neon-glow mb-2">
            "كنوكس نظفلك الدنيا يا ولدلي البهيم 😎🧼"
          </h2>
          <p className="text-muted-foreground">
            أول نظام ذكاء تنظيفي متكامل في الشرق الأوسط
          </p>
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

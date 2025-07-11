
import React, { useState } from 'react';
import { X, Lock, Shield, Skull, Zap, Eye, Trash2, Cpu, HardDrive, RotateCcw, FileX, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BlackDiamondModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BlackDiamondModal: React.FC<BlackDiamondModalProps> = ({ isOpen, onClose }) => {
  const [accessCode, setAccessCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

  const secretServices = [
    { 
      name: 'AI DeadZone Cleaner', 
      desc: 'منظف الذكاء الخارق للملفات العميقة التي لا تصلها أدوات التنظيف التقليدية', 
      icon: Skull,
      status: 'خطير',
      features: ['تحليل HEX مباشر', 'كشف الملفات المخفية', 'تنظيف عميق للسجلات']
    },
    { 
      name: 'RAM Crystalizer™', 
      desc: 'تجميد وضغط العمليات الخاملة لتحرير الذاكرة بشكل خارق', 
      icon: Zap,
      status: 'نشط',
      features: ['ضغط العمليات الخاملة', 'تحرير 90% من RAM', 'عدم فقدان البيانات']
    },
    { 
      name: 'Shadow Process Sniper', 
      desc: 'صياد العمليات الشبحية المخفية في النظام', 
      icon: Eye,
      status: 'مراقب',
      features: ['كشف svchost المخفية', 'تتبع العمليات الشبحية', 'حذف آمن للعمليات']
    },
    { 
      name: 'System Cloaker', 
      desc: 'إخفاء الجهاز عن الشبكة مؤقتاً بدون قطع الاتصال', 
      icon: Shield,
      status: 'جاهز',
      features: ['إخفاء NetStack', 'حماية من التجسس', 'وضع التخفي الذكي']
    },
    { 
      name: 'Windows Firewall Bender', 
      desc: 'إعادة تشكيل الحماية الذكية للفايروول', 
      icon: Shield,
      status: 'محسن',
      features: ['فايروول ذكي', 'حماية تلقائية', 'قواعد متقدمة']
    },
    { 
      name: 'Ghost App Remover', 
      desc: 'حذف التطبيقات المخفية التي لا تظهر في قائمة البرامج', 
      icon: FileX,
      status: 'قوي',
      features: ['تحليل MSI', 'تنظيف Registry', 'حذف البقايا المخفية']
    },
    { 
      name: 'Time Capsule Restore', 
      desc: 'استعادة النظام الخارقة حتى لو فشل الوضع الآمن', 
      icon: RotateCcw,
      status: 'حرج',
      features: ['استعادة فورية', 'عمل بدون Safe Mode', 'حفظ البيانات']
    },
    { 
      name: 'Quantum RAM Optimizer', 
      desc: 'تحسين كمي للذاكرة باستخدام خوارزميات متقدمة', 
      icon: Activity,
      status: 'تجريبي',
      features: ['تحسين كمي', 'ذكاء صناعي متقدم', 'أداء خارق']
    },
    { 
      name: 'Deep Registry Surgeon', 
      desc: 'جراح السجلات العميق لإصلاح أخطاء النظام المستعصية', 
      icon: HardDrive,
      status: 'طبي',
      features: ['جراحة دقيقة للسجلات', 'إصلاح الأخطاء المستعصية', 'نسخ احتياطي تلقائي']
    }
  ];

  const handleUnlock = () => {
    if (accessCode === 'knoux-ultra@2025💀🔥' || accessCode === 'knoux-ultra@2025') {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('أنت مش قد هذا القسم يا نجم 😈 كود خاطئ!');
      setTimeout(() => setError(''), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/95 backdrop-blur-xl border border-purple-500/50 rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center border-2 border-purple-500/50 pulse-glow">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                Knoux BlackDiamond™
              </h2>
              <p className="text-purple-300/80">الماس الأسود - القسم السري المتقدم</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-purple-400 hover:bg-purple-500/20 hover:text-white"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {!isUnlocked ? (
          <div className="text-center space-y-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center border-4 border-purple-500/50 pulse-glow">
              <Lock className="w-16 h-16 text-purple-400" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                🔒 منطقة محظورة - وصول مقيد
              </h3>
              <p className="text-purple-300/70 mb-2 text-lg">
                هذا القسم يحتوي على أدوات خطيرة جداً
              </p>
              <p className="text-red-400 text-sm mb-8">
                ⚠️ مخصص للخبراء والمحترفين فقط - استخدم على مسؤوليتك الشخصية
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="relative">
                <Input
                  type="password"
                  placeholder="أدخل كود الوصول السري..."
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="bg-purple-900/20 border-2 border-purple-500/50 text-purple-100 placeholder:text-purple-300/50 h-12 text-center text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 -z-10 blur-sm"></div>
              </div>
              
              {error && (
                <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50">
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}
              
              <Button
                onClick={handleUnlock}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-12 text-lg font-bold"
              >
                🔓 فتح القفل الماسي
              </Button>

              <div className="text-xs text-purple-400/60 mt-4">
                <p>💡 تلميح: الكود يحتوي على سنة 2025 و رمز خاص</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text mb-4">
                🔓 مرحباً في عالم الماس الأسود
              </h3>
              <p className="text-purple-300/80 text-lg">
                تم فتح الأدوات الخارقة - استخدمها بحذر شديد ⚡
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secretServices.map((service, index) => (
                <Card key={index} className="bg-gradient-to-br from-purple-900/30 to-black/50 border-2 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:pulse-glow">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          service.status === 'خطير' ? 'bg-red-500/20 text-red-300' :
                          service.status === 'نشط' ? 'bg-green-500/20 text-green-300' :
                          service.status === 'مراقب' ? 'bg-yellow-500/20 text-yellow-300' :
                          service.status === 'تجريبي' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-purple-500/20 text-purple-300'
                        }`}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-bold text-purple-300 group-hover:text-white transition-colors">
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-purple-200/70 mb-4">{service.desc}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-xs font-medium text-purple-300">المميزات:</div>
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="text-xs text-purple-200/60 flex items-center space-x-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-600 hover:to-pink-600 text-white text-sm font-bold border border-purple-500/30">
                      🚀 تفعيل الأداة
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Skull className="w-5 h-5 text-red-400" />
                </div>
                <h4 className="text-lg font-bold text-red-400">⚠️ تحذير هام</h4>
              </div>
              <p className="text-red-300/80 text-sm">
                هذه الأدوات قوية جداً وقد تؤثر على استقرار النظام. تأكد من عمل نسخة احتياطية قبل الاستخدام. 
                مطور Knoux غير مسؤول عن أي أضرار قد تنتج عن سوء الاستخدام.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlackDiamondModal;

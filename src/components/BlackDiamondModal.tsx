
import React, { useState } from 'react';
import { X, Lock, Shield, Skull, Zap } from 'lucide-react';
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
    { name: 'AI DeadZone Cleaner', desc: 'منظف الذكاء الخارق للملفات العميقة', icon: Skull },
    { name: 'RAM Crystalizer™', desc: 'تجميد وتحسين الذاكرة المتقدم', icon: Zap },
    { name: 'Shadow Process Sniper', desc: 'صياد العمليات الشبحية', icon: Shield },
    { name: 'System Cloaker', desc: 'إخفاء النظام من الشبكة', icon: Lock },
    { name: 'Windows Firewall Bender', desc: 'إعادة تشكيل الحماية الذكية', icon: Shield },
    { name: 'Ghost App Remover', desc: 'حذف التطبيقات المخفية', icon: Skull },
    { name: 'Time Capsule Restore', desc: 'استعادة النظام الخارقة', icon: Zap },
  ];

  const handleUnlock = () => {
    if (accessCode === 'knoux-ultra@2025💀🔥' || accessCode === 'knoux-ultra@2025') {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('أنت مش قد هذا القسم يا نجم 😈');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-black/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/50">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-purple-400">Knoux BlackDiamond™</h2>
              <p className="text-purple-300/70">الماس الأسود - القسم السري</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-purple-400 hover:bg-purple-500/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {!isUnlocked ? (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center border-2 border-purple-500/50 pulse-glow">
              <Lock className="w-12 h-12 text-purple-400" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                أدخل كود الوصول السري
              </h3>
              <p className="text-purple-300/70 mb-6">
                هذا القسم مخصص للمستخدمين المتقدمين فقط
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <Input
                type="password"
                placeholder="كود الوصول السري..."
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="bg-purple-500/10 border-purple-500/30 text-purple-100 placeholder:text-purple-300/50"
                onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
              />
              
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              
              <Button
                onClick={handleUnlock}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                فتح القفل
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-purple-400 mb-2">
                🔓 تم فتح القسم السري
              </h3>
              <p className="text-purple-300/70">
                مرحباً بك في عالم الأدوات الخارقة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {secretServices.map((service, index) => (
                <Card key={index} className="bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 transition-all cursor-pointer">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-3 text-purple-400">
                      <service.icon className="w-5 h-5" />
                      <span className="text-sm">{service.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-purple-300/70 mb-3">{service.desc}</p>
                    <Button size="sm" className="w-full bg-purple-600/50 hover:bg-purple-600 text-white text-xs">
                      تشغيل الأداة
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlackDiamondModal;

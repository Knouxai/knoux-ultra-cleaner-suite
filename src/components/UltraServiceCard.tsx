import React, { useState } from "react";
import {
  LucideIcon,
  Play,
  Settings,
  Info,
  Zap,
  Target,
  ChevronRight,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ServiceAction {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  type: "primary" | "secondary" | "danger" | "info";
  progress?: number;
  isActive?: boolean;
}

interface UltraServiceCardProps {
  title: string;
  titleAr: string;
  description: string;
  icon: LucideIcon;
  services: string[];
  color: string;
  level: "BASIC" | "ADVANCED" | "EXPERT" | "LEGENDARY" | "COSMIC";
  power: number;
  status: "READY" | "ACTIVE" | "PROCESSING" | "OFFLINE";
  actions: ServiceAction[];
  stats: Record<string, number | string>;
  route?: string;
  onClick?: () => void;
}

const UltraServiceCard: React.FC<UltraServiceCardProps> = ({
  title,
  titleAr,
  description,
  icon: Icon,
  services,
  color,
  level,
  power,
  status,
  actions,
  stats,
  route,
  onClick,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const getLevelBadge = () => {
    const configs = {
      BASIC: { color: "bg-gray-500", text: "أساسي" },
      ADVANCED: { color: "bg-blue-500", text: "متقدم" },
      EXPERT: { color: "bg-purple-500", text: "خبير" },
      LEGENDARY: { color: "bg-orange-500", text: "أسطوري" },
      COSMIC: {
        color: "bg-gradient-to-r from-purple-600 to-pink-600",
        text: "كوني",
      },
    };
    return configs[level];
  };

  const getStatusColor = () => {
    const colors = {
      READY: "text-green-400",
      ACTIVE: "text-blue-400 animate-pulse",
      PROCESSING: "text-yellow-400",
      OFFLINE: "text-red-400",
    };
    return colors[status];
  };

  const handleActionClick = (actionId: string) => {
    setActiveAction(actionId);
    setTimeout(() => setActiveAction(null), 2000);
  };

  return (
    <Card
      className={`relative overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 
                  bg-gradient-to-br from-black/40 via-gray-900/60 to-black/50 
                  border-2 border-gray-700/50 hover:border-white/40
                  backdrop-blur-xl hover:backdrop-blur-2xl
                  ${expanded ? "lg:col-span-2 xl:col-span-2" : ""}
                  shadow-lg hover:shadow-2xl`}
      onClick={!expanded ? () => setExpanded(true) : undefined}
    >
      {/* خلفية متدرجة */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 ${expanded ? "opacity-10" : ""} transition-opacity duration-500`}
      />

      {/* تأثيرات الجسيمات */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-ping"
            style={{
              top: `${20 + Math.random() * 60}%`,
              right: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} 
                          flex items-center justify-center shadow-xl
                          relative overflow-hidden hover:animate-pulse`}
          >
            <Icon className="w-8 h-8 text-white drop-shadow-lg relative z-10" />
            <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl" />
          </div>

          <div className="text-right space-y-2">
            <div className="flex items-center space-x-2">
              <Badge
                className={`${getLevelBadge().color} text-white font-bold px-3 py-1 shadow-lg`}
              >
                {getLevelBadge().text}
              </Badge>
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-gray-300 font-mono">{power}</span>
              </div>
            </div>
            <div className={`text-sm font-bold ${getStatusColor()}`}>
              {status === "READY"
                ? "جاهز"
                : status === "ACTIVE"
                  ? "نشط"
                  : status === "PROCESSING"
                    ? "يعمل"
                    : "متوقف"}
            </div>
          </div>
        </div>

        <div>
          <h3
            className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1`}
          >
            {titleAr}
          </h3>
          <p className="text-sm text-gray-400 font-mono mb-2">{title}</p>
          <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
        </div>

        {/* شريط التقدم للخدمات */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>الخدمات المتاحة</span>
            <span>{services.length}/10</span>
          </div>
          <Progress
            value={(services.length / 10) * 100}
            className="h-1.5 bg-gray-700"
          />
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        {!expanded ? (
          // العرض المضغوط
          <div className="space-y-4">
            {/* خدمات سريعة */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-300 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                الخدمات الرئيسية
              </div>
              {services.slice(0, 3).map((service, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 text-xs text-gray-400"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span>{service}</span>
                </div>
              ))}
              {services.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{services.length - 3} خدمات إضافية...
                </div>
              )}
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(stats)
                .slice(0, 2)
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="text-center p-2 rounded bg-black/30 border border-gray-600/30"
                  >
                    <div className="text-sm font-bold text-white">{value}</div>
                    <div className="text-xs text-gray-400">{key}</div>
                  </div>
                ))}
            </div>

            {/* زر التوسع */}
            <Button
              className={`w-full bg-gradient-to-r ${color} hover:scale-105 transition-transform shadow-lg`}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(true);
              }}
            >
              <ChevronRight className="w-4 h-4 mr-2" />
              عرض التفاصيل والأدوات
            </Button>
          </div>
        ) : (
          // العرض الموسع
          <div className="space-y-6">
            {/* جميع الخدمات */}
            <div>
              <h4 className="text-lg font-bold text-white mb-3 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                جميع الخدمات المتاحة
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service, i) => (
                  <div
                    key={i}
                    className="flex items-center p-2 rounded bg-black/30 border border-gray-600/30 hover:bg-black/50 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                    <span className="text-sm text-gray-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* الإحصائيات الكاملة */}
            <div>
              <h4 className="text-lg font-bold text-white mb-3">
                الإحصائيات التفصيلية
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="text-center p-3 rounded-lg bg-black/30 border border-gray-600/30"
                  >
                    <div className="text-lg font-bold text-white">{value}</div>
                    <div className="text-xs text-gray-400">{key}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div>
              <h4 className="text-lg font-bold text-white mb-3">
                الإجراءات المتاحة
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {actions.map((action) => (
                  <Button
                    key={action.id}
                    variant={
                      action.type === "danger" ? "destructive" : "outline"
                    }
                    className={`flex items-center justify-center p-4 h-auto flex-col space-y-2 
                               ${action.type === "primary" ? `bg-gradient-to-r ${color}` : ""}
                               ${activeAction === action.id ? "animate-pulse" : ""}
                               hover:scale-105 transition-all border-gray-600/50`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleActionClick(action.id);
                    }}
                  >
                    <action.icon className="w-5 h-5" />
                    <div className="text-center">
                      <div className="text-sm font-bold">{action.name}</div>
                      <div className="text-xs opacity-80">
                        {action.description}
                      </div>
                    </div>
                    {action.progress !== undefined && (
                      <Progress
                        value={action.progress}
                        className="w-full h-1"
                      />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* أزرار التحكم */}
            <div className="flex space-x-3 pt-4 border-t border-gray-600/30">
              <Button
                className={`flex-1 bg-gradient-to-r ${color} hover:scale-105 transition-transform font-bold`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClick) onClick();
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                الدخول للقسم
              </Button>
              <Button
                variant="outline"
                className="border-gray-600/50 hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
              >
                تصغير
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UltraServiceCard;

import React, { useState, useEffect } from "react";
import {
  LucideIcon,
  ArrowLeft,
  Settings,
  Info,
  Play,
  Pause,
  RotateCcw,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface PageStats {
  [key: string]: string | number;
}

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  status: "ready" | "active" | "processing" | "completed" | "error";
  progress?: number;
  stats: PageStats;
  actions: Array<{
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    type: "primary" | "secondary" | "danger" | "info";
    onClick: () => void;
  }>;
}

interface QuickAction {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  active: boolean;
  onClick: () => void;
}

interface UltraPageLayoutProps {
  pageTitle: string;
  pageSubtitle: string;
  pageIcon: LucideIcon;
  pageColor: string;
  level: "BASIC" | "ADVANCED" | "EXPERT" | "LEGENDARY" | "COSMIC";
  power: number;
  status: "READY" | "ACTIVE" | "PROCESSING" | "OFFLINE";
  systemStats: Array<{
    name: string;
    value: number;
    icon: LucideIcon;
    color: string;
  }>;
  serviceCards: ServiceCard[];
  quickActions: QuickAction[];
  globalControls?: React.ReactNode;
  children?: React.ReactNode;
}

const UltraPageLayout: React.FC<UltraPageLayoutProps> = ({
  pageTitle,
  pageSubtitle,
  pageIcon: PageIcon,
  pageColor,
  level,
  power,
  status,
  systemStats,
  serviceCards,
  quickActions,
  globalControls,
  children,
}) => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [globalProgress, setGlobalProgress] = useState(0);

  // تأثير النبض الحي
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalProgress((prev) => {
        const newValue = prev + (Math.random() - 0.5) * 10;
        return Math.max(0, Math.min(100, newValue));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 relative overflow-hidden">
      {/* خلفية النجوم المتحركة */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* الهيدر الخيالي */}
        <div className="glass-card p-8 rounded-3xl mb-8 relative overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${pageColor} opacity-10 animate-pulse`}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/")}
                  className="glass-button rounded-full mr-4"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>

                <div className="relative">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${pageColor} 
                                rounded-full flex items-center justify-center shadow-2xl`}
                  >
                    <PageIcon className="w-10 h-10 text-white" />
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 
                                rounded-full flex items-center justify-center animate-pulse"
                  >
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div>
                  <h1
                    className={`text-4xl font-bold bg-gradient-to-r ${pageColor} bg-clip-text text-transparent mb-2`}
                  >
                    {pageTitle}
                  </h1>
                  <p className="text-gray-300 text-lg">{pageSubtitle}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge
                      className={`${getLevelBadge().color} text-white font-bold px-3 py-1`}
                    >
                      {getLevelBadge().text}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-300 font-mono">
                        {power.toLocaleString()}
                      </span>
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
              </div>

              {/* وحدة التحكم العامة */}
              <div className="space-y-4 min-w-[300px]">
                {globalControls}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600/50 hover:bg-white/10"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-600/50 hover:bg-white/10"
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* مؤشرات النظام */}
            <div className="grid grid-cols-4 gap-4">
              {systemStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-black/20 border border-gray-600/30"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}%
                  </div>
                  <div className="text-xs text-gray-400">{stat.name}</div>
                  <Progress
                    value={stat.value}
                    className="h-1 mt-2 bg-gray-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* الأعمال السريعة */}
        <div className="glass-card p-6 rounded-2xl mb-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-yellow-400" />
            الإجراءات السريعة
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                onClick={action.onClick}
                className={`h-16 bg-gradient-to-r ${action.color} hover:scale-105 transition-all
                           shadow-lg hover:shadow-xl ${action.active ? "animate-pulse" : "opacity-70"}`}
              >
                <div className="flex flex-col items-center">
                  <action.icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-bold">{action.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* بطاقات الخدمات */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {serviceCards.map((card) => (
            <Card
              key={card.id}
              className={`relative overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 
                          bg-gradient-to-br from-black/40 via-gray-900/60 to-black/50 
                          border-2 border-gray-700/50 hover:border-white/40
                          backdrop-blur-xl hover:backdrop-blur-2xl
                          ${activeCard === card.id ? "ring-4 ring-white/50 scale-105" : ""}
                          shadow-lg hover:shadow-2xl`}
              onClick={() =>
                setActiveCard(activeCard === card.id ? null : card.id)
              }
            >
              {/* خلفية متدرجة */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 transition-opacity duration-500`}
              />

              {/* تأثيرات الجسيمات */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      right: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>

              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} 
                                  flex items-center justify-center shadow-xl hover:animate-pulse`}
                  >
                    <card.icon className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>

                  <div className="text-right">
                    <Badge
                      variant={
                        card.status === "active"
                          ? "default"
                          : card.status === "processing"
                            ? "secondary"
                            : card.status === "error"
                              ? "destructive"
                              : "outline"
                      }
                      className="mb-2"
                    >
                      {card.status === "ready"
                        ? "جاهز"
                        : card.status === "active"
                          ? "نشط"
                          : card.status === "processing"
                            ? "يعمل"
                            : card.status === "completed"
                              ? "مكتمل"
                              : "خطأ"}
                    </Badge>
                    {card.progress !== undefined && (
                      <div className="text-xs text-gray-400">
                        {card.progress}%
                      </div>
                    )}
                  </div>
                </div>

                <CardTitle
                  className={`text-lg font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent mb-2`}
                >
                  {card.title}
                </CardTitle>
                <p className="text-sm text-gray-300">{card.description}</p>

                {card.progress !== undefined && (
                  <div className="mt-3">
                    <Progress
                      value={card.progress}
                      className="h-2 bg-gray-700"
                    />
                  </div>
                )}
              </CardHeader>

              <CardContent className="relative z-10">
                {/* الإحصائيات */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Object.entries(card.stats)
                    .slice(0, 2)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="text-center p-2 rounded bg-black/30 border border-gray-600/30"
                      >
                        <div className="text-sm font-bold text-white">
                          {value}
                        </div>
                        <div className="text-xs text-gray-400">{key}</div>
                      </div>
                    ))}
                </div>

                {/* الإجراءات */}
                <div className="flex space-x-2">
                  {card.actions.slice(0, 2).map((action) => (
                    <Button
                      key={action.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick();
                      }}
                      variant={
                        action.type === "danger"
                          ? "destructive"
                          : action.type === "primary"
                            ? "default"
                            : "outline"
                      }
                      size="sm"
                      className="flex-1"
                    >
                      <action.icon className="w-4 h-4 mr-1" />
                      {action.name}
                    </Button>
                  ))}
                </div>

                {/* تفاصيل إضافية عند التوسع */}
                {activeCard === card.id && (
                  <div className="mt-4 space-y-3 animate-fadeIn">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />

                    {/* جميع الإحصائيات */}
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(card.stats)
                        .slice(2)
                        .map(([key, value]) => (
                          <div
                            key={key}
                            className="text-center p-2 rounded bg-black/30 border border-gray-600/30"
                          >
                            <div className="text-sm font-bold text-white">
                              {value}
                            </div>
                            <div className="text-xs text-gray-400">{key}</div>
                          </div>
                        ))}
                    </div>

                    {/* جميع الإجراءات */}
                    <div className="grid grid-cols-2 gap-2">
                      {card.actions.slice(2).map((action) => (
                        <Button
                          key={action.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            action.onClick();
                          }}
                          variant={
                            action.type === "danger" ? "destructive" : "outline"
                          }
                          size="sm"
                        >
                          <action.icon className="w-4 h-4 mr-1" />
                          {action.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* محتوى إضافي */}
        {children}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UltraPageLayout;

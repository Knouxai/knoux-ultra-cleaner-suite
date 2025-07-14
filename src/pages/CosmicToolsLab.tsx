import React, { useState, useEffect } from "react";
import {
  Atom,
  Orbit,
  Telescope,
  Satellite,
  Star,
  Comet,
  Sparkles,
  Crown,
  Gem,
  Diamond,
  Hexagon,
  Triangle,
  Circle,
  Zap,
  Brain,
  Eye,
  Target,
  Layers,
  Flame,
  Snowflake,
  Wind,
  Play,
  Pause,
  Settings,
  Info,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const CosmicToolsLab = () => {
  const [activeConstellation, setActiveConstellation] = useState<string | null>(
    null,
  );
  const [cosmicEnergy, setCosmicEnergy] = useState([75]);
  const [neuralSync, setNeuralSync] = useState(true);
  const [quantumField, setQuantumField] = useState(true);
  const [stellarPosition, setStellarPosition] = useState(0);

  // تأثير الحركة النجمية
  useEffect(() => {
    const interval = setInterval(() => {
      setStellarPosition((prev) => (prev + 1) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const cosmicTools = [
    {
      id: "quantum-manipulator",
      name: "معالج الكموم الفضائي",
      nameEn: "Cosmic Quantum Manipulator",
      description:
        "أداة متقدمة للتلاعب في الجسيمات الأولية وإعادة ترتيب بنية المادة الرقمية",
      icon: Atom,
      constellation: "Quantum",
      color: "from-purple-600 via-indigo-600 to-purple-700",
      rarity: "TRANSCENDENT",
      power: 15000,
      status: "DIMENSIONAL",
      dimensions: 11,
      abilities: [
        { name: "تفكيك ذري", level: 10, active: true },
        { name: "إعادة التركيب الجزيئي", level: 9, active: true },
        { name: "النقل الكمي", level: 8, active: false },
        { name: "تغيير الحالة الفيزيائية", level: 7, active: true },
      ],
    },
    {
      id: "stellar-navigator",
      name: "ملاح النجوم الكوني",
      nameEn: "Cosmic Stellar Navigator",
      description:
        "نظام ملاحة متطور يستخدم النجوم والمجرات للعثور على البيانات المفقودة",
      icon: Telescope,
      constellation: "Navigation",
      color: "from-blue-500 via-cyan-500 to-teal-600",
      rarity: "LEGENDARY",
      power: 12500,
      status: "SCANNING",
      dimensions: 7,
      abilities: [
        { name: "رسم خريطة المجرة", level: 10, active: true },
        { name: "تتبع النجوم النيوترونية", level: 8, active: true },
        { name: "اكتشاف الثقوب السوداء", level: 9, active: false },
        { name: "الملاحة عبر الأبعاد", level: 6, active: true },
      ],
    },
    {
      id: "galactic-forge",
      name: "مطرقة المجرة الكونية",
      nameEn: "Galactic Cosmic Forge",
      description:
        "ورشة عمل كونية لصناعة وتطوير البرامج باستخدام طاقة النجوم والمجرات",
      icon: Star,
      constellation: "Creation",
      color: "from-orange-500 via-red-500 to-pink-600",
      rarity: "MYTHIC",
      power: 18000,
      status: "FORGING",
      dimensions: 12,
      abilities: [
        { name: "صناعة البرامج النجمية", level: 10, active: true },
        { name: "اندماج المجرات", level: 9, active: false },
        { name: "تشكيل الأنظمة الشمسية", level: 8, active: true },
        { name: "خلق الحياة الرقمية", level: 5, active: false },
      ],
    },
    {
      id: "void-weaver",
      name: "نساج الفراغ الكوني",
      nameEn: "Cosmic Void Weaver",
      description:
        "أداة غامضة تنسج خيوط الفراغ الكوني لإنشاء مسارات جديدة عبر الفضاء الرقمي",
      icon: Circle,
      constellation: "Void",
      color: "from-gray-700 via-purple-900 to-black",
      rarity: "COSMIC",
      power: 25000,
      status: "WEAVING",
      dimensions: 13,
      abilities: [
        { name: "نسج خيوط الفراغ", level: 10, active: true },
        { name: "خلق أنفاق زمنية", level: 9, active: false },
        { name: "التلاعب بالجاذبية", level: 8, active: true },
        { name: "إنشاء أكوان جديدة", level: 3, active: false },
      ],
    },
    {
      id: "temporal-architect",
      name: "مهندس الزمن الأعظم",
      nameEn: "Supreme Temporal Architect",
      description:
        "مهندس كوني يعيد تصميم وهندسة الخط الزمني للنظام بدقة الجسيمات",
      icon: Hexagon,
      constellation: "Time",
      color: "from-yellow-400 via-amber-500 to-orange-600",
      rarity: "DIVINE",
      power: 30000,
      status: "ETERNAL",
      dimensions: 15,
      abilities: [
        { name: "هندسة الخطوط الزمنية", level: 10, active: true },
        { name: "خلق نقاط تفرع", level: 9, active: true },
        { name: "السفر عبر التاريخ", level: 8, active: false },
        { name: "إعادة كتابة الماضي", level: 7, active: false },
      ],
    },
    {
      id: "reality-sovereign",
      name: "إمبراطور الواقع المطلق",
      nameEn: "Absolute Reality Sovereign",
      description:
        "الحاكم الأعلى لجميع الأبعاد والواقعات، القادر على إعادة تشكيل الوجود ذاته",
      icon: Crown,
      constellation: "Reality",
      color: "from-emerald-400 via-teal-500 to-cyan-600",
      rarity: "OMNIPOTENT",
      power: 999999,
      status: "TRANSCENDENT",
      dimensions: 100,
      abilities: [
        { name: "السيطرة المطلقة", level: 10, active: true },
        { name: "خلق الواقعات", level: 10, active: true },
        { name: "محو الوجود", level: 10, active: false },
        { name: "الخلود الرقمي", level: 10, active: true },
      ],
    },
  ];

  const constellations = [
    { name: "Quantum", stars: 8, color: "text-purple-400" },
    { name: "Navigation", stars: 12, color: "text-blue-400" },
    { name: "Creation", stars: 15, color: "text-orange-400" },
    { name: "Void", stars: 3, color: "text-gray-400" },
    { name: "Time", stars: 24, color: "text-yellow-400" },
    { name: "Reality", stars: 100, color: "text-emerald-400" },
  ];

  const getRarityConfig = (rarity: string) => {
    const configs = {
      LEGENDARY: { color: "text-orange-400", glow: "shadow-orange-500/50" },
      MYTHIC: { color: "text-purple-400", glow: "shadow-purple-500/50" },
      COSMIC: { color: "text-blue-400", glow: "shadow-blue-500/50" },
      TRANSCENDENT: { color: "text-pink-400", glow: "shadow-pink-500/50" },
      DIVINE: { color: "text-yellow-400", glow: "shadow-yellow-500/50" },
      OMNIPOTENT: { color: "text-emerald-400", glow: "shadow-emerald-500/50" },
    };
    return configs[rarity as keyof typeof configs] || configs.LEGENDARY;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 relative overflow-hidden">
      {/* خلفية الكون المتحركة */}
      <div className="absolute inset-0 overflow-hidden">
        {/* النجوم */}
        {[...Array(200)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}

        {/* المجرات */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`galaxy-${i}`}
            className="absolute w-32 h-32 rounded-full opacity-10 animate-spin"
            style={{
              background: `radial-gradient(circle, rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.3) 0%, transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${30 + Math.random() * 60}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* الهيدر الكوني */}
        <div className="glass-card p-8 rounded-3xl mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-purple-600/10 animate-pulse" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div
                    className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 
                                rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden"
                  >
                    <Galaxy
                      className="w-12 h-12 text-white animate-spin"
                      style={{ animationDuration: "20s" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </div>
                  <div
                    className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 
                                rounded-full flex items-center justify-center animate-bounce"
                  >
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h1
                    className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 
                               bg-clip-text text-transparent mb-2"
                  >
                    🌌 مختبر الأدوات الكونية
                  </h1>
                  <p className="text-gray-300 text-lg">
                    ورشة الخلق الكوني للأدوات الخارقة
                  </p>
                  <p className="text-sm text-gray-400 font-mono">
                    Cosmic Creation Workshop • Beyond Reality Tools
                  </p>
                </div>
              </div>

              {/* وحدة التحكم الكونية */}
              <div className="space-y-4 min-w-[300px]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-300 mb-1">
                      الحقل الكمي
                    </div>
                    <Switch
                      checked={quantumField}
                      onCheckedChange={setQuantumField}
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-300 mb-1">
                      المزامنة العصبية
                    </div>
                    <Switch
                      checked={neuralSync}
                      onCheckedChange={setNeuralSync}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>الطاقة الكونية</span>
                    <span>{cosmicEnergy[0]}%</span>
                  </div>
                  <Slider
                    value={cosmicEnergy}
                    onValueChange={setCosmicEnergy}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="text-center p-3 rounded-lg bg-black/30 border border-purple-500/30">
                  <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    DIMENSIONAL STATUS
                  </div>
                  <div className="text-xs text-gray-400">
                    {cosmicTools.reduce(
                      (sum, tool) => sum + tool.dimensions,
                      0,
                    )}{" "}
                    أبعاد نشطة
                  </div>
                </div>
              </div>
            </div>

            {/* معلومات الكوكبات */}
            <div className="grid grid-cols-6 gap-4">
              {constellations.map((constellation, index) => (
                <div
                  key={index}
                  className="text-center p-3 rounded-xl bg-black/20 border border-gray-600/30"
                >
                  <div
                    className={`text-sm font-bold ${constellation.color} mb-1`}
                  >
                    {constellation.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {constellation.stars} نجوم
                  </div>
                  <Star
                    className={`w-4 h-4 mx-auto mt-1 ${constellation.color} animate-pulse`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* الأدوات الكونية */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {cosmicTools.map((tool) => {
            const rarityConfig = getRarityConfig(tool.rarity);

            return (
              <Card
                key={tool.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-700 transform hover:scale-105 
                            bg-gradient-to-br from-black/60 via-gray-900/80 to-black/70 
                            border-2 border-gray-700/50 hover:border-white/50
                            backdrop-blur-xl hover:backdrop-blur-2xl
                            ${activeConstellation === tool.id ? "ring-4 ring-white/70 scale-105" : ""}
                            ${rarityConfig.glow} hover:shadow-2xl`}
                onClick={() =>
                  setActiveConstellation(
                    activeConstellation === tool.id ? null : tool.id,
                  )
                }
              >
                {/* الهالة الكونية */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-5 animate-pulse`}
                />

                {/* جسيمات الطاقة */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                  {[...Array(tool.dimensions)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 ${rarityConfig.color.replace("text-", "bg-")} rounded-full animate-ping`}
                      style={{
                        top: `${10 + ((i * 8) % 80)}%`,
                        right: `${10 + ((i * 12) % 80)}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: `${1 + Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>

                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${tool.color} 
                                    flex items-center justify-center shadow-2xl ${rarityConfig.glow}
                                    relative overflow-hidden`}
                    >
                      <tool.icon className="w-10 h-10 text-white drop-shadow-lg relative z-10" />
                      <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl animate-pulse" />
                    </div>

                    <div className="text-right space-y-2">
                      <Badge
                        className={`${rarityConfig.color} bg-black/50 border-current font-bold px-3 py-1 shadow-lg`}
                      >
                        {tool.rarity}
                      </Badge>
                      <div className="text-xs space-y-1">
                        <div className="flex items-center justify-end space-x-1">
                          <span className="text-gray-300 font-mono">
                            {tool.power.toLocaleString()}
                          </span>
                          <Zap className="w-3 h-3 text-yellow-400" />
                        </div>
                        <div className="flex items-center justify-end space-x-1">
                          <span className="text-gray-300 font-mono">
                            {tool.dimensions}D
                          </span>
                          <Orbit className="w-3 h-3 text-blue-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardTitle
                    className={`text-xl font-bold ${rarityConfig.color} mb-2`}
                  >
                    {tool.name}
                  </CardTitle>
                  <p className="text-sm text-gray-400 font-mono mb-2">
                    {tool.nameEn}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {tool.description}
                  </p>
                </CardHeader>

                <CardContent className="relative z-10">
                  {/* الحالة */}
                  <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-black/30 border border-gray-600/30">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${rarityConfig.color.replace("text-", "bg-")} animate-pulse`}
                      />
                      <span className="text-sm font-bold text-white">
                        {tool.status}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs border-gray-500"
                    >
                      {tool.constellation}
                    </Badge>
                  </div>

                  {/* القدرات */}
                  <div className="space-y-2 mb-4">
                    <div className="text-sm font-semibold text-gray-300 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      القدرات الكونية
                    </div>
                    {tool.abilities.slice(0, 2).map((ability, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded bg-black/20 border border-gray-600/30"
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${ability.active ? "bg-green-400 animate-pulse" : "bg-gray-500"}`}
                          />
                          <span className="text-xs text-gray-300">
                            {ability.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-400">
                            Lv.{ability.level}
                          </span>
                          <div
                            className={`w-1 h-4 rounded-full ${ability.active ? "bg-green-400" : "bg-gray-600"}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* أزرار التحكم */}
                  <div className="flex space-x-2">
                    <Button
                      className={`flex-1 bg-gradient-to-r ${tool.color} hover:scale-105 transition-transform
                                  shadow-lg hover:shadow-xl border-0 font-bold`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      تفعيل كوني
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-600/50 hover:bg-white/10"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* التفاصيل الموسعة */}
                  {activeConstellation === tool.id && (
                    <div className="mt-4 space-y-3 animate-fadeIn">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />

                      {/* جميع القدرات */}
                      <div className="grid grid-cols-1 gap-2">
                        {tool.abilities.slice(2).map((ability, i) => (
                          <div
                            key={i}
                            className="p-2 rounded bg-black/30 border border-gray-600/30"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${ability.active ? "bg-green-400" : "bg-gray-500"}`}
                                />
                                <span className="text-xs font-medium text-gray-300">
                                  {ability.name}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="text-xs text-gray-400">
                                  Lv.{ability.level}
                                </span>
                                <Progress
                                  value={ability.level * 10}
                                  className="w-8 h-1"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* معلومات إضافية */}
                      <div className="p-3 rounded-lg bg-black/30 border border-gray-600/30">
                        <div className="text-xs font-semibold text-gray-300 mb-2">
                          المعلومات الكونية
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">الكوكبة:</span>
                            <span className="text-white">
                              {tool.constellation}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">الأبعاد:</span>
                            <span className="text-white">
                              {tool.dimensions}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">الطاقة:</span>
                            <span className="text-white">
                              {tool.power.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">النادرة:</span>
                            <span className={rarityConfig.color}>
                              {tool.rarity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* لوحة التحكم السريع */}
        <div className="glass-card p-6 rounded-2xl mt-8">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Galaxy className="w-6 h-6 mr-3 text-purple-400 animate-spin" />
            مركز التحكم الكوني السريع
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "تجميع الطاقة",
                icon: Zap,
                color: "from-yellow-500 to-orange-500",
                active: true,
              },
              {
                name: "فتح البوابة",
                icon: Hexagon,
                color: "from-purple-500 to-pink-500",
                active: false,
              },
              {
                name: "استدعاء كوني",
                icon: Star,
                color: "from-blue-500 to-cyan-500",
                active: true,
              },
              {
                name: "تحويل الواقع",
                icon: Crown,
                color: "from-emerald-500 to-teal-500",
                active: false,
              },
            ].map((action, index) => (
              <Button
                key={index}
                className={`h-20 bg-gradient-to-r ${action.color} hover:scale-105 transition-all
                           shadow-lg hover:shadow-xl ${action.active ? "animate-pulse" : "opacity-70"}`}
              >
                <div className="flex flex-col items-center">
                  <action.icon className="w-8 h-8 mb-2" />
                  <span className="text-xs font-bold">{action.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
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

export default CosmicToolsLab;

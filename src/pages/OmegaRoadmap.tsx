import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Bot,
  Wifi,
  Gem,
  Workflow,
  Shield,
  Cpu,
  Smartphone,
  Lock,
  Brain,
  Eye,
  Globe,
  Sparkles,
  Rocket,
  Star,
  Crown,
  Target,
  Calendar,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface RoadmapItem {
  id: number;
  title: string;
  description: string;
  level: string;
  icon: React.ElementType;
  progress: number;
  status: "planned" | "in-progress" | "completed" | "testing";
  estimatedTime: string;
  features: string[];
  impact: "low" | "medium" | "high" | "revolutionary";
  complexity: number;
}

interface ExclusiveFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: "concept" | "design" | "development" | "testing";
  revolutionLevel: number;
}

const OmegaRoadmap = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [cosmicAnimation, setCosmicAnimation] = useState(true);
  const [selectedPhase, setSelectedPhase] = useState(1);

  const roadmapItems: RoadmapItem[] = [
    {
      id: 1,
      title: "الأداء العام المتطور",
      description: "خوارزميات تحسين أداء ديناميكية تعمل بشكل تنبؤي في الخلفية",
      level: "MYTHIC ⚡",
      icon: Zap,
      progress: 15,
      status: "planned",
      estimatedTime: "2 أشهر",
      features: [
        "محرك التحسين التنبؤي",
        "AI-Powered Resource Allocation",
        "Background Intelligence",
        "Quantum-Speed Optimization",
        "Adaptive Performance Scaling",
      ],
      impact: "revolutionary",
      complexity: 95,
    },
    {
      id: 2,
      title: "مساعد ذكي - Knoux-AI Sidekick",
      description: "مساعد محادثة مدمج داخل كل أداة مع ذكاء اصطناعي متطور",
      level: "LEGENDARY 🤖",
      icon: Bot,
      progress: 25,
      status: "in-progress",
      estimatedTime: "3 أشهر",
      features: [
        "Natural Language Processing",
        "Context Awareness",
        "Proactive Assistance",
        "Learning Memory",
        "Emotional Intelligence",
      ],
      impact: "revolutionary",
      complexity: 90,
    },
    {
      id: 3,
      title: "الاتصال المحلي الذكي",
      description:
        "دعم تشخيص الشبكة المحلية الذكي (LAN Sniffer + Port Monitor)",
      level: "ADVANCED",
      icon: Wifi,
      progress: 40,
      status: "testing",
      estimatedTime: "1.5 أشهر",
      features: [
        "LAN Intelligence Scanner",
        "Intrusion Detection",
        "Bandwidth Monitor",
        "Device Fingerprinting",
        "Router Security Check",
      ],
      impact: "high",
      complexity: 70,
    },
    {
      id: 4,
      title: "الجيل الثاني من BlackDiamond™",
      description:
        "أدوات خارقة جديدة مع واجهة تفاعلية ذات تأثيرات ثلاثية الأبعاد",
      level: "COSMIC 💎",
      icon: Gem,
      progress: 10,
      status: "planned",
      estimatedTime: "4 أشهر",
      features: [
        "Quantum System Weaver",
        "Neural System Interface",
        "Atomic Registry Manipulator",
        "Holographic Interface",
        "3D Tool Manipulation",
      ],
      impact: "revolutionary",
      complexity: 100,
    },
    {
      id: 5,
      title: "أدوات أوتوماتيكية مجدولة",
      description: "Workflow Engine لتشغيل تسلسل أدوات تلقائي كل فترة محددة",
      level: "EXPERT 🛠️",
      icon: Workflow,
      progress: 60,
      status: "testing",
      estimatedTime: "2 أشهر",
      features: [
        "Workflow Automation System",
        "Smart Scheduling",
        "Condition-Based Execution",
        "Performance Optimization",
        "Learning from Results",
      ],
      impact: "high",
      complexity: 80,
    },
    {
      id: 6,
      title: "حماية من البرامج المريبة",
      description:
        "Real-time AI App Behavior Scanner يكشف السلوكيات المشبوهة مباشرةً",
      level: "MYTHIC 🛡️",
      icon: Shield,
      progress: 30,
      status: "in-progress",
      estimatedTime: "3 أشهر",
      features: [
        "AI Behavior Scanner",
        "Neural Network Analysis",
        "Behavioral Fingerprinting",
        "Predictive Threat Detection",
        "Zero-Day Protection",
      ],
      impact: "revolutionary",
      complexity: 92,
    },
    {
      id: 7,
      title: "توزيع ذكي للمهام",
      description: "إضافة دعم Web Workers لتقسيم المهام الثقيلة في الخلفية",
      level: "EXPERT ⚙️",
      icon: Cpu,
      progress: 70,
      status: "testing",
      estimatedTime: "1 شهر",
      features: [
        "Smart Task Distribution",
        "Intelligent Load Balancing",
        "Dynamic Worker Scaling",
        "Priority-Based Scheduling",
        "Fault Tolerance",
      ],
      impact: "high",
      complexity: 75,
    },
    {
      id: 8,
      title: "إدارة الواقع الكوني",
      description:
        "محرّك تحكم في الواقع الا��تراضي للنظام بواجهة 3D (Matrix View Mode)",
      level: "TRANSCENDENT 🌠",
      icon: Eye,
      progress: 5,
      status: "planned",
      estimatedTime: "5 أشهر",
      features: [
        "Matrix View Mode",
        "3D System Visualization",
        "Interactive Process Nodes",
        "Data Flow Rivers",
        "Reality Manipulation",
      ],
      impact: "revolutionary",
      complexity: 100,
    },
    {
      id: 9,
      title: "واجهة موبايل خاصة",
      description: "نسخة PWA مخصصة بواجهة زجاجية محسنة للموبايل",
      level: "HIGH PRIORITY 📲",
      icon: Smartphone,
      progress: 80,
      status: "testing",
      estimatedTime: "2 أشهر",
      features: [
        "Progressive Web App",
        "Touch-First Interface",
        "Gesture Navigation",
        "Battery-Aware Operations",
        "Mobile-Specific Tools",
      ],
      impact: "high",
      complexity: 65,
    },
    {
      id: 10,
      title: "تحسين التشفير والخصوصية",
      description: "دمج مكتبة AES-512 مع وضع Secure Memory",
      level: "DIVINE 🔒",
      icon: Lock,
      progress: 45,
      status: "in-progress",
      estimatedTime: "3 أش��ر",
      features: [
        "Divine Encryption System",
        "Quantum-Resistant Encryption",
        "Zero-Knowledge Architecture",
        "Perfect Forward Secrecy",
        "Anti-Forensics",
      ],
      impact: "revolutionary",
      complexity: 98,
    },
  ];

  const exclusiveFeatures: ExclusiveFeature[] = [
    {
      id: "neural-sync",
      name: "Knoux Neural-Sync™",
      description:
        "محرك يتعلم من سلوك المستخدم ليُحسّن الأداء تلقائيًا مع الوقت",
      icon: Brain,
      status: "development",
      revolutionLevel: 95,
    },
    {
      id: "reality-mapper",
      name: "Reality Mapper",
      description:
        "أداة استكشاف تفاعلية داخل النظام، تعرض النشاطات والعمليات بشكل بصري 3D",
      icon: Globe,
      status: "design",
      revolutionLevel: 90,
    },
    {
      id: "vault-pro",
      name: "Knoux Vault Pro",
      description:
        "خزنة مشفرة بالكامل، تدعم السحب والإفلات وتعمل مع تقنيات WebCrypto API",
      icon: Lock,
      status: "development",
      revolutionLevel: 85,
    },
    {
      id: "system-recorder",
      name: "أداة تسجيل عمليات النظام",
      description:
        "لكل زر أو أداة يتم الضغط عليه، يمكن تسجيله كـ Script أو سيناريو قابل للتكرار",
      icon: Target,
      status: "concept",
      revolutionLevel: 80,
    },
    {
      id: "plugin-system",
      name: "AI Plugin System",
      description:
        "دعم إضافة أدوات جديدة عبر ملفات *.knxai يمكن للمستخدمين تصميمها وربطها بسهولة",
      icon: Sparkles,
      status: "concept",
      revolutionLevel: 88,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "testing":
        return "bg-blue-500";
      case "in-progress":
        return "bg-yellow-500";
      case "planned":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "testing":
        return AlertCircle;
      case "in-progress":
        return Clock;
      case "planned":
        return Calendar;
      default:
        return Clock;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "revolutionary":
        return "from-purple-500 via-pink-500 to-red-500";
      case "high":
        return "from-blue-500 to-purple-500";
      case "medium":
        return "from-green-500 to-blue-500";
      case "low":
        return "from-gray-500 to-green-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCosmicAnimation((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const averageProgress = Math.round(
    roadmapItems.reduce((sum, item) => sum + item.progress, 0) /
      roadmapItems.length,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)]" />
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{
                rotate: cosmicAnimation ? 360 : 0,
                scale: cosmicAnimation ? 1.2 : 1,
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <Rocket className="w-16 h-16 text-purple-400" />
            </motion.div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Omega Update 1.1
            </h1>
            <motion.div
              animate={{
                rotate: cosmicAnimation ? -360 : 0,
                scale: cosmicAnimation ? 1.2 : 1,
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <Star className="w-16 h-16 text-pink-400" />
            </motion.div>
          </div>

          <p className="text-2xl text-gray-300 mb-6 max-w-4xl mx-auto">
            النقلة التطويرية الكبرى - من الكمال إلى ما وراء الخيال
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge
              variant="outline"
              className="text-lg px-6 py-2 border-purple-500 text-purple-300"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Q2 2025
            </Badge>
            <Badge
              variant="outline"
              className="text-lg px-6 py-2 border-blue-500 text-blue-300"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              تقدم إجمالي: {averageProgress}%
            </Badge>
            <Badge
              variant="outline"
              className="text-lg px-6 py-2 border-green-500 text-green-300"
            >
              <Crown className="w-5 h-5 mr-2" />
              10 ميزات ثورية
            </Badge>
          </div>

          {/* Overall Progress */}
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">التقدم الإجمالي</span>
              <span className="text-sm text-gray-400">{averageProgress}%</span>
            </div>
            <Progress value={averageProgress} className="h-3 bg-gray-700" />
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs
          value={`phase-${selectedPhase}`}
          onValueChange={(value) =>
            setSelectedPhase(parseInt(value.split("-")[1]))
          }
        >
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-800/50 backdrop-blur-md">
            <TabsTrigger
              value="phase-1"
              className="data-[state=active]:bg-purple-600"
            >
              المرحلة الأولى
            </TabsTrigger>
            <TabsTrigger
              value="phase-2"
              className="data-[state=active]:bg-blue-600"
            >
              المرحلة الثانية
            </TabsTrigger>
            <TabsTrigger
              value="phase-3"
              className="data-[state=active]:bg-green-600"
            >
              المرحلة الثالثة
            </TabsTrigger>
            <TabsTrigger
              value="phase-4"
              className="data-[state=active]:bg-red-600"
            >
              الميزات الحصرية
            </TabsTrigger>
          </TabsList>

          {/* Phase 1: Core Features */}
          <TabsContent value="phase-1" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {roadmapItems.slice(0, 3).map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <Card
                    className={`glass-card border-0 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                      activeItem === item.id ? "ring-2 ring-purple-500" : ""
                    }`}
                    onClick={() =>
                      setActiveItem(activeItem === item.id ? null : item.id)
                    }
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-r ${getImpactColor(item.impact)}`}
                          >
                            <item.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-white mb-2">
                              {item.title}
                            </CardTitle>
                            <Badge
                              variant="outline"
                              className={`${getStatusColor(item.status)} text-white border-0`}
                            >
                              {React.createElement(getStatusIcon(item.status), {
                                className: "w-4 h-4 mr-1",
                              })}
                              {item.level}
                            </Badge>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: activeItem === item.id ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="w-6 h-6 text-gray-400" />
                        </motion.div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-300 mb-4">{item.description}</p>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-400">التقدم</span>
                        <span className="text-sm text-gray-400">
                          {item.progress}%
                        </span>
                      </div>
                      <Progress value={item.progress} className="mb-4 h-2" />

                      <div className="flex justify-between text-sm text-gray-400 mb-4">
                        <span>الوقت المقدر: {item.estimatedTime}</span>
                        <span>التعقيد: {item.complexity}%</span>
                      </div>

                      <AnimatePresence>
                        {activeItem === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-gray-600 pt-4 mt-4"
                          >
                            <h4 className="text-lg font-semibold text-white mb-3">
                              الميزات الجديدة:
                            </h4>
                            <div className="space-y-2">
                              {item.features.map((feature, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center gap-2"
                                >
                                  <Sparkles className="w-4 h-4 text-purple-400" />
                                  <span className="text-gray-300">
                                    {feature}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Phase 2: Advanced Features */}
          <TabsContent value="phase-2" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {roadmapItems.slice(3, 6).map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <Card
                    className={`glass-card border-0 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                      activeItem === item.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() =>
                      setActiveItem(activeItem === item.id ? null : item.id)
                    }
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-r ${getImpactColor(item.impact)}`}
                          >
                            <item.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-white mb-2">
                              {item.title}
                            </CardTitle>
                            <Badge
                              variant="outline"
                              className={`${getStatusColor(item.status)} text-white border-0`}
                            >
                              {React.createElement(getStatusIcon(item.status), {
                                className: "w-4 h-4 mr-1",
                              })}
                              {item.level}
                            </Badge>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: activeItem === item.id ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="w-6 h-6 text-gray-400" />
                        </motion.div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-300 mb-4">{item.description}</p>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-400">التقدم</span>
                        <span className="text-sm text-gray-400">
                          {item.progress}%
                        </span>
                      </div>
                      <Progress value={item.progress} className="mb-4 h-2" />

                      <div className="flex justify-between text-sm text-gray-400 mb-4">
                        <span>الوقت المقدر: {item.estimatedTime}</span>
                        <span>التعقيد: {item.complexity}%</span>
                      </div>

                      <AnimatePresence>
                        {activeItem === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-gray-600 pt-4 mt-4"
                          >
                            <h4 className="text-lg font-semibold text-white mb-3">
                              الميزات الجديدة:
                            </h4>
                            <div className="space-y-2">
                              {item.features.map((feature, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center gap-2"
                                >
                                  <Sparkles className="w-4 h-4 text-blue-400" />
                                  <span className="text-gray-300">
                                    {feature}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Phase 3: Revolutionary Features */}
          <TabsContent value="phase-3" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {roadmapItems.slice(6, 10).map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                >
                  <Card
                    className={`glass-card border-0 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                      activeItem === item.id ? "ring-2 ring-green-500" : ""
                    }`}
                    onClick={() =>
                      setActiveItem(activeItem === item.id ? null : item.id)
                    }
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-r ${getImpactColor(item.impact)}`}
                          >
                            <item.icon className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-white mb-2">
                              {item.title}
                            </CardTitle>
                            <Badge
                              variant="outline"
                              className={`${getStatusColor(item.status)} text-white border-0`}
                            >
                              {React.createElement(getStatusIcon(item.status), {
                                className: "w-4 h-4 mr-1",
                              })}
                              {item.level}
                            </Badge>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: activeItem === item.id ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="w-6 h-6 text-gray-400" />
                        </motion.div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-300 mb-4">{item.description}</p>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-400">التقدم</span>
                        <span className="text-sm text-gray-400">
                          {item.progress}%
                        </span>
                      </div>
                      <Progress value={item.progress} className="mb-4 h-2" />

                      <div className="flex justify-between text-sm text-gray-400 mb-4">
                        <span>الوقت المقدر: {item.estimatedTime}</span>
                        <span>التعقيد: {item.complexity}%</span>
                      </div>

                      <AnimatePresence>
                        {activeItem === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-gray-600 pt-4 mt-4"
                          >
                            <h4 className="text-lg font-semibold text-white mb-3">
                              الميزات الجديدة:
                            </h4>
                            <div className="space-y-2">
                              {item.features.map((feature, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center gap-2"
                                >
                                  <Sparkles className="w-4 h-4 text-green-400" />
                                  <span className="text-gray-300">
                                    {feature}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Phase 4: Exclusive Features */}
          <TabsContent value="phase-4" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-4">
                الميزات الإضافية الحصرية
              </h2>
              <p className="text-xl text-gray-300">
                ميزات ثورية تحول ال��طبيق إلى كائن رقمي ذكي
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {exclusiveFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="glass-card border-0 h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-purple-600">
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-white">
                            {feature.name}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="bg-red-500/20 text-red-300 border-red-500"
                          >
                            {feature.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-300 mb-4">
                        {feature.description}
                      </p>

                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">
                          مستوى الثورة
                        </span>
                        <span className="text-sm text-gray-400">
                          {feature.revolutionLevel}%
                        </span>
                      </div>
                      <Progress
                        value={feature.revolutionLevel}
                        className="h-2"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
          >
            العودة للرئيسية
          </Button>
          <Button
            onClick={() => window.open("/OMEGA_ROADMAP_1.1.md", "_blank")}
            variant="outline"
            className="border-purple-500 text-purple-300 hover:bg-purple-500/20 px-8 py-3 text-lg"
          >
            عرض التفاصيل الكاملة
          </Button>
          <Button
            onClick={() => navigate("/knoux-ultra-hub")}
            variant="outline"
            className="border-pink-500 text-pink-300 hover:bg-pink-500/20 px-8 py-3 text-lg"
          >
            المركز الخارق
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default OmegaRoadmap;

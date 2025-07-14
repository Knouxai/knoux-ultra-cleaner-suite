import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Search,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Trash2,
  Merge,
  FolderOpen,
  FileImage,
  FileText,
  FileAudio,
  FileVideo,
  File,
  Zap,
  Target,
  Layers,
  Activity,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  X,
  ArrowLeftRight,
  Copy,
  HardDrive,
  Clock,
  Sparkles,
  Filter,
  BarChart3,
  Fingerprint,
  Scan,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface DuplicateFile {
  id: string;
  name: string;
  path: string;
  size: number;
  type: "image" | "document" | "audio" | "video" | "code" | "other";
  hash: string;
  similarity: number;
  metadata: {
    created: Date;
    modified: Date;
    dimensions?: string;
    duration?: number;
    quality?: string;
  };
  preview?: string;
}

interface DuplicateGroup {
  id: string;
  type: "exact" | "similar" | "content";
  similarity: number;
  files: DuplicateFile[];
  spaceSaved: number;
  recommendation: "delete" | "merge" | "review";
}

interface ScanProfile {
  id: string;
  name: string;
  description: string;
  algorithms: string[];
  accuracy: number;
  speed: number;
  icon: React.ElementType;
}

interface DedupliXAIProps {
  onClose?: () => void;
}

const DedupliXAI: React.FC<DedupliXAIProps> = ({ onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedPath, setSelectedPath] = useState("");
  const [scanProfile, setScanProfile] = useState<string>("comprehensive");
  const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<DuplicateGroup | null>(
    null,
  );
  const [previewMode, setPreviewMode] = useState<
    "side-by-side" | "overlay" | "diff"
  >("side-by-side");
  const [activeTab, setActiveTab] = useState("scanner");
  const [totalSpaceSaved, setTotalSpaceSaved] = useState(0);
  const [filesProcessed, setFilesProcessed] = useState(0);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  const scanIntervalRef = useRef<NodeJS.Timeout>();
  const animationRef = useRef<number>();

  // Scan profiles for different AI approaches
  const scanProfiles: ScanProfile[] = [
    {
      id: "quick",
      name: "فحص سريع",
      description: "Hash-based detection للملفات المطابقة تماماً",
      algorithms: ["SHA256", "Size Comparison"],
      accuracy: 95,
      speed: 100,
      icon: Zap,
    },
    {
      id: "balanced",
      name: "فحص متوازن",
      description: "Hash + محتوى + ميتاداتا للدقة المتوسطة",
      algorithms: ["SHA256", "Fuzzy Hash", "Metadata"],
      accuracy: 88,
      speed: 70,
      icon: Target,
    },
    {
      id: "comprehensive",
      name: "فحص شامل",
      description: "AI عميق + تحليل بصري + مقارنة محتوى كاملة",
      algorithms: [
        "Perceptual Hash",
        "Content AI",
        "Visual Similarity",
        "Audio Fingerprint",
      ],
      accuracy: 96,
      speed: 40,
      icon: Brain,
    },
  ];

  // Simulated scan locations
  const scanLocations = [
    {
      value: "downloads",
      label: "📁 مجلد التحميلات",
      path: "C:\\Users\\Downloads",
    },
    { value: "documents", label: "📄 المستندات", path: "C:\\Users\\Documents" },
    { value: "pictures", label: "🖼️ الصور", path: "C:\\Users\\Pictures" },
    { value: "videos", label: "🎬 الفيديوهات", path: "C:\\Users\\Videos" },
    { value: "music", label: "🎵 الموسيقى", path: "C:\\Users\\Music" },
    { value: "desktop", label: "🖥️ سطح المكتب", path: "C:\\Users\\Desktop" },
    { value: "c-drive", label: "💿 القرص C:", path: "C:\\" },
    { value: "custom", label: "📂 مسار مخصص", path: "" },
  ];

  // Generate mock duplicate data
  const generateMockDuplicates = (): DuplicateGroup[] => {
    const mockGroups: DuplicateGroup[] = [
      {
        id: "group-1",
        type: "exact",
        similarity: 100,
        spaceSaved: 2400000, // 2.4MB
        recommendation: "delete",
        files: [
          {
            id: "file-1",
            name: "vacation_photo.jpg",
            path: "C:\\Users\\Pictures\\vacation_photo.jpg",
            size: 2400000,
            type: "image",
            hash: "abc123def456",
            similarity: 100,
            metadata: {
              created: new Date("2024-01-15"),
              modified: new Date("2024-01-15"),
              dimensions: "1920x1080",
              quality: "High",
            },
          },
          {
            id: "file-2",
            name: "vacation_photo_copy.jpg",
            path: "C:\\Users\\Desktop\\vacation_photo_copy.jpg",
            size: 2400000,
            type: "image",
            hash: "abc123def456",
            similarity: 100,
            metadata: {
              created: new Date("2024-01-16"),
              modified: new Date("2024-01-16"),
              dimensions: "1920x1080",
              quality: "High",
            },
          },
        ],
      },
      {
        id: "group-2",
        type: "similar",
        similarity: 94,
        spaceSaved: 15700000, // 15.7MB
        recommendation: "review",
        files: [
          {
            id: "file-3",
            name: "presentation_final.pptx",
            path: "C:\\Users\\Documents\\presentation_final.pptx",
            size: 15700000,
            type: "document",
            hash: "xyz789abc123",
            similarity: 94,
            metadata: {
              created: new Date("2024-01-10"),
              modified: new Date("2024-01-12"),
            },
          },
          {
            id: "file-4",
            name: "presentation_v2.pptx",
            path: "C:\\Users\\Documents\\Work\\presentation_v2.pptx",
            size: 15900000,
            type: "document",
            hash: "xyz789abc124",
            similarity: 94,
            metadata: {
              created: new Date("2024-01-11"),
              modified: new Date("2024-01-13"),
            },
          },
        ],
      },
      {
        id: "group-3",
        type: "content",
        similarity: 87,
        spaceSaved: 8500000, // 8.5MB
        recommendation: "merge",
        files: [
          {
            id: "file-5",
            name: "song_original.mp3",
            path: "C:\\Users\\Music\\song_original.mp3",
            size: 8500000,
            type: "audio",
            hash: "music123hash",
            similarity: 87,
            metadata: {
              created: new Date("2024-01-08"),
              modified: new Date("2024-01-08"),
              duration: 245,
              quality: "320kbps",
            },
          },
          {
            id: "file-6",
            name: "song_compressed.mp3",
            path: "C:\\Users\\Downloads\\song_compressed.mp3",
            size: 6200000,
            type: "audio",
            hash: "music123compress",
            similarity: 87,
            metadata: {
              created: new Date("2024-01-09"),
              modified: new Date("2024-01-09"),
              duration: 245,
              quality: "192kbps",
            },
          },
        ],
      },
    ];

    return mockGroups;
  };

  // Start scanning simulation
  const startScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    setFilesProcessed(0);
    setDuplicateGroups([]);
    setAiInsights([]);

    const selectedProfile = scanProfiles.find((p) => p.id === scanProfile);
    const scanDuration = selectedProfile
      ? (100 - selectedProfile.speed) * 100
      : 3000;

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        setFilesProcessed(Math.floor(newProgress * 50));
        return Math.min(newProgress, 100);
      });
    }, scanDuration / 20);

    // Add AI insights during scan
    setTimeout(() => {
      setAiInsights((prev) => [
        ...prev,
        "تم العثور على ملفات صور متشابهة في مجلدات مختلفة",
      ]);
    }, 1000);

    setTimeout(() => {
      setAiInsights((prev) => [
        ...prev,
        "اكتشاف تكرارات في ملفات المستندات بنسبة تشابه عالية",
      ]);
    }, 2500);

    setTimeout(() => {
      setAiInsights((prev) => [
        ...prev,
        "تحليل الملفات الصوتية وكشف إصدارات مختلفة الجودة",
      ]);
    }, 4000);

    // Complete scan
    setTimeout(() => {
      clearInterval(progressInterval);
      setScanProgress(100);
      const mockData = generateMockDuplicates();
      setDuplicateGroups(mockData);
      setTotalSpaceSaved(
        mockData.reduce((sum, group) => sum + group.spaceSaved, 0),
      );
      setIsScanning(false);
      setAiInsights((prev) => [
        ...prev,
        "تم إكمال الفحص! وُجدت 3 مجموعات تكرار يمكن توفير 26.6 MB",
      ]);
    }, scanDuration);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return FileImage;
      case "document":
        return FileText;
      case "audio":
        return FileAudio;
      case "video":
        return FileVideo;
      case "code":
        return File;
      default:
        return File;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getSimilarityColor = (similarity: number): string => {
    if (similarity >= 95) return "text-red-400";
    if (similarity >= 85) return "text-yellow-400";
    return "text-green-400";
  };

  const handleDeleteGroup = (groupId: string) => {
    setDuplicateGroups((prev) => prev.filter((g) => g.id !== groupId));
  };

  const handleMergeGroup = (groupId: string) => {
    const group = duplicateGroups.find((g) => g.id === groupId);
    if (group) {
      // Simulate merge operation
      console.log("Merging group:", group);
      setDuplicateGroups((prev) => prev.filter((g) => g.id !== groupId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)]" />
        {[...Array(50)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="p-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
            >
              <Brain className="w-12 h-12 text-white" />
            </motion.div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                DedupliX AI™
              </h1>
              <p className="text-xl text-gray-300 mt-2">
                ذكاء خرافي لإزالة التكرار، بأي شكل وبأي مكان، أوفلاين تماماً
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Badge
              variant="outline"
              className="text-lg px-6 py-2 border-purple-500 text-purple-300"
            >
              <Fingerprint className="w-5 h-5 mr-2" />
              100% أوفلاين
            </Badge>
            <Badge
              variant="outline"
              className="text-lg px-6 py-2 border-blue-500 text-blue-300"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              ذكاء محلي
            </Badge>
            <Badge
              variant="outline"
              className="text-lg px-6 py-2 border-green-500 text-green-300"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              آمن تماماً
            </Badge>
          </div>

          {onClose && (
            <Button
              onClick={onClose}
              variant="outline"
              className="mb-6 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <X className="w-4 h-4 mr-2" />
              إغلاق
            </Button>
          )}
        </motion.div>

        {/* Main Interface */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-7xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-gray-800/50 backdrop-blur-md">
            <TabsTrigger
              value="scanner"
              className="data-[state=active]:bg-purple-600"
            >
              <Scan className="w-4 h-4 mr-2" />
              الماسح الذكي
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="data-[state=active]:bg-blue-600"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              النتائج
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="data-[state=active]:bg-green-600"
            >
              <Eye className="w-4 h-4 mr-2" />
              المعاينة
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-orange-600"
            >
              <Settings className="w-4 h-4 mr-2" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          {/* Scanner Tab */}
          <TabsContent value="scanner">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Scan Configuration */}
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <Search className="w-8 h-8 text-purple-400" />
                    إعداد الفحص الذكي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Scan Location */}
                  <div>
                    <label className="text-lg font-semibold text-white mb-3 block">
                      🔍 أين تريد البحث عن التكرارات؟
                    </label>
                    <Select
                      value={selectedPath}
                      onValueChange={setSelectedPath}
                    >
                      <SelectTrigger className="w-full bg-gray-700/50 border-gray-600 text-white">
                        <SelectValue placeholder="اختر مكان الفحص" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {scanLocations.map((location) => (
                          <SelectItem
                            key={location.value}
                            value={location.value}
                            className="text-white"
                          >
                            {location.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedPath === "custom" && (
                      <Input
                        placeholder="أدخل المسار المخصص..."
                        className="mt-3 bg-gray-700/50 border-gray-600 text-white"
                      />
                    )}
                  </div>

                  {/* AI Profile Selection */}
                  <div>
                    <label className="text-lg font-semibold text-white mb-3 block">
                      🧠 نمط الذكاء الاصطناعي
                    </label>
                    <div className="grid gap-3">
                      {scanProfiles.map((profile) => (
                        <motion.div
                          key={profile.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            scanProfile === profile.id
                              ? "border-purple-500 bg-purple-500/20"
                              : "border-gray-600 bg-gray-700/30 hover:border-purple-400"
                          }`}
                          onClick={() => setScanProfile(profile.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <profile.icon className="w-6 h-6 text-purple-400" />
                              <div>
                                <h3 className="font-semibold text-white">
                                  {profile.name}
                                </h3>
                                <p className="text-sm text-gray-400">
                                  {profile.description}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-400">
                                دقة: {profile.accuracy}%
                              </div>
                              <div className="text-sm text-gray-400">
                                سرعة: {profile.speed}%
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                              {profile.algorithms.map((algo, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs border-purple-400 text-purple-300"
                                >
                                  {algo}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Start Scan Button */}
                  <Button
                    onClick={startScan}
                    disabled={isScanning || !selectedPath}
                    className="w-full h-16 text-lg bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white"
                  >
                    {isScanning ? (
                      <>
                        <RotateCcw className="w-6 h-6 mr-3 animate-spin" />
                        جاري الفحص الذكي...
                      </>
                    ) : (
                      <>
                        <Brain className="w-6 h-6 mr-3" />
                        🚀 ابدأ الفحص الذكي
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Scan Progress and AI Insights */}
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <Activity className="w-8 h-8 text-blue-400" />
                    حالة الفحص الذكي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress */}
                  {(isScanning || scanProgress > 0) && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">التقدم</span>
                        <span className="text-white">
                          {Math.round(scanProgress)}%
                        </span>
                      </div>
                      <Progress value={scanProgress} className="h-3" />
                      <div className="mt-2 text-sm text-gray-400">
                        تم فحص {filesProcessed.toLocaleString()} ملف
                      </div>
                    </div>
                  )}

                  {/* AI Insights */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      رؤى الذكاء الاصطناعي
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      <AnimatePresence>
                        {aiInsights.map((insight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30"
                          >
                            <div className="flex items-start gap-3">
                              <Brain className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-gray-300">{insight}</p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {aiInsights.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>ابدأ الفحص لرؤية تحليلات الذكاء الاصطناعي</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Scan Summary */}
                  {duplicateGroups.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg bg-green-500/20 border border-green-500/30">
                        <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">
                          {duplicateGroups.length}
                        </p>
                        <p className="text-sm text-gray-400">مجموعات تكرار</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-purple-500/20 border border-purple-500/30">
                        <HardDrive className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white">
                          {formatFileSize(totalSpaceSaved)}
                        </p>
                        <p className="text-sm text-gray-400">
                          مساحة قابلة للتوفير
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            <div className="space-y-6">
              {/* Results Header */}
              <Card className="glass-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        نتائج الفحص الذكي
                      </h2>
                      <p className="text-gray-400">
                        وُجدت {duplicateGroups.length} مجموعة تكرار • يمكن توفير{" "}
                        {formatFileSize(totalSpaceSaved)}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                        onClick={() => {
                          duplicateGroups.forEach((group) =>
                            handleDeleteGroup(group.id),
                          );
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        حذف الكل
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-500 text-blue-300 hover:bg-blue-500/20"
                        onClick={() => {
                          duplicateGroups.forEach((group) =>
                            handleMergeGroup(group.id),
                          );
                        }}
                      >
                        <Wand2 className="w-4 h-4 mr-2" />
                        معالجة ذكية
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Duplicate Groups */}
              <div className="grid gap-6">
                {duplicateGroups.map((group) => (
                  <motion.div
                    key={group.id}
                    layout
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <Card className="glass-card border-0">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-3 rounded-lg ${
                                group.type === "exact"
                                  ? "bg-red-500/20 border border-red-500/30"
                                  : group.type === "similar"
                                    ? "bg-yellow-500/20 border border-yellow-500/30"
                                    : "bg-blue-500/20 border border-blue-500/30"
                              }`}
                            >
                              {group.type === "exact" ? (
                                <Copy className="w-6 h-6 text-red-400" />
                              ) : group.type === "similar" ? (
                                <ArrowLeftRight className="w-6 h-6 text-yellow-400" />
                              ) : (
                                <Layers className="w-6 h-6 text-blue-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                {group.type === "exact"
                                  ? "تكرار مطابق تماماً"
                                  : group.type === "similar"
                                    ? "تكرار متشابه"
                                    : "تكرار محتوى"}
                              </h3>
                              <div className="flex items-center gap-4 mt-1">
                                <Badge
                                  className={`${getSimilarityColor(group.similarity)}`}
                                >
                                  تشابه {group.similarity}%
                                </Badge>
                                <span className="text-sm text-gray-400">
                                  {group.files.length} ملفات •{" "}
                                  {formatFileSize(group.spaceSaved)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedGroup(group)}
                              className="border-blue-500 text-blue-300 hover:bg-blue-500/20"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              معاينة
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMergeGroup(group.id)}
                              className="border-green-500 text-green-300 hover:bg-green-500/20"
                            >
                              <Merge className="w-4 h-4 mr-2" />
                              دمج
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteGroup(group.id)}
                              className="border-red-500 text-red-300 hover:bg-red-500/20"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              حذف
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3">
                          {group.files.map((file) => {
                            const FileIcon = getFileIcon(file.type);
                            return (
                              <div
                                key={file.id}
                                className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
                              >
                                <FileIcon className="w-8 h-8 text-blue-400" />
                                <div className="flex-1">
                                  <h4 className="font-medium text-white">
                                    {file.name}
                                  </h4>
                                  <p className="text-sm text-gray-400">
                                    {file.path}
                                  </p>
                                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                    <span>{formatFileSize(file.size)}</span>
                                    <span>
                                      {file.metadata.modified.toLocaleDateString(
                                        "ar-SA",
                                      )}
                                    </span>
                                    {file.metadata.dimensions && (
                                      <span>{file.metadata.dimensions}</span>
                                    )}
                                    {file.metadata.duration && (
                                      <span>{file.metadata.duration}s</span>
                                    )}
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-gray-400 hover:text-white"
                                >
                                  <FolderOpen className="w-4 h-4" />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {duplicateGroups.length === 0 && (
                <Card className="glass-card border-0">
                  <CardContent className="text-center py-12">
                    <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      لا توجد نتائج
                    </h3>
                    <p className="text-gray-400">
                      ابدأ الفحص الذكي للبحث عن التكرارات
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Eye className="w-8 h-8 text-green-400" />
                  معاينة ذكية للملفات المكررة
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedGroup ? (
                  <div className="space-y-6">
                    {/* Preview Controls */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">
                        معاينة: {selectedGroup.files[0].name}
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={
                            previewMode === "side-by-side"
                              ? "default"
                              : "outline"
                          }
                          onClick={() => setPreviewMode("side-by-side")}
                        >
                          جنباً إلى جنب
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            previewMode === "overlay" ? "default" : "outline"
                          }
                          onClick={() => setPreviewMode("overlay")}
                        >
                          متراكب
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            previewMode === "diff" ? "default" : "outline"
                          }
                          onClick={() => setPreviewMode("diff")}
                        >
                          مقارنة
                        </Button>
                      </div>
                    </div>

                    {/* Preview Content */}
                    <div className="grid grid-cols-2 gap-6">
                      {selectedGroup.files.slice(0, 2).map((file, index) => (
                        <div key={file.id} className="space-y-4">
                          <div className="p-4 rounded-lg bg-gray-800/30">
                            <h4 className="font-semibold text-white mb-2">
                              {file.name}
                            </h4>
                            <div className="aspect-square bg-gray-700/50 rounded-lg flex items-center justify-center">
                              {getFileIcon(file.type)({
                                className: "w-16 h-16 text-gray-400",
                              })}
                            </div>
                            <div className="mt-4 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">الحجم:</span>
                                <span className="text-white">
                                  {formatFileSize(file.size)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">التاريخ:</span>
                                <span className="text-white">
                                  {file.metadata.modified.toLocaleDateString(
                                    "ar-SA",
                                  )}
                                </span>
                              </div>
                              {file.metadata.dimensions && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">
                                    الأبعاد:
                                  </span>
                                  <span className="text-white">
                                    {file.metadata.dimensions}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              احتفظ بهذا
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-300 hover:bg-red-500/20"
                            >
                              احذف
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Merge Options */}
                    <div className="text-center">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Wand2 className="w-4 h-4 mr-2" />
                        دمج ذكي تلقائي
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Eye className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      اختر مجموعة للمعاينة
                    </h3>
                    <p className="text-gray-400">
                      انتقل إلى تبويب النتائج واختر "معاينة" لأي مجموعة
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    إعدادات الفحص
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      حساسية التشابه
                    </label>
                    <Slider
                      defaultValue={[85]}
                      max={100}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>أقل دقة</span>
                      <span>أعلى دقة</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      أنواع الملفات المشمولة
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["صور", "مستندات", "صوت", "فيديو", "أكواد", "أخرى"].map(
                        (type) => (
                          <label
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              defaultChecked
                              className="rounded"
                            />
                            <span className="text-sm text-gray-300">
                              {type}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    إعدادات الأمان
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded"
                      />
                      <span className="text-sm text-gray-300">
                        تجاهل ملفات النظام المحمية
                      </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded"
                      />
                      <span className="text-sm text-gray-300">
                        إنشاء نسخة احتياطية قبل الحذف
                      </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-300">
                        حذف نهائي (غير قابل للاستراداد)
                      </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded"
                      />
                      <span className="text-sm text-gray-300">
                        تأكيد قبل كل عملية حذف
                      </span>
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DedupliXAI;

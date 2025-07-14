import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Eye,
  EyeOff,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Settings,
  Power,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Monitor,
  Activity,
  Database,
  Network,
  Shield,
  Zap,
  Brain,
  Globe,
  Users,
  FileText,
  Folder,
  Download,
  Upload,
  Play,
  Pause,
  Square,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

interface MatrixNode {
  id: string;
  type:
    | "process"
    | "memory"
    | "disk"
    | "network"
    | "security"
    | "user"
    | "system";
  name: string;
  position: { x: number; y: number; z: number };
  size: number;
  color: string;
  status: "active" | "idle" | "warning" | "error" | "critical";
  connections: string[];
  data: {
    cpu?: number;
    memory?: number;
    diskIO?: number;
    networkIO?: number;
    security?: number;
    health?: number;
  };
  icon: React.ElementType;
}

interface MatrixConnection {
  id: string;
  from: string;
  to: string;
  type: "data" | "control" | "security" | "network";
  strength: number;
  direction: "bidirectional" | "outgoing" | "incoming";
  activity: number;
}

interface MatrixViewModeProps {
  isActive?: boolean;
  onExit?: () => void;
}

const MatrixViewMode: React.FC<MatrixViewModeProps> = ({
  isActive = false,
  onExit,
}) => {
  const [nodes, setNodes] = useState<MatrixNode[]>([]);
  const [connections, setConnections] = useState<MatrixConnection[]>([]);
  const [selectedNode, setSelectedNode] = useState<MatrixNode | null>(null);
  const [viewMode, setViewMode] = useState<"3d" | "2d" | "hologram">("3d");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotationX, setRotationX] = useState(15);
  const [rotationY, setRotationY] = useState(45);
  const [rotationZ, setRotationZ] = useState(0);
  const [showConnections, setShowConnections] = useState(true);
  const [showDataFlow, setShowDataFlow] = useState(true);
  const [matrixDensity, setMatrixDensity] = useState(0.7);
  const [realityLevel, setRealityLevel] = useState(0.8);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Motion values for smooth interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(rotationX, springConfig);
  const rotateY = useSpring(rotationY, springConfig);

  // Generate matrix data
  const generateMatrixData = useCallback(() => {
    const systemNodes: MatrixNode[] = [
      // Core System Nodes
      {
        id: "cpu-core",
        type: "system",
        name: "CPU Core Matrix",
        position: { x: 0, y: 0, z: 0 },
        size: 60,
        color: "rgb(59, 130, 246)",
        status: "active",
        connections: ["memory-bank", "disk-array", "network-hub"],
        data: { cpu: 45, health: 98 },
        icon: Cpu,
      },
      {
        id: "memory-bank",
        type: "memory",
        name: "Memory Bank Cluster",
        position: { x: 200, y: -100, z: 50 },
        size: 45,
        color: "rgb(16, 185, 129)",
        status: "active",
        connections: ["cpu-core", "active-processes"],
        data: { memory: 68, health: 95 },
        icon: Database,
      },
      {
        id: "disk-array",
        type: "disk",
        name: "Storage Matrix",
        position: { x: -200, y: 100, z: -30 },
        size: 50,
        color: "rgb(251, 191, 36)",
        status: "warning",
        connections: ["cpu-core", "file-system"],
        data: { diskIO: 78, health: 85 },
        icon: HardDrive,
      },
      {
        id: "network-hub",
        type: "network",
        name: "Network Quantum Hub",
        position: { x: 100, y: 200, z: 100 },
        size: 40,
        color: "rgb(168, 85, 247)",
        status: "active",
        connections: ["cpu-core", "security-shield"],
        data: { networkIO: 35, health: 92 },
        icon: Wifi,
      },
      {
        id: "security-shield",
        type: "security",
        name: "Security Firewall",
        position: { x: -100, y: -200, z: -50 },
        size: 55,
        color: "rgb(239, 68, 68)",
        status: "active",
        connections: ["network-hub", "threat-scanner"],
        data: { security: 99, health: 100 },
        icon: Shield,
      },
      // Process Nodes
      {
        id: "active-processes",
        type: "process",
        name: "Active Process Cloud",
        position: { x: 150, y: 50, z: 150 },
        size: 35,
        color: "rgb(34, 197, 94)",
        status: "active",
        connections: ["memory-bank", "cpu-core"],
        data: { cpu: 23, memory: 45 },
        icon: Activity,
      },
      {
        id: "background-tasks",
        type: "process",
        name: "Background Task Grid",
        position: { x: -150, y: -50, z: 80 },
        size: 30,
        color: "rgb(148, 163, 184)",
        status: "idle",
        connections: ["cpu-core"],
        data: { cpu: 5, memory: 12 },
        icon: Settings,
      },
      // User Interaction Nodes
      {
        id: "user-interface",
        type: "user",
        name: "User Interface Portal",
        position: { x: 0, y: 150, z: -100 },
        size: 40,
        color: "rgb(139, 92, 246)",
        status: "active",
        connections: ["active-processes", "input-handler"],
        data: { health: 97 },
        icon: Monitor,
      },
      {
        id: "input-handler",
        type: "user",
        name: "Input Processing Node",
        position: { x: 80, y: 120, z: -80 },
        size: 25,
        color: "rgb(99, 102, 241)",
        status: "active",
        connections: ["user-interface", "active-processes"],
        data: { health: 95 },
        icon: Users,
      },
    ];

    // Generate random floating data particles
    const dataParticles: MatrixNode[] = Array.from({ length: 20 }, (_, i) => ({
      id: `particle-${i}`,
      type: "process",
      name: `Data Particle ${i + 1}`,
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        z: (Math.random() - 0.5) * 200,
      },
      size: 8 + Math.random() * 12,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      status: Math.random() > 0.8 ? "warning" : "active",
      connections: [],
      data: {
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
      },
      icon: FileText,
    }));

    setNodes([...systemNodes, ...dataParticles]);

    // Generate connections
    const matrixConnections: MatrixConnection[] = [
      {
        id: "cpu-memory",
        from: "cpu-core",
        to: "memory-bank",
        type: "data",
        strength: 0.9,
        direction: "bidirectional",
        activity: 0.8,
      },
      {
        id: "cpu-disk",
        from: "cpu-core",
        to: "disk-array",
        type: "control",
        strength: 0.7,
        direction: "outgoing",
        activity: 0.6,
      },
      {
        id: "network-security",
        from: "network-hub",
        to: "security-shield",
        type: "security",
        strength: 0.95,
        direction: "bidirectional",
        activity: 0.9,
      },
      {
        id: "memory-processes",
        from: "memory-bank",
        to: "active-processes",
        type: "data",
        strength: 0.8,
        direction: "bidirectional",
        activity: 0.7,
      },
      {
        id: "ui-input",
        from: "user-interface",
        to: "input-handler",
        type: "control",
        strength: 0.85,
        direction: "bidirectional",
        activity: 0.6,
      },
    ];

    setConnections(matrixConnections);
  }, []);

  // Animation loop for floating particles and data flow
  const animate = useCallback(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id.startsWith("particle-")) {
          return {
            ...node,
            position: {
              x:
                node.position.x +
                Math.sin(Date.now() * 0.001 + node.position.x * 0.01) * 0.5,
              y:
                node.position.y +
                Math.cos(Date.now() * 0.001 + node.position.y * 0.01) * 0.5,
              z:
                node.position.z +
                Math.sin(Date.now() * 0.001 + node.position.z * 0.01) * 0.3,
            },
          };
        }
        return node;
      }),
    );

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isActive) {
      generateMatrixData();
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, generateMatrixData, animate]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    // Update rotation based on mouse position
    const newRotationY = rotationY + (x - rect.width / 2) * 0.1;
    const newRotationX = rotationX + (y - rect.height / 2) * 0.1;

    setRotationY(newRotationY);
    setRotationX(newRotationX);
  };

  const getNodeColor = (node: MatrixNode) => {
    switch (node.status) {
      case "error":
        return "rgb(239, 68, 68)";
      case "warning":
        return "rgb(251, 191, 36)";
      case "critical":
        return "rgb(220, 38, 127)";
      case "idle":
        return "rgb(148, 163, 184)";
      default:
        return node.color;
    }
  };

  const getConnectionColor = (connection: MatrixConnection) => {
    switch (connection.type) {
      case "data":
        return "rgb(59, 130, 246)";
      case "security":
        return "rgb(239, 68, 68)";
      case "network":
        return "rgb(168, 85, 247)";
      case "control":
        return "rgb(16, 185, 129)";
      default:
        return "rgb(148, 163, 184)";
    }
  };

  const renderNode = (node: MatrixNode) => {
    const transform3D = `
      translateX(${node.position.x * zoomLevel}px) 
      translateY(${node.position.y * zoomLevel}px) 
      translateZ(${node.position.z * zoomLevel}px)
      rotateX(${rotationX}deg) 
      rotateY(${rotationY}deg) 
      rotateZ(${rotationZ}deg)
    `;

    return (
      <motion.div
        key={node.id}
        className="absolute cursor-pointer"
        style={{
          transform: transform3D,
          transformStyle: "preserve-3d",
        }}
        onClick={() => setSelectedNode(node)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <div
          className="relative rounded-full flex items-center justify-center shadow-lg"
          style={{
            width: node.size,
            height: node.size,
            backgroundColor: getNodeColor(node),
            boxShadow: `0 0 20px ${getNodeColor(node)}80`,
          }}
        >
          <node.icon className="text-white" size={node.size * 0.4} />

          {/* Node pulse effect */}
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              backgroundColor: getNodeColor(node),
              opacity: 0.3,
            }}
          />

          {/* Status indicator */}
          <div
            className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              node.status === "active"
                ? "bg-green-500"
                : node.status === "warning"
                  ? "bg-yellow-500"
                  : node.status === "error"
                    ? "bg-red-500"
                    : node.status === "critical"
                      ? "bg-purple-500"
                      : "bg-gray-500"
            }`}
          />
        </div>

        {/* Node label */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs text-white bg-black/50 px-2 py-1 rounded whitespace-nowrap">
          {node.name}
        </div>
      </motion.div>
    );
  };

  const renderConnection = (connection: MatrixConnection) => {
    const fromNode = nodes.find((n) => n.id === connection.from);
    const toNode = nodes.find((n) => n.id === connection.to);

    if (!fromNode || !toNode) return null;

    const color = getConnectionColor(connection);

    return (
      <motion.div
        key={connection.id}
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showConnections ? 0.6 : 0 }}
      >
        <svg
          className="absolute top-0 left-0 w-full h-full"
          style={{ zIndex: -1 }}
        >
          <defs>
            <linearGradient
              id={`gradient-${connection.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={color} stopOpacity={0.8} />
              <stop offset="50%" stopColor={color} stopOpacity={1} />
              <stop offset="100%" stopColor={color} stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <line
            x1={fromNode.position.x * zoomLevel + 400}
            y1={fromNode.position.y * zoomLevel + 300}
            x2={toNode.position.x * zoomLevel + 400}
            y2={toNode.position.y * zoomLevel + 300}
            stroke={`url(#gradient-${connection.id})`}
            strokeWidth={connection.strength * 3}
            strokeDasharray={showDataFlow ? "5,5" : "none"}
          >
            {showDataFlow && (
              <animate
                attributeName="stroke-dashoffset"
                values="0;10"
                dur="1s"
                repeatCount="indefinite"
              />
            )}
          </line>
        </svg>
      </motion.div>
    );
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Matrix Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Digital rain effect */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 text-xs font-mono"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
              animate={{
                y: ["0vh", "100vh"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {String.fromCharCode(0x30a0 + Math.random() * 96)}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Control Panel */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <Card className="glass-card border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-white">
                    Matrix View Mode
                  </CardTitle>
                  <p className="text-sm text-gray-400">
                    التحكم في الواقع الرقمي للنظام
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="border-green-500 text-green-300"
                >
                  {nodes.length} عقدة نشطة
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-500 text-blue-300"
                >
                  {connections.length} اتصال
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExit}
                  className="border-red-500 text-red-300 hover:bg-red-500/20"
                >
                  <EyeOff className="w-4 h-4 mr-2" />
                  إنهاء Matrix
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {/* View Controls */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400">وضع العرض</label>
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value as any)}
                  className="w-full bg-gray-700 text-white rounded px-2 py-1 text-sm"
                >
                  <option value="3d">ثلاثي الأبعاد</option>
                  <option value="2d">ثنائي الأبعاد</option>
                  <option value="hologram">هولوجرام</option>
                </select>
              </div>

              {/* Zoom Control */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  التكبير: {zoomLevel.toFixed(1)}x
                </label>
                <Slider
                  value={[zoomLevel]}
                  onValueChange={([value]) => setZoomLevel(value)}
                  min={0.5}
                  max={3}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Rotation Controls */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  دوران X: {rotationX.toFixed(0)}°
                </label>
                <Slider
                  value={[rotationX]}
                  onValueChange={([value]) => setRotationX(value)}
                  min={-90}
                  max={90}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  دوران Y: {rotationY.toFixed(0)}°
                </label>
                <Slider
                  value={[rotationY]}
                  onValueChange={([value]) => setRotationY(value)}
                  min={-180}
                  max={180}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Density Control */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  كثافة: {(matrixDensity * 100).toFixed(0)}%
                </label>
                <Slider
                  value={[matrixDensity]}
                  onValueChange={([value]) => setMatrixDensity(value)}
                  min={0.1}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Reality Level */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400">
                  مستوى الواقع: {(realityLevel * 100).toFixed(0)}%
                </label>
                <Slider
                  value={[realityLevel]}
                  onValueChange={([value]) => setRealityLevel(value)}
                  min={0}
                  max={1}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Toggle Controls */}
            <div className="flex gap-4 mt-4">
              <Button
                size="sm"
                variant={showConnections ? "default" : "outline"}
                onClick={() => setShowConnections(!showConnections)}
              >
                <Network className="w-4 h-4 mr-2" />
                الاتصالات
              </Button>
              <Button
                size="sm"
                variant={showDataFlow ? "default" : "outline"}
                onClick={() => setShowDataFlow(!showDataFlow)}
              >
                <Activity className="w-4 h-4 mr-2" />
                تدفق البيانات
              </Button>
              <Button size="sm" onClick={generateMatrixData}>
                <RotateCw className="w-4 h-4 mr-2" />
                إعادة توليد
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3D Matrix Space */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Matrix Container */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
          }}
        >
          {/* Render Connections */}
          {showConnections && connections.map(renderConnection)}

          {/* Render Nodes */}
          {nodes.map(renderNode)}
        </div>
      </div>

      {/* Selected Node Info */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-20 right-4 w-80"
          >
            <Card className="glass-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: getNodeColor(selectedNode) }}
                    >
                      <selectedNode.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white">
                        {selectedNode.name}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="border-purple-500 text-purple-300"
                      >
                        {selectedNode.type}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedNode(null)}
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Status */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">الحالة</p>
                  <Badge
                    className={`${
                      selectedNode.status === "active"
                        ? "bg-green-500"
                        : selectedNode.status === "warning"
                          ? "bg-yellow-500"
                          : selectedNode.status === "error"
                            ? "bg-red-500"
                            : "bg-gray-500"
                    }`}
                  >
                    {selectedNode.status}
                  </Badge>
                </div>

                {/* Position */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">
                    الموقع في المصفوفة
                  </p>
                  <div className="text-sm text-white font-mono">
                    X: {selectedNode.position.x.toFixed(0)}, Y:{" "}
                    {selectedNode.position.y.toFixed(0)}, Z:{" "}
                    {selectedNode.position.z.toFixed(0)}
                  </div>
                </div>

                {/* Data Metrics */}
                {selectedNode.data && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-400">المقاييس</p>
                    {Object.entries(selectedNode.data).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">{key}</span>
                          <span className="text-white">{value}%</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Connections */}
                <div>
                  <p className="text-sm text-gray-400 mb-2">
                    الاتصالات ({selectedNode.connections.length})
                  </p>
                  <div className="space-y-1">
                    {selectedNode.connections.slice(0, 3).map((connId) => {
                      const connectedNode = nodes.find((n) => n.id === connId);
                      return connectedNode ? (
                        <div
                          key={connId}
                          className="text-xs text-gray-300 flex items-center gap-2"
                        >
                          <connectedNode.icon className="w-3 h-3" />
                          {connectedNode.name}
                        </div>
                      ) : null;
                    })}
                    {selectedNode.connections.length > 3 && (
                      <p className="text-xs text-gray-500">
                        +{selectedNode.connections.length - 3} اتصالات أخرى
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix Stats */}
      <div className="absolute bottom-4 left-4 right-4">
        <Card className="glass-card border-0">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-white">
                  {nodes.filter((n) => n.status === "active").length}
                </p>
                <p className="text-xs text-gray-400">عقد نشطة</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white">
                  {connections.length}
                </p>
                <p className="text-xs text-gray-400">اتصالات حية</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white">
                  {(Math.random() * 1000).toFixed(0)} GB/s
                </p>
                <p className="text-xs text-gray-400">تدفق البيانات</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white">
                  {(realityLevel * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-gray-400">مستوى الواقع</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white">
                  {viewMode.toUpperCase()}
                </p>
                <p className="text-xs text-gray-400">وضع العرض</p>
              </div>
              <div>
                <p className="text-lg font-bold text-white">STABLE</p>
                <p className="text-xs text-gray-400">حالة المصفوفة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MatrixViewMode;

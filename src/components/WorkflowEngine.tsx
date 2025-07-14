import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Workflow,
  Play,
  Pause,
  Square,
  Plus,
  Edit,
  Trash2,
  Clock,
  Calendar,
  Settings,
  CheckCircle,
  XCircle,
  RotateCcw,
  Zap,
  Bot,
  Shield,
  HardDrive,
  Cpu,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WorkflowStep {
  id: string;
  toolId: string;
  toolName: string;
  action: string;
  parameters: Record<string, any>;
  icon: React.ElementType;
  estimatedTime: number; // in seconds
  status: "pending" | "running" | "completed" | "failed" | "skipped";
}

interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  category: "maintenance" | "security" | "performance" | "custom";
  schedule: {
    type: "manual" | "daily" | "weekly" | "monthly" | "custom";
    time?: string;
    frequency?: number;
  };
  steps: WorkflowStep[];
  conditions?: {
    runOnlyIf?: string[];
    skipIf?: string[];
    minSystemHealth?: number;
  };
  isActive: boolean;
  lastRun?: Date;
  nextRun?: Date;
  successRate: number;
  totalRuns: number;
}

interface WorkflowEngineProps {
  onClose?: () => void;
}

const WorkflowEngine: React.FC<WorkflowEngineProps> = ({ onClose }) => {
  const [workflows, setWorkflows] = useState<WorkflowDefinition[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] =
    useState<WorkflowDefinition | null>(null);
  const [executionProgress, setExecutionProgress] = useState<
    Record<string, number>
  >({});

  // Predefined workflow templates
  const workflowTemplates: Partial<WorkflowDefinition>[] = [
    {
      name: "روتين الصباح الذكي",
      description: "تحسين وتنظيف شامل لبداية يوم منتج",
      category: "maintenance",
      schedule: { type: "daily", time: "09:00" },
      steps: [
        {
          id: "1",
          toolId: "health-ai-center",
          toolName: "مركز الصحة الذكي",
          action: "systemScan",
          parameters: { deep: false, quick: true },
          icon: Bot,
          estimatedTime: 30,
          status: "pending",
        },
        {
          id: "2",
          toolId: "hyper-clean-engine",
          toolName: "محرك التنظيف الفائق",
          action: "quickClean",
          parameters: { intensity: "medium" },
          icon: Zap,
          estimatedTime: 45,
          status: "pending",
        },
        {
          id: "3",
          toolId: "performance-reactor",
          toolName: "مفاعل الأداء",
          action: "optimize",
          parameters: { mode: "balanced" },
          icon: Cpu,
          estimatedTime: 20,
          status: "pending",
        },
      ],
    },
    {
      name: "فحص الأمان الأسبوعي",
      description: "فحص شامل للأمان وا��حماية من التهديدات",
      category: "security",
      schedule: { type: "weekly", time: "20:00" },
      steps: [
        {
          id: "1",
          toolId: "security-vault",
          toolName: "خزنة الأمان",
          action: "deepScan",
          parameters: { scanLevel: "comprehensive" },
          icon: Shield,
          estimatedTime: 120,
          status: "pending",
        },
        {
          id: "2",
          toolId: "security-vault",
          toolName: "خزنة الأمان",
          action: "updateDefinitions",
          parameters: {},
          icon: Shield,
          estimatedTime: 30,
          status: "pending",
        },
      ],
    },
    {
      name: "تحسين الأداء العميق",
      description: "تحسين شامل لأقصى أداء ممكن",
      category: "performance",
      schedule: { type: "weekly", time: "02:00" },
      steps: [
        {
          id: "1",
          toolId: "deep-analysis",
          toolName: "التحليل العميق",
          action: "analyze",
          parameters: { depth: "maximum" },
          icon: HardDrive,
          estimatedTime: 180,
          status: "pending",
        },
        {
          id: "2",
          toolId: "performance-reactor",
          toolName: "مفاعل الأداء",
          action: "turboMode",
          parameters: { duration: 3600 },
          icon: Cpu,
          estimatedTime: 60,
          status: "pending",
        },
      ],
    },
  ];

  useEffect(() => {
    // Initialize with template workflows
    const initialWorkflows = workflowTemplates.map((template, index) => ({
      id: `workflow-${index + 1}`,
      isActive: index === 0, // First workflow is active
      lastRun:
        index === 0 ? new Date(Date.now() - 24 * 60 * 60 * 1000) : undefined,
      nextRun: new Date(Date.now() + (index + 1) * 60 * 60 * 1000),
      successRate: 95 + Math.random() * 5,
      totalRuns: Math.floor(Math.random() * 50) + 10,
      conditions: {
        runOnlyIf: ["systemLoad < 80%"],
        skipIf: ["userActive", "batteryLow"],
        minSystemHealth: 85,
      },
      ...template,
    })) as WorkflowDefinition[];

    setWorkflows(initialWorkflows);
  }, []);

  const executeWorkflow = async (workflowId: string) => {
    const workflow = workflows.find((w) => w.id === workflowId);
    if (!workflow) return;

    setActiveWorkflow(workflowId);
    setExecutionProgress({ [workflowId]: 0 });

    // Simulate workflow execution
    for (let i = 0; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];

      // Update step status to running
      setWorkflows((prev) =>
        prev.map((w) =>
          w.id === workflowId
            ? {
                ...w,
                steps: w.steps.map((s) =>
                  s.id === step.id ? { ...s, status: "running" as const } : s,
                ),
              }
            : w,
        ),
      );

      // Simulate step execution time
      const stepDuration = step.estimatedTime * 1000;
      const progressInterval = setInterval(() => {
        setExecutionProgress((prev) => ({
          ...prev,
          [workflowId]: ((i + 1) / workflow.steps.length) * 100,
        }));
      }, 100);

      await new Promise((resolve) => setTimeout(resolve, stepDuration));
      clearInterval(progressInterval);

      // Mark step as completed (95% success rate)
      const success = Math.random() > 0.05;
      setWorkflows((prev) =>
        prev.map((w) =>
          w.id === workflowId
            ? {
                ...w,
                steps: w.steps.map((s) =>
                  s.id === step.id
                    ? {
                        ...s,
                        status: success
                          ? ("completed" as const)
                          : ("failed" as const),
                      }
                    : s,
                ),
              }
            : w,
        ),
      );

      if (!success) break; // Stop on failure
    }

    setActiveWorkflow(null);
    setExecutionProgress((prev) => ({ ...prev, [workflowId]: 100 }));

    // Update workflow stats
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === workflowId
          ? {
              ...w,
              lastRun: new Date(),
              totalRuns: w.totalRuns + 1,
              successRate:
                (w.successRate * w.totalRuns +
                  (workflow.steps.every((s) => s.status === "completed")
                    ? 100
                    : 0)) /
                (w.totalRuns + 1),
            }
          : w,
      ),
    );
  };

  const toggleWorkflow = (workflowId: string) => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === workflowId ? { ...w, isActive: !w.isActive } : w,
      ),
    );
  };

  const duplicateWorkflow = (workflow: WorkflowDefinition) => {
    const newWorkflow: WorkflowDefinition = {
      ...workflow,
      id: `workflow-${Date.now()}`,
      name: `${workflow.name} (نسخة)`,
      isActive: false,
      lastRun: undefined,
      totalRuns: 0,
      successRate: 0,
    };
    setWorkflows((prev) => [...prev, newWorkflow]);
  };

  const deleteWorkflow = (workflowId: string) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== workflowId));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "maintenance":
        return "from-blue-500 to-cyan-500";
      case "security":
        return "from-red-500 to-pink-500";
      case "performance":
        return "from-green-500 to-emerald-500";
      case "custom":
        return "from-purple-500 to-indigo-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "failed":
        return XCircle;
      case "running":
        return RotateCcw;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400";
      case "failed":
        return "text-red-400";
      case "running":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
              <Workflow className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Workflow Engine</h1>
              <p className="text-gray-400">
                نظام تشغيل الأدوات التلقائي والمجدول
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              إنشاء سير عمل جديد
            </Button>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                إغلاق
              </Button>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">إجمالي السير</p>
                  <p className="text-2xl font-bold text-white">
                    {workflows.length}
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">السير النشطة</p>
                  <p className="text-2xl font-bold text-white">
                    {workflows.filter((w) => w.isActive).length}
                  </p>
                </div>
                <Play className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">معدل النجاح</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round(
                      workflows.reduce((sum, w) => sum + w.successRate, 0) /
                        workflows.length,
                    )}
                    %
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">التشغيل التلقائي</p>
                  <p className="text-2xl font-bold text-white">24/7</p>
                </div>
                <Bot className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflows Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {workflows.map((workflow) => (
            <motion.div
              key={workflow.id}
              layout
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <Card className="glass-card border-0 h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-r ${getCategoryColor(workflow.category)}`}
                      >
                        <Workflow className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">
                          {workflow.name}
                        </CardTitle>
                        <p className="text-sm text-gray-400">
                          {workflow.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge
                            variant="outline"
                            className={`border-purple-500 text-purple-300`}
                          >
                            {workflow.category}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`${workflow.isActive ? "border-green-500 text-green-300" : "border-gray-500 text-gray-400"}`}
                          >
                            {workflow.isActive ? "نشط" : "متوقف"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Execution Progress */}
                  {executionProgress[workflow.id] !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">جاري التنفيذ...</span>
                        <span className="text-gray-400">
                          {Math.round(executionProgress[workflow.id])}%
                        </span>
                      </div>
                      <Progress
                        value={executionProgress[workflow.id]}
                        className="h-2"
                      />
                    </div>
                  )}

                  {/* Steps */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-semibold text-white">
                      خطوات السير ({workflow.steps.length})
                    </h4>
                    {workflow.steps.slice(0, 3).map((step, index) => {
                      const StatusIcon = getStatusIcon(step.status);
                      return (
                        <div
                          key={step.id}
                          className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/30"
                        >
                          <StatusIcon
                            className={`w-4 h-4 ${getStatusColor(step.status)}`}
                          />
                          <step.icon className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-gray-300 flex-1">
                            {step.toolName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {step.estimatedTime}ث
                          </span>
                        </div>
                      );
                    })}
                    {workflow.steps.length > 3 && (
                      <p className="text-xs text-gray-500 text-center">
                        +{workflow.steps.length - 3} خطوات أخرى
                      </p>
                    )}
                  </div>

                  {/* Schedule & Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-400">الجدولة</p>
                      <p className="text-white">
                        {workflow.schedule.type === "daily"
                          ? "يومي"
                          : workflow.schedule.type === "weekly"
                            ? "أسبوعي"
                            : "يدوي"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">معدل النجاح</p>
                      <p className="text-white">
                        {Math.round(workflow.successRate)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">آخر تشغيل</p>
                      <p className="text-white">
                        {workflow.lastRun
                          ? workflow.lastRun.toLocaleDateString("ar-SA")
                          : "لم يتم التشغيل"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">إجمالي التشغيلات</p>
                      <p className="text-white">{workflow.totalRuns}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => executeWorkflow(workflow.id)}
                      disabled={activeWorkflow === workflow.id}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {activeWorkflow === workflow.id ? (
                        <>
                          <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                          قيد التنفيذ
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          تشغيل
                        </>
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleWorkflow(workflow.id)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      {workflow.isActive ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedWorkflow(workflow)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => duplicateWorkflow(workflow)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteWorkflow(workflow.id)}
                      className="border-red-600 text-red-300 hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowEngine;

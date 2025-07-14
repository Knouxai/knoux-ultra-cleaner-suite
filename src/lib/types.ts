// Knoux CleanMaster Ultra™ Type Definitions

export interface CleaningTask {
  id: string;
  name: string;
  description: string;
  category: "temporary" | "cache" | "registry" | "privacy" | "performance";
  priority: "low" | "medium" | "high" | "critical";
  estimatedSize: string;
  estimatedTime: number; // in seconds
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  progress: number; // 0-100
}

export interface AnalysisResult {
  totalIssues: number;
  criticalIssues: number;
  warningIssues: number;
  infoIssues: number;
  categories: {
    performance: number;
    security: number;
    privacy: number;
    storage: number;
  };
  recommendations: string[];
}

export interface SecurityThreat {
  id: string;
  type: "malware" | "spyware" | "adware" | "vulnerability" | "privacy";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  location: string;
  remediation: string;
  detected: Date;
}

export interface DriverInfo {
  name: string;
  version: string;
  date: Date;
  vendor: string;
  status: "up-to-date" | "outdated" | "missing" | "corrupted";
  importance: "critical" | "important" | "optional";
  size: string;
  compatibility: "compatible" | "partially-compatible" | "incompatible";
}

export interface SystemProcess {
  pid: number;
  name: string;
  cpu: number;
  memory: string;
  status: "running" | "sleeping" | "stopped" | "zombie";
  type: "system" | "user" | "service" | "unknown";
  description?: string;
}

export interface PerformanceOptimization {
  id: string;
  name: string;
  category: "startup" | "memory" | "disk" | "network" | "cpu";
  impact: "low" | "medium" | "high";
  description: string;
  beforeValue: string;
  afterValue: string;
  improvementPercentage: number;
}

export interface CleaningReport {
  date: Date;
  duration: number; // in seconds
  filesProcessed: number;
  filesDeleted: number;
  spaceSaved: string;
  categories: {
    [key: string]: {
      files: number;
      size: string;
    };
  };
  errors: string[];
}

export interface BlackDiamondTool {
  id: string;
  name: string;
  description: string;
  category: "advanced" | "experimental" | "dangerous" | "recovery";
  riskLevel: "low" | "medium" | "high" | "extreme";
  features: string[];
  requirements: string[];
  warnings: string[];
}

export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  language: "ar" | "en";
  autoClean: boolean;
  autoCleanSchedule: "daily" | "weekly" | "monthly";
  notifications: boolean;
  soundEffects: boolean;
  animations: boolean;
  advancedMode: boolean;
  confirmDangerous: boolean;
}

export interface SystemInfo {
  os: string;
  version: string;
  architecture: string;
  processor: string;
  totalMemory: string;
  availableMemory: string;
  diskSpace: {
    total: string;
    used: string;
    free: string;
  };
  uptime: string;
  lastBoot: Date;
}

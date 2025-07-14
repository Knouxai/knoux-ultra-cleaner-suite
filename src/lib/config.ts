// Knoux CleanMaster Ultra™ Configuration
export interface AppConfig {
  name: string;
  version: string;
  environment: "development" | "production" | "staging";
  theme: {
    default: "light" | "dark";
    glassOpacity: number;
    neonIntensity: number;
  };
  performance: {
    autoCleanEnabled: boolean;
    autoCleanInterval: "daily" | "weekly" | "monthly";
    turboModeAvailable: boolean;
  };
  security: {
    blackDiamondEnabled: boolean;
    securityLevel: "low" | "medium" | "high";
  };
  features: {
    experimentalFeatures: boolean;
    aiFeatures: boolean;
    quantumOptimizer: boolean;
  };
  analytics: {
    enabled: boolean;
    errorReporting: boolean;
  };
}

export const defaultConfig: AppConfig = {
  name: import.meta.env.VITE_APP_NAME || "Knoux CleanMaster Ultra™",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
  environment: import.meta.env.VITE_APP_ENVIRONMENT || "development",
  theme: {
    default: (import.meta.env.VITE_DEFAULT_THEME as "light" | "dark") || "dark",
    glassOpacity: parseFloat(import.meta.env.VITE_GLASS_OPACITY || "0.2"),
    neonIntensity: parseFloat(import.meta.env.VITE_NEON_INTENSITY || "0.6"),
  },
  performance: {
    autoCleanEnabled: import.meta.env.VITE_AUTO_CLEAN_ENABLED === "true",
    autoCleanInterval:
      (import.meta.env.VITE_AUTO_CLEAN_INTERVAL as
        | "daily"
        | "weekly"
        | "monthly") || "weekly",
    turboModeAvailable: import.meta.env.VITE_TURBO_MODE_AVAILABLE !== "false",
  },
  security: {
    blackDiamondEnabled: import.meta.env.VITE_BLACK_DIAMOND_ENABLED !== "false",
    securityLevel: (import.meta.env.VITE_SECURITY_LEVEL as any) || "high",
  },
  features: {
    experimentalFeatures: import.meta.env.VITE_EXPERIMENTAL_FEATURES === "true",
    aiFeatures: import.meta.env.VITE_AI_FEATURES !== "false",
    quantumOptimizer: import.meta.env.VITE_QUANTUM_OPTIMIZER === "true",
  },
  analytics: {
    enabled: import.meta.env.VITE_ANALYTICS_ENABLED === "true",
    errorReporting: import.meta.env.VITE_ERROR_REPORTING !== "false",
  },
};

export const getConfig = (): AppConfig => defaultConfig;

// System Health Monitoring
export interface SystemHealth {
  cpu: number;
  memory: number;
  storage: number;
  battery: number;
  network: number;
  overall: number;
}

export const getSystemHealth = (): SystemHealth => {
  // Simulated system data - in real app this would come from system APIs
  return {
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
    storage: Math.floor(Math.random() * 100),
    battery: Math.floor(Math.random() * 100),
    network: Math.floor(Math.random() * 100),
    overall: 98, // Fixed high value for demo
  };
};

// Performance Metrics
export interface PerformanceMetrics {
  cleanupScore: number;
  optimizationLevel: number;
  securityRating: number;
  lastCleanup: Date | null;
  totalFilesProcessed: number;
  spaceSaved: string;
}

export const getPerformanceMetrics = (): PerformanceMetrics => {
  return {
    cleanupScore: 98,
    optimizationLevel: 95,
    securityRating: 99,
    lastCleanup: new Date(),
    totalFilesProcessed: 15234,
    spaceSaved: "2.4 GB",
  };
};

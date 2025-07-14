// Knoux CleanMaster Ultra™ Diagnostics & Reporting System

import { getConfig, getSystemHealth, getPerformanceMetrics } from "./config";

interface DiagnosticReport {
  timestamp: Date;
  appInfo: {
    name: string;
    version: string;
    environment: string;
  };
  systemHealth: {
    cpu: number;
    memory: number;
    storage: number;
    battery: number;
    network: number;
    overall: number;
  };
  performance: {
    cleanupScore: number;
    optimizationLevel: number;
    securityRating: number;
    spaceSaved: string;
  };
  features: {
    enabled: string[];
    disabled: string[];
  };
  errors: string[];
  warnings: string[];
  recommendations: string[];
}

export class KnouxDiagnostics {
  private static instance: KnouxDiagnostics;

  static getInstance(): KnouxDiagnostics {
    if (!KnouxDiagnostics.instance) {
      KnouxDiagnostics.instance = new KnouxDiagnostics();
    }
    return KnouxDiagnostics.instance;
  }

  generateReport(): DiagnosticReport {
    const config = getConfig();
    const systemHealth = getSystemHealth();
    const performance = getPerformanceMetrics();

    const enabledFeatures = [];
    const disabledFeatures = [];

    if (config.features.aiFeatures) enabledFeatures.push("AI Features");
    else disabledFeatures.push("AI Features");

    if (config.features.experimentalFeatures)
      enabledFeatures.push("Experimental Features");
    else disabledFeatures.push("Experimental Features");

    if (config.features.quantumOptimizer)
      enabledFeatures.push("Quantum Optimizer");
    else disabledFeatures.push("Quantum Optimizer");

    if (config.security.blackDiamondEnabled)
      enabledFeatures.push("BlackDiamond™ Access");
    else disabledFeatures.push("BlackDiamond™ Access");

    if (config.performance.autoCleanEnabled) enabledFeatures.push("Auto Clean");
    else disabledFeatures.push("Auto Clean");

    const errors: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Health-based diagnostics
    if (systemHealth.cpu > 80) {
      warnings.push(`CPU usage high: ${systemHealth.cpu}%`);
      recommendations.push("Consider closing unnecessary applications");
    }

    if (systemHealth.memory > 85) {
      warnings.push(`Memory usage high: ${systemHealth.memory}%`);
      recommendations.push("Enable RAM Crystalizer™ for optimization");
    }

    if (systemHealth.storage > 85) {
      errors.push(
        `Storage critically low: ${100 - systemHealth.storage}% free`,
      );
      recommendations.push("Run Hyper Clean Engine immediately");
    } else if (systemHealth.storage > 75) {
      warnings.push(`Storage getting low: ${100 - systemHealth.storage}% free`);
      recommendations.push("Consider running cleanup soon");
    }

    if (systemHealth.battery < 20) {
      warnings.push(`Battery low: ${systemHealth.battery}%`);
      recommendations.push("Connect to power source for optimal performance");
    }

    // Configuration-based recommendations
    if (!config.performance.autoCleanEnabled) {
      recommendations.push("Enable auto-clean for better maintenance");
    }

    if (config.environment === "development") {
      warnings.push("Running in development mode");
    }

    if (!config.analytics.errorReporting) {
      recommendations.push("Enable error reporting for better support");
    }

    return {
      timestamp: new Date(),
      appInfo: {
        name: config.name,
        version: config.version,
        environment: config.environment,
      },
      systemHealth,
      performance: {
        cleanupScore: performance.cleanupScore,
        optimizationLevel: performance.optimizationLevel,
        securityRating: performance.securityRating,
        spaceSaved: performance.spaceSaved,
      },
      features: {
        enabled: enabledFeatures,
        disabled: disabledFeatures,
      },
      errors,
      warnings,
      recommendations,
    };
  }

  printReport(): void {
    const report = this.generateReport();

    console.group("🔬 Knoux CleanMaster Ultra™ - تقرير التشخيص الشامل");

    // Header
    console.log(
      "%c═══════════════════════════════════════════════════════════════",
      "color: #8b5cf6; font-weight: bold;",
    );
    console.log(
      "%c🛡️ KNOUX CLEANMASTER ULTRA™ DIAGNOSTIC REPORT",
      "color: #8b5cf6; font-size: 16px; font-weight: bold;",
    );
    console.log(
      "%c═══════════════════════════════════════════════════════════════",
      "color: #8b5cf6; font-weight: bold;",
    );

    // App Info
    console.group("📱 معلومات التطبيق - Application Info");
    console.log(`📦 Name: ${report.appInfo.name}`);
    console.log(`🏷️ Version: ${report.appInfo.version}`);
    console.log(`🌍 Environment: ${report.appInfo.environment}`);
    console.log(`⏰ Report Time: ${report.timestamp.toLocaleString("ar-SA")}`);
    console.groupEnd();

    // System Health
    console.group("💗 حالة النظام - System Health");
    console.log(
      `🖥️ CPU: ${report.systemHealth.cpu}%`,
      this.getHealthColor(report.systemHealth.cpu),
    );
    console.log(
      `🧠 Memory: ${report.systemHealth.memory}%`,
      this.getHealthColor(report.systemHealth.memory),
    );
    console.log(
      `💾 Storage: ${report.systemHealth.storage}%`,
      this.getHealthColor(report.systemHealth.storage),
    );
    console.log(
      `🔋 Battery: ${report.systemHealth.battery}%`,
      this.getHealthColor(report.systemHealth.battery, true),
    );
    console.log(
      `🌐 Network: ${report.systemHealth.network}%`,
      this.getHealthColor(report.systemHealth.network, true),
    );
    console.log(
      `⭐ Overall Health: ${report.systemHealth.overall}%`,
      this.getHealthColor(report.systemHealth.overall, true),
    );
    console.groupEnd();

    // Performance
    console.group("⚡ الأداء - Performance Metrics");
    console.log(`🧹 Cleanup Score: ${report.performance.cleanupScore}%`);
    console.log(
      `🚀 Optimization Level: ${report.performance.optimizationLevel}%`,
    );
    console.log(`����️ Security Rating: ${report.performance.securityRating}%`);
    console.log(`💾 Space Saved: ${report.performance.spaceSaved}`);
    console.groupEnd();

    // Features
    console.group("🎛️ الميزات - Features Status");
    console.log("%c✅ Enabled Features:", "color: #10b981; font-weight: bold;");
    report.features.enabled.forEach((feature) => {
      console.log(`  ✅ ${feature}`);
    });
    console.log(
      "%c❌ Disabled Features:",
      "color: #f59e0b; font-weight: bold;",
    );
    report.features.disabled.forEach((feature) => {
      console.log(`  ❌ ${feature}`);
    });
    console.groupEnd();

    // Issues
    if (report.errors.length > 0) {
      console.group("❌ أخطاء - Errors");
      report.errors.forEach((error) => {
        console.error(`🚨 ${error}`);
      });
      console.groupEnd();
    }

    if (report.warnings.length > 0) {
      console.group("⚠️ تحذيرات - Warnings");
      report.warnings.forEach((warning) => {
        console.warn(`⚠️ ${warning}`);
      });
      console.groupEnd();
    }

    // Recommendations
    if (report.recommendations.length > 0) {
      console.group("💡 توصيات - Recommendations");
      report.recommendations.forEach((recommendation) => {
        console.log(`💡 ${recommendation}`);
      });
      console.groupEnd();
    }

    // Footer
    console.log(
      "%c═══════════════════════════════════════════════════════════════",
      "color: #8b5cf6; font-weight: bold;",
    );
    console.log(
      "%c🔬 تم إنتاج هذا التقرير بواسطة نظام التشخيص المتقدم",
      "color: #8b5cf6; font-style: italic;",
    );
    console.log(
      "%c📊 لمزيد من التفاصيل، تفضل بزيارة قسم Deep Analysis & Logs",
      "color: #6b7280;",
    );
    console.log(
      "%c═════��═════════════════════════════════════════════════════════",
      "color: #8b5cf6; font-weight: bold;",
    );

    console.groupEnd();
  }

  private getHealthColor(value: number, inverse: boolean = false): string {
    if (inverse) {
      if (value >= 80) return "color: #10b981"; // green
      if (value >= 60) return "color: #f59e0b"; // yellow
      return "color: #ef4444"; // red
    } else {
      if (value <= 60) return "color: #10b981"; // green
      if (value <= 80) return "color: #f59e0b"; // yellow
      return "color: #ef4444"; // red
    }
  }

  exportReport(): string {
    const report = this.generateReport();
    return JSON.stringify(report, null, 2);
  }

  // Auto-run diagnostics on app start
  static runStartupDiagnostics(): void {
    const diagnostics = KnouxDiagnostics.getInstance();

    setTimeout(() => {
      console.log(
        "%c🚀 جاري تشغيل التشخيص التلقائي...",
        "color: #8b5cf6; font-weight: bold;",
      );
      diagnostics.printReport();
    }, 2000);
  }
}

// Export the diagnostics instance
// Emergency cleanup function for low storage
export const emergencyCleanup = (): Promise<{
  spaceFreed: string;
  filesRemoved: number;
  success: boolean;
}> => {
  return new Promise((resolve) => {
    // Simulate emergency cleanup process
    console.log("🚨 Emergency cleanup initiated...");

    setTimeout(() => {
      const spaceFreed = (Math.random() * 5 + 1).toFixed(1); // 1-6 GB
      const filesRemoved = Math.floor(Math.random() * 10000 + 5000); // 5000-15000 files

      console.log(
        `✅ Emergency cleanup completed: ${spaceFreed} GB freed, ${filesRemoved} files removed`,
      );

      resolve({
        spaceFreed: `${spaceFreed} GB`,
        filesRemoved,
        success: true,
      });
    }, 2000);
  });
};

export default KnouxDiagnostics;

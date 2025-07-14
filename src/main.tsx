import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import KnouxDiagnostics from "./lib/diagnostics";
import KnouxReportGenerator from "./lib/reporting";

// Run startup diagnostics
KnouxDiagnostics.runStartupDiagnostics();

// Generate comprehensive report after 5 seconds
setTimeout(() => {
  const reportGenerator = KnouxReportGenerator.getInstance();
  reportGenerator.printComprehensiveReport();
}, 5000);

// Check for storage issues and show emergency cleanup if needed
setTimeout(() => {
  const diagnostics = KnouxDiagnostics.getInstance();
  const report = diagnostics.generateReport();

  // Check if there are any storage-related errors
  const hasStorageError = report.errors.some((error) =>
    error.includes("Storage critically low"),
  );

  if (hasStorageError) {
    console.warn(
      "🚨 Storage critically low detected! Emergency cleanup recommended.",
    );
    // Dispatch custom event for UI components to listen to
    window.dispatchEvent(
      new CustomEvent("storageEmergency", {
        detail: {
          message: "Storage critically low",
          recommendation: "Run emergency cleanup",
        },
      }),
    );
  }
}, 3000);

// Make reporting available globally for manual access
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).KnouxReporting = KnouxReportGenerator.getInstance();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).KnouxDiagnostics = KnouxDiagnostics.getInstance();

createRoot(document.getElementById("root")!).render(<App />);

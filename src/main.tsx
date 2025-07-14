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

// Make reporting available globally for manual access
(window as any).KnouxReporting = KnouxReportGenerator.getInstance();

createRoot(document.getElementById("root")!).render(<App />);

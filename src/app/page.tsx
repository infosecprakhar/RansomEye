// src/app/page.tsx
"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { ExecutionPanel } from "@/components/dashboard/execution-panel";
import { LogDisplay } from "@/components/dashboard/log-display";
import { AnalysisReport } from "@/components/dashboard/analysis-report";
import { FileText, Database, Network } from "lucide-react";
import { handleAnalyzeSampleAction, type AnalysisData } from "./actions";
import type { AnalyzeRansomwareBehaviorOutput } from "@/ai/flows/analyze-ransomware-behavior";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileLogs, setFileLogs] = useState<string | null>(null);
  const [registryLogs, setRegistryLogs] = useState<string | null>(null);
  const [networkLogs, setNetworkLogs] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeRansomwareBehaviorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const triggerAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    setFileLogs(null);
    setRegistryLogs(null);
    setNetworkLogs(null);
    setAnalysisResult(null);

    toast({
      title: "Analysis Started",
      description: "The ransomware sample analysis is now in progress.",
    });

    const result: AnalysisData = await handleAnalyzeSampleAction();

    if (result.error) {
      setError(result.error);
      toast({
        title: "Analysis Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
       toast({
        title: "Analysis Complete",
        description: "Logs and behavioral report are now available.",
      });
    }
    
    setFileLogs(result.logs.fileSystemLogs);
    setRegistryLogs(result.logs.registryLogs);
    setNetworkLogs(result.logs.networkLogs);
    setAnalysisResult(result.analysis);
    setIsLoading(false);
  };

  return (
    <AppLayout headerTitle="Ransomware Analysis Dashboard">
      <div className="space-y-6">
        <ExecutionPanel onAnalyze={triggerAnalysis} isLoading={isLoading} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LogDisplay
            title="File System Activity"
            description="Changes made to files and directories."
            logs={fileLogs}
            icon={FileText}
            isLoading={isLoading && !fileLogs} // Show skeleton only if logs not yet loaded during loading
          />
          <LogDisplay
            title="Registry Modifications"
            description="Alterations to Windows Registry keys and values."
            logs={registryLogs}
            icon={Database}
            isLoading={isLoading && !registryLogs}
          />
          <LogDisplay
            title="Network Traffic"
            description="Captured network connections and data transmissions."
            logs={networkLogs}
            icon={Network}
            isLoading={isLoading && !networkLogs}
          />
        </div>

        <AnalysisReport report={analysisResult} isLoading={isLoading && !analysisResult && !error} error={error} />
      </div>
    </AppLayout>
  );
}

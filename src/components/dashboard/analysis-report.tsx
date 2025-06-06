// src/components/dashboard/analysis-report.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, BrainCircuit, CheckCircle2 } from "lucide-react";
import type { AnalyzeRansomwareBehaviorOutput } from "@/ai/flows/analyze-ransomware-behavior";

interface AnalysisReportProps {
  report: AnalyzeRansomwareBehaviorOutput | null;
  isLoading: boolean;
  error?: string | null;
}

export function AnalysisReport({ report, isLoading, error }: AnalysisReportProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BrainCircuit className="mr-2 h-6 w-6 text-primary" />
          Behavioral Analysis Report
        </CardTitle>
        <CardDescription>
          AI-generated summary of observed ransomware behaviors based on collected logs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-full" />
          </div>
        )}
        {!isLoading && error && (
          <div className="flex items-start p-4 rounded-md bg-destructive/10 border border-destructive text-destructive">
            <AlertTriangle className="h-5 w-5 mr-3 mt-0.5" />
            <div>
              <h5 className="font-medium">Analysis Failed</h5>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
        {!isLoading && !error && report && (
          <div className="space-y-4">
            <div className="flex items-center text-green-500">
              <CheckCircle2 className="h-5 w-5 mr-2 text-accent" />
              <p className="font-medium text-foreground">Analysis Complete</p>
            </div>
            <div className="p-4 rounded-md border border-border bg-muted/30">
              <h4 className="font-semibold text-foreground mb-2">Key Findings:</h4>
              <p className="text-sm text-foreground whitespace-pre-line">{report.summary}</p>
            </div>
          </div>
        )}
        {!isLoading && !error && !report && (
           <p className="text-sm text-muted-foreground text-center py-10">No analysis report available. Run analysis to generate a report.</p>
        )}
      </CardContent>
    </Card>
  );
}

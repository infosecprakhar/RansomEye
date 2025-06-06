// src/components/dashboard/execution-panel.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Loader2 } from "lucide-react";

interface ExecutionPanelProps {
  onAnalyze: () => void;
  isLoading: boolean;
}

export function ExecutionPanel({ onAnalyze, isLoading }: ExecutionPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Play className="mr-2 h-6 w-6 text-primary" />
          Sandbox Execution
        </CardTitle>
        <CardDescription>
          Initiate the analysis of a ransomware sample in the isolated sandbox environment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Click the button below to simulate the execution of a sample and generate behavior logs.
          The system will then use AI to analyze these logs.
        </p>
        <Button onClick={onAnalyze} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Analyzing..." : "Analyze Sample"}
        </Button>
        {isLoading && <p className="mt-2 text-sm text-accent">Analysis in progress, please wait...</p>}
         <div className="mt-4 p-3 bg-muted/50 rounded-md border border-dashed border-border">
            <h4 className="font-medium text-sm text-foreground">Sandbox Status</h4>
            <p className="text-xs text-muted-foreground">Environment: <span className="text-primary font-medium">Isolated & Ready</span></p>
            <p className="text-xs text-muted-foreground">Monitoring: <span className="text-primary font-medium">Active</span></p>
        </div>
      </CardContent>
    </Card>
  );
}

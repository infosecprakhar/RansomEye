// src/components/dashboard/log-display.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { LucideIcon } from "lucide-react";

interface LogDisplayProps {
  title: string;
  description: string;
  logs: string | null;
  icon: LucideIcon;
  isLoading: boolean;
}

export function LogDisplay({ title, description, logs, icon: Icon, isLoading }: LogDisplayProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon className="mr-2 h-6 w-6 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-64 rounded-md border border-border p-4 bg-muted/30">
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[60%]" />
            </div>
          )}
          {!isLoading && logs && (
            <pre className="text-xs whitespace-pre-wrap break-all font-code">{logs}</pre>
          )}
          {!isLoading && !logs && (
            <p className="text-sm text-muted-foreground text-center py-10">No logs available. Run analysis to generate logs.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

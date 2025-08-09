"use client";

import { useEffect, useState } from "react";
import { useScraping } from "@/contexts/scraping-context";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Loader2, Clock, PlayCircle, PauseCircle, StopCircle, RefreshCw as RefreshCcw, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Website, ScrapingJob } from "@/types/api";

type RecentScrapingJobsProps = React.HTMLAttributes<HTMLDivElement>;

interface StatusConfig {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

const getStatusConfig = (status: Website['status']): StatusConfig => {
  switch (status) {
    case "completed":
      return {
        icon: CheckCircle2,
        color: "text-green-500",
        bgColor: "bg-green-500/10 dark:bg-green-500/20",
        borderColor: "border-green-500/20",
      };
    case "scraping":
      return {
        icon: Loader2,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
        borderColor: "border-blue-500/20",
      };
    case "pending":
      return {
        icon: Clock,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10 dark:bg-yellow-500/20",
        borderColor: "border-yellow-500/20",
      };
    case "failed":
      return {
        icon: AlertCircle,
        color: "text-red-500",
        bgColor: "bg-red-500/10 dark:bg-red-500/20",
        borderColor: "border-red-500/20",
      };
    case "paused":
      return {
        icon: PauseCircle,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/20",
      };
    case "stopped":
      return {
        icon: StopCircle,
        color: "text-gray-500",
        bgColor: "bg-gray-500/10",
        borderColor: "border-gray-500/20",
      };
  }
};

function getProgressPercentage(website: Website, currentJob: ScrapingJob | null): number {
  if (!currentJob) return 0;
  
  const totalSites = currentJob.total_sites || 1;
  const completedSites = currentJob.completed_sites || 0;
  
  // Check if this website is being processed in the current job
  const isActive = currentJob.active_sites?.includes(website.url) || false;
  
  if (isActive) {
    return Math.min(99, Math.round((completedSites / totalSites) * 100));
  }
  
  return Math.round((completedSites / totalSites) * 100);
}

interface WebsiteStatusProps {
  website: Website;
  currentJob: ScrapingJob | null;
}

function WebsiteStatus({ website, currentJob }: WebsiteStatusProps) {
  const statusConfig = getStatusConfig(website.status);
  const progress = getProgressPercentage(website, currentJob);
  
  return (
    <div className="flex items-center gap-2">
      <div className={cn("p-2 rounded-full", statusConfig.bgColor)}>
        <statusConfig.icon
          className={cn(
            "h-4 w-4",
            statusConfig.color,
            website.status === "scraping" && "animate-spin"
          )}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{website.url}</p>
          <Badge
            variant="secondary"
            className={cn("capitalize shrink-0", statusConfig.color)}
          >
            {website.status}
          </Badge>
        </div>
        {website.status === "scraping" && (
          <div className="mt-2 w-full bg-muted rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {website.status === "completed" && website.updatedAt ? (
            `Completed ${new Date(website.updatedAt).toLocaleString()}`
          ) : website.status === "scraping" ? (
            `In progress - ${progress}% complete`
          ) : website.createdAt ? (
            `Started ${new Date(website.createdAt).toLocaleString()}`
          ) : null}
        </p>
      </div>
    </div>
  );
}

export function RecentScrapingJobs({
  className,
  ...props
}: RecentScrapingJobsProps) {
  const { isLoading, currentJob } = useScraping();
  
  // Mock data - replace with actual data fetching logic
  const [websites, setWebsites] = useState<Website[]>([]);
  // Parse currentJob if it exists
  const parsedJob = currentJob ? JSON.parse(currentJob) : null;

  // Update website status based on current job
  useEffect(() => {
    if (parsedJob) {
      setWebsites(prevWebsites => 
        prevWebsites.map(website => {
          // Check if this website is being processed in the current job
          const isActive = parsedJob.active_sites?.includes(website.url);
          if (isActive) {
            return {
              ...website,
              status: 'scraping' as const,
              updatedAt: parsedJob.start_time || website.updatedAt
            };
          }
          return website;
        })
      );
    }
  }, [currentJob, parsedJob]); // Re-run when currentJob or parsedJob changes

  const handleJobAction = async (
    websiteId: string,
    action: "pause" | "resume" | "stop" | "retry" | "delete"
  ) => {
    try {
      const response = await fetch(`/api/scraping/${websiteId}/${action}`, { 
        method: "POST" 
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${action} scraping job`);
      }
      
      // Update local state
      setWebsites(prevWebsites => 
        prevWebsites.map(website => {
          if (website.id === websiteId) {
            let newStatus = website.status;
            if (action === 'delete') return null; // Will be filtered out
            if (action === 'pause') newStatus = 'paused';
            if (action === 'resume') newStatus = 'scraping';
            if (action === 'stop') newStatus = 'stopped';
            if (action === 'retry') newStatus = 'pending';
            
            return { ...website, status: newStatus };
          }
          return website;
        }).filter(Boolean) as Website[]
      );
      
    } catch (error) {
      console.error(`Error ${action}ing job:`, error);
      toast({
        title: "Action Failed",
        description: `Failed to ${action} the scraping job.`,
        variant: "error",
      });
    }
  };

  const JobControls = ({ website }: { website: Website }) => (
    <div className="flex items-center gap-2 pr-4">
      {website.status !== "completed" && website.status !== "failed" && (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() =>
                  handleJobAction(
                    website.id,
                    website.status === "paused" ? "resume" : "pause"
                  )
                }
              >
                {website.status === "paused" ? (
                  <PlayCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <PauseCircle className="h-4 w-4 text-orange-500" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {website.status === "paused" ? "Resume" : "Pause"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleJobAction(website.id, "stop")}
              >
                <StopCircle className="h-4 w-4 text-red-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Stop</TooltipContent>
          </Tooltip>
        </>
      )}

      {(website.status === "failed" || website.status === "stopped") && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleJobAction(website.id, "retry")}
            >
              <RefreshCcw className="h-4 w-4 text-blue-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Retry</TooltipContent>
        </Tooltip>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleJobAction(website.id, "delete")}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </div>
  );

  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <CardHeader className="border-b bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">
              Recent Scraping Jobs
            </CardTitle>
            <CardDescription className="text-sm">
              Manage and monitor your scraping activities
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <ScrollArea className="h-[400px]">
        <CardContent className="p-0">
          <div className="divide-y">
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                {websites.slice(0, 5).map((website) => (
                  <div
                    key={website.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <WebsiteStatus website={website} currentJob={parsedJob} />
                    <JobControls website={website} />
                  </div>
                ))}

                {websites.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <Clock className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-sm font-medium">No recent scraping jobs</p>
                    <p className="text-xs mt-1">
                      Start a new scraping job to see it here
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

import * as React from 'react';
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentScrapingJobs } from "@/components/recent-scraping-jobs";
import { ScrapingResultsView } from "@/components/scraping-results-view";
import type { ScrapingResult } from "@/types/api";


export default function ResultsPage() {
  // Initialize with empty results and loading state
  const [isLoading, setIsLoading] = React.useState(true);
  const [results, setResults] = React.useState<ScrapingResult[]>([]);

  // Fetch scraping results when component mounts
  React.useEffect(() => {
    const fetchResults = async () => {
      try {
        // TODO: Replace with actual API call to fetch scraping results
        // const response = await fetch('/api/scraping-results');
        // const data = await response.json();
        // setResults(data);
        setResults([]); // Empty array for now
      } catch (error) {
        console.error('Failed to fetch scraping results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <DashboardShell>
      <DashboardHeader heading="Results" text="View and export your scraping results" />
      <RecentScrapingJobs />
      <ScrapingResultsView results={results} isLoading={isLoading} />
    </DashboardShell>
  )
}


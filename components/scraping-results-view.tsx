"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, Mail, Phone, MapPin, Hash } from "lucide-react";
import { useScraping } from "@/contexts/scraping-context";
import type { ScrapingResult } from "@/types/api";
import { downloadCSV, resultToCSV, resultsToCSV } from "@/lib/export-utils";

interface ResultsSummaryProps {
  results: ScrapingResult[];
}

function ResultsSummary({ results }: ResultsSummaryProps) {
  const totalEmails = results?.reduce(
    (sum, result) => {
      const data = result.data || {};
      return sum + (Array.isArray(data.emails) ? data.emails.length : 0);
    },
    0
  );
  
  const totalPhones = results?.reduce(
    (sum, result) => {
      const data = result.data || {};
      return sum + (Array.isArray(data.phoneNumbers) ? data.phoneNumbers.length : 0);
    },
    0
  );
  
  const totalAddresses = results?.reduce(
    (sum, result) => {
      const data = result.data || {};
      return sum + (Array.isArray(data.addresses) ? data.addresses.length : 0);
    },
    0
  );
  
  const totalPostalCodes = results?.reduce(
    (sum, result) => {
      const data = result.data || {};
      return sum + (Array.isArray(data.postal_codes) ? data.postal_codes.length : 0);
    },
    0
  );

  const stats = [
    {
      title: "Total Emails",
      value: totalEmails,
      icon: Mail,
      color: "text-blue-500",
    },
    {
      title: "Total Phones",
      value: totalPhones,
      icon: Phone,
      color: "text-green-500",
    },
    {
      title: "Total Addresses",
      value: totalAddresses,
      icon: MapPin,
      color: "text-purple-500",
    },
    {
      title: "Total Postal Codes",
      value: totalPostalCodes,
      icon: Hash,
      color: "text-orange-500",
    },
  ];

  const handleExportAll = () => {
    if (results && results.length > 0) {
      const csv = resultsToCSV(results);
      downloadCSV(csv, "all-scraping-results.csv");
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          onClick={handleExportAll}
          disabled={!results || results.length === 0}
        >
          <FileDown className="h-4 w-4 mr-2" />
          Export All Results
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ title, value, icon: Icon, color }) => (
          <Card key={title}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Icon className={`h-8 w-8 ${color}`} />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {title}
                  </p>
                  <p className="text-2xl font-bold">{value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

function ResultsTable({ result }: { result: ScrapingResult }) {
  const data = result.data || {};
  const sections = [
    {
      title: "Emails",
      items: Array.isArray(data.emails) ? data.emails : [],
      icon: Mail,
      color: "text-blue-500",
    },
    {
      title: "Phone Numbers",
      items: Array.isArray(data.phoneNumbers) ? data.phoneNumbers : [],
      icon: Phone,
      color: "text-green-500",
    },
    {
      title: "Addresses",
      items: Array.isArray(data.addresses) ? data.addresses : [],
      icon: MapPin,
      color: "text-purple-500",
    },
    {
      title: "Postal Codes",
      items: Array.isArray(data.postal_codes) ? data.postal_codes : [],
      icon: Hash,
      color: "text-orange-500",
    },
  ];

  const handleExport = () => {
    const csv = resultToCSV(result);
    const filename = `scraping-results-${result.websiteId.replace(/[^a-z0-9]/gi, '-').slice(0, 30)}.csv`;
    downloadCSV(csv, filename);
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <CardTitle className="text-base font-medium break-all">
            {result.websiteId}
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full sm:w-auto" 
            onClick={handleExport}
          >
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map(({ title, items, icon: Icon, color }) => (
          <div key={title} className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Icon className={`h-4 w-4 ${color} shrink-0`} />
              {title} ({items.length})
            </h4>
            {items.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center p-2 rounded-md bg-muted/50 hover:bg-muted group"
                  >
                    <span className="text-sm break-all">{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No {title.toLowerCase()} found
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

interface ScrapingResultsViewProps {
  results: ScrapingResult[];
  isLoading: boolean;
}

export function ScrapingResultsView({ results, isLoading }: ScrapingResultsViewProps) {
  const { isLoading: isScraping } = useScraping();

  if (isLoading || isScraping) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!results?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle>Scraping Results</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="w-full justify-start px-6 pt-2">
              <TabsTrigger value="summary" className="flex-1 sm:flex-none">
                Summary
              </TabsTrigger>
              <TabsTrigger value="detailed" className="flex-1 sm:flex-none">
                Detailed Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="p-6 pt-4">
              <ResultsSummary results={results} />
            </TabsContent>

            <TabsContent value="detailed" className="p-0">
              <div className="p-6">
                <div className="space-y-4">
                  {results.map((result: ScrapingResult, index: number) => (
                    <ResultsTable key={index} result={result} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

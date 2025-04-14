"use client";

import { createContext, useContext, useState } from "react";

interface ScrapingContextType {
  isLoading: boolean;
  currentJob: string | null;
}

const ScrapingContext = createContext<ScrapingContextType>({
  isLoading: false,
  currentJob: null,
});

export function ScrapingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentJob, setCurrentJob] = useState<string | null>(null);

  return (
    <ScrapingContext.Provider value={{ isLoading, currentJob }}>
      {children}
    </ScrapingContext.Provider>
  );
}

export const useScraping = () => useContext(ScrapingContext); 
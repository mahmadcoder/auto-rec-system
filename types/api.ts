export type WebsiteStatus = 
  | "pending"
  | "scraping"
  | "completed"
  | "failed"
  | "paused"
  | "stopped";

export interface Website {
  id: string;
  url: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface ScrapingJob {
  batch_id: string;
  total_sites: number;
  completed_sites: number;
  pending_sites: number;
  failed_sites: number;
  active_sites: string[];
  estimated_time_remaining: number | null;
  start_time: string | null;
  end_time: string | null;
}

export interface ScrapingRequest {
  urls: string[];
  max_pages_per_site?: number;
  concurrent_sites?: number;
}

export interface ScrapingError {
  message: string;
  code?: string;
  details?: any;
}

export interface WebSocketMessage {
  type: "status_update";
  data: {
    batch_id: string;
    total_sites: number;
    completed_sites: number;
    pending_sites: number;
    failed_sites: number;
    active_sites: string[];
    estimated_time_remaining: number | null;
    start_time: string;
    end_time: string | null;
  };
  timestamp: string;
}

export interface ScrapingResult {
  id: string;
  websiteId: string;
  data: any;
  createdAt: string;
  status: 'success' | 'error';
  error?: string;
}

export interface BatchResults {
  batch_id: string;
  results: ScrapingResult[];
  total_urls: number;
  successful_urls: number;
  failed_urls: number;
  statistics: {
    total_emails: number;
    total_phones: number;
    total_addresses: number;
    total_postal_codes: number;
  };
  start_time: string;
  end_time: string;
}

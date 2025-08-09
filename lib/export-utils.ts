import { ScrapingResult } from "@/types/api";

interface ScrapingData {
  emails?: string[];
  phoneNumbers?: string[];
  addresses?: string[];
  hashtags?: string[];
  [key: string]: unknown; // For any additional properties we might not know about
}

/**
 * Downloads a CSV file with the given content and filename
 */
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Extracts data from the result's data field
 */
function extractData(data: ScrapingData | null | undefined) {
  try {
    if (!data) return { emails: [], phones: [], addresses: [], hashtags: [] };
    
    return {
      emails: data.emails || [],
      phones: data.phoneNumbers || [],
      addresses: data.addresses || [],
      hashtags: data.hashtags || []
    };
  } catch (error) {
    console.error('Error extracting data:', error);
    return { emails: [], phones: [], addresses: [], hashtags: [] };
  }
}

/**
 * Escapes a string for CSV
 */
function escapeCsvField(field: string): string {
  if (field == null) return '';
  // Escape double quotes by doubling them
  const escaped = String(field).replace(/"/g, '""');
  // Wrap in quotes if contains comma, newline or quote
  if (escaped.includes(',') || escaped.includes('\n') || escaped.includes('"')) {
    return `"${escaped}"`;
  }
  return escaped;
}

/**
 * Converts a single scraping result to CSV format
 */
export function resultToCSV(result: ScrapingResult): string {
  if (!result || result.status === 'error') return '';
  
  const { emails, phones, addresses, hashtags } = extractData(result.data);
  
  const rows = [];
  const maxRows = Math.max(
    emails.length,
    phones.length,
    addresses.length,
    hashtags.length,
    1 // At least one row
  );

  // Add header row
  rows.push('URL,Email,Phone,Address,Hashtag,Status');
  
  // Add data rows
  for (let i = 0; i < maxRows; i++) {
    const row = [
      i === 0 ? escapeCsvField(result.websiteId) : '',
      escapeCsvField(emails[i] || ''),
      escapeCsvField(phones[i] || ''),
      escapeCsvField(addresses[i] || ''),
      escapeCsvField(hashtags[i] || ''),
      escapeCsvField(result.status)
    ];
    rows.push(row.join(','));
  }
  
  return rows.join('\n');
}

/**
 * Converts multiple scraping results to CSV format
 */
export function resultsToCSV(results: ScrapingResult[]): string {
  if (!results || results.length === 0) return '';
  
  const rows = ['URL,Email,Phone,Address,Hashtag,Status'];
  
  for (const result of results) {
    if (result.status === 'error') continue;
    
    const { emails, phones, addresses, hashtags } = extractData(result.data);
    const maxRows = Math.max(emails.length, phones.length, addresses.length, hashtags.length, 1);
    
    for (let i = 0; i < maxRows; i++) {
      const row = [
        i === 0 ? escapeCsvField(result.websiteId) : '',
        escapeCsvField(emails[i] || ''),
        escapeCsvField(phones[i] || ''),
        escapeCsvField(addresses[i] || ''),
        escapeCsvField(hashtags[i] || ''),
        escapeCsvField(result.status)
      ];
      rows.push(row.join(','));
    }
  }
  
  return rows.join('\n');
}

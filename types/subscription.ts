export interface SubscriptionPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
  max_monthly_scrapes: number;
  max_urls_per_batch: number;
  max_pages_per_site: number;
  concurrent_sites: number;
  max_monthly_emails: number;
  max_emails_per_site: number;
}

export interface Subscription {
  id: string;
  userId: string;
  package: SubscriptionPackage;
  status: 'active' | 'cancelled' | 'expired';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

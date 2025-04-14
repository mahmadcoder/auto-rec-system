import { Subscription, SubscriptionPackage } from "@/types/subscription";

export const subscriptions = {
  async getPackages(): Promise<SubscriptionPackage[]> {
    // TODO: Implement actual API call
    return [
      {
        id: "1",
        name: "Basic",
        description: "Perfect for getting started",
        price: 9.99,
        is_active: true,
        max_monthly_scrapes: 100,
        max_urls_per_batch: 10,
        max_pages_per_site: 50,
        concurrent_sites: 2,
        max_monthly_emails: 1000,
        max_emails_per_site: 100
      },
      {
        id: "2",
        name: "Professional",
        description: "For growing businesses",
        price: 29.99,
        is_active: true,
        max_monthly_scrapes: 500,
        max_urls_per_batch: 50,
        max_pages_per_site: 200,
        concurrent_sites: 5,
        max_monthly_emails: 5000,
        max_emails_per_site: 500
      }
    ];
  },

  async getCurrentSubscription(): Promise<Subscription | null> {
    // TODO: Implement actual API call
    return null;
  }
}; 
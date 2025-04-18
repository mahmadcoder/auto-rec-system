"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/providers/auth-provider";
import { Subscription, SubscriptionPackage } from "@/types/subscription";
import { subscriptions } from "@/lib/api";

export function PricingSection() {
  const t = useTranslations("Marketing.pricing");
  const common = useTranslations("Common");
  
  const { isAuthenticated } = useAuth();
  const [packages, setPackages] = useState<SubscriptionPackage[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packagesData = await subscriptions.getPackages();
        setPackages(packagesData.filter((pkg: SubscriptionPackage) => pkg.is_active));
        
        if (isAuthenticated) {
          const subscription = await subscriptions.getCurrentSubscription();
          setCurrentSubscription(subscription);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(common("somethingWentWrong"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, common]);

  const packageFeatures = [
    { key: "max_monthly_scrapes", label: "monthlyScrapes" },
    { key: "max_urls_per_batch", label: "urlsPerBatch" },
    { key: "max_pages_per_site", label: "pagesPerSite" },
    { key: "concurrent_sites", label: "concurrentSites" },
    { key: "max_monthly_emails", label: "monthlyEmails" },
    { key: "max_emails_per_site", label: "emailsPerSite" }
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center mt-16">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="text-muted-foreground">{t("loading")}</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center mt-16">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              {common("retry")}
            </Button>
          </div>
        ) : (
          <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {packages.map((pkg) => {
              const isCurrentPlan = currentSubscription?.package?.id === pkg.id;
              const isComingSoon = pkg.name === "Professional" || pkg.name === "Enterprise";
              const isPopular = pkg.name === "Professional";
              
              return (
                <Card 
                  key={pkg.id} 
                  className={`relative flex flex-col ring-1 ring-inset ${
                    isPopular 
                      ? 'ring-2 ring-primary' 
                      : 'ring-border'
                  } ${
                    isCurrentPlan 
                      ? "border-primary shadow-md" 
                      : "hover:border-primary/50"
                  }`}
                >
                  {isPopular && (
                    <p className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                      Most popular
                    </p>
                  )}
                  <CardHeader className="relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        <CardDescription className="mt-2">{pkg.description}</CardDescription>
                      </div>
                      {isCurrentPlan && (
                        <Badge className="bg-primary text-primary-foreground">
                          {t("currentPlan")}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-6">
                      <div className="flex items-baseline gap-x-1">
                        {isComingSoon ? (
                          <span className="text-4xl font-bold tracking-tight">{t("comingSoon")}</span>
                        ) : (
                          <>
                            <span className="text-4xl font-bold tracking-tight">${pkg.price}</span>
                            <span className="text-sm font-semibold text-muted-foreground">/{t("month")}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    <ul className="space-y-3 text-sm leading-6">
                      {packageFeatures.map(feature => (
                        <li key={feature.key} className="flex gap-x-3">
                          <Check className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>
                            {/* @ts-ignore - We know this property exists on the package */}
                            {pkg[feature.key]} {t(`features.${feature.label}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="mt-6">
                    <Button 
                      asChild 
                      size="lg"
                      className="w-full"
                      variant={isCurrentPlan ? "secondary" : "default"}
                    >
                      <Link href={isCurrentPlan ? "/profile" : `/subscribe/${pkg.id}`}>
                        {isCurrentPlan ? t("cta.manageSubscription") : t("cta.getStarted")}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-base text-muted-foreground">
            {t("enterprise.description")}
          </p>
          <Button asChild variant="outline" className="mt-6 hover:text-white">
            <Link href="/contact">{t("enterprise.contactSales")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

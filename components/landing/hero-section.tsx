import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Code, Globe, CheckCircle } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("Marketing.hero");
  
  const benefits = [
    "noCreditCard",
    "freePlan",
    "apiAccess",
    "exportFormats"
  ];

  return (
    <div className="relative isolate overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px] dark:bg-primary/20" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[100px] dark:bg-accent/20" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="inline-flex items-center rounded-full border border-primary/20 px-4 py-1.5 mb-8 text-sm font-medium bg-background/80 backdrop-blur-sm dark:bg-background/30 shadow-sm">
            <span className="text-muted-foreground">{t("newFeature")}</span>
            <span className="ml-1.5 text-primary font-semibold">{t("aiPowered")}</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
            {t("title")}{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex items-center gap-x-6">
            <Button asChild size="lg" className="text-base px-8 gap-2 h-12 shadow-md hover:shadow-lg transition-all">
              <Link href="/register">
                {t("cta.getStarted")} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 h-12 border-primary/20 hover:bg-primary/5 dark:hover:bg-primary/10">
              <Link href="/docs">
                {t("cta.documentation")}
              </Link>
            </Button>
          </div>

          <div className="mt-10 space-y-3">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{t(`benefits.${benefit}`)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="bg-card rounded-lg border shadow-xl dark:shadow-primary/5 p-4">
              <div className="aspect-[16/9] w-[36rem] bg-muted rounded-md flex items-center justify-center text-muted-foreground p-4">
                <p className="text-sm text-center">Your app screenshot or demo visualization here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

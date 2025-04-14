import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { 
  Layers, 
  Code, 
  Database, 
  Cloud, 
  LineChart, 
  Workflow 
} from "lucide-react";

interface FeatureProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function FeaturesSection() {
  const t = useTranslations("Marketing.features");
  
  const featureKeys = [
    {
      icon: <Database className="h-6 w-6" />,
      key: "dataExtraction"
    },
    {
      icon: <Layers className="h-6 w-6" />,
      key: "exportFormats"
    },
    {
      icon: <Code className="h-6 w-6" />,
      key: "developerApi"
    },
    {
      icon: <Cloud className="h-6 w-6" />,
      key: "cloudProcessing"
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      key: "monitoring"
    },
    {
      icon: <Workflow className="h-6 w-6" />,
      key: "scheduling"
    }
  ];

  return (
    <section id="features" className="py-24 sm:py-32 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
            {featureKeys.map((feature, index) => (
              <div
                key={index}
                className="relative bg-card hover:bg-accent/5 rounded-2xl p-8 shadow-sm border transition-colors"
              >
                <div className="mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t(`items.${feature.key}.title`)}
                </h3>
                <p className="text-muted-foreground">
                  {t(`items.${feature.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

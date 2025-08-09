import { MainNav } from "@/components/layout/main-nav";
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AutoRec AI - Automated Recruitment Solutions',
    description: 'Transform your hiring process with AI-powered recruitment solutions',
  };
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      <div className="sticky-header-offset"></div>
      <div className="flex flex-col min-h-[calc(100vh-64px)]">
        <main className="flex-1">{children}</main>
        <footer className="border-t py-8 md:py-12 mt-auto">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Autorec AI. All rights reserved.
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Package, Loader2 } from "lucide-react";

// // UI Components
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// // Page Components
// import { DashboardHeader } from "@/components/dashboard-header";
// import { DashboardShell } from "@/components/dashboard-shell";

// // API
// import { subscriptions } from "@/lib/api";

// // Simple placeholder component for dashboard widgets
// const PlaceholderCard = ({ title }: { title: string }) => (
//   <Card>
//     <CardHeader>
//       <CardTitle>{title}</CardTitle>
//     </CardHeader>
//     <CardContent className="h-32 flex items-center justify-center">
//       <p className="text-muted-foreground">Data will load after page hydration</p>
//     </CardContent>
//   </Card>
// );

// // Loading component
// const LoadingState = () => (
//   <div className="w-full flex justify-center py-8">
//     <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//   </div>
// );

// // Declare this page as requiring client-side rendering
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

// export default function DashboardPage() {
//   const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isClient, setIsClient] = useState(false);

//   // Check if we're on the client
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Load subscription data
//   useEffect(() => {
//     if (!isClient) return;

//     async function checkSubscription() {
//       try {
//         const subscription = await subscriptions.getCurrentSubscription();
//         setHasSubscription(!!subscription);
//       } catch (err) {
//         console.error("Failed to load subscription:", err);
//         setHasSubscription(false);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     checkSubscription();
//   }, [isClient]);

//   // If we're not on client yet, show a minimal shell
//   if (!isClient) {
//     return (
//       <DashboardShell>
//         <div className="mx-auto space-y-6 p-0 md:p-2">
//           <DashboardHeader
//             heading="Dashboard"
//             text="Overview of your web scraping activities"
//           />
//           <LoadingState />
//         </div>
//       </DashboardShell>
//     );
//   }

//   return (
//     <DashboardShell>
//       <div className="mx-auto space-y-6 p-0 md:p-2">
//         <DashboardHeader
//           heading="Dashboard"
//           text="Overview of your web scraping activities"
//         />
        
//         {isLoading ? (
//           <LoadingState />
//         ) : (
//           <>
//             {hasSubscription === false && (
//               <Card className="mb-6 border-dashed border-2 border-muted-foreground/20">
//                 <CardHeader>
//                   <CardTitle>Get Started with a Subscription</CardTitle>
//                   <CardDescription>
//                     You don't have an active subscription. Subscribe to start scraping websites.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-col items-center justify-center py-6 gap-4">
//                     <Package className="h-12 w-12 text-muted-foreground" />
//                     <p className="text-center text-muted-foreground max-w-md">
//                       Choose a subscription plan to access our web scraping features including email extraction, 
//                       contact information scraping, and more.
//                     </p>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button asChild className="w-full sm:w-auto">
//                     <Link href="/pricing">View Subscription Plans</Link>
//                   </Button>
//                 </CardFooter>
//               </Card>
//             )}

//             <div className="grid gap-6">
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//                 {Array(4).fill(0).map((_, i) => (
//                   <PlaceholderCard key={i} title={`Metric ${i+1}`} />
//                 ))}
//               </div>
//               <div className="grid gap-4 lg:grid-cols-7">
//                 <div className="lg:col-span-4">
//                   <PlaceholderCard title="Usage Overview" />
//                 </div>
//                 <div className="lg:col-span-3">
//                   <PlaceholderCard title="Subscription Details" />
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </DashboardShell>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { DashboardHeader } from "@/components/dashboard-header";
// import { DashboardShell } from "@/components/dashboard-shell";
// import { OverviewCards } from "@/components/overview-cards";
// import { SubscriptionUsageCard } from "@/components/subscription-usage-card";
// import { Button } from "@/components/ui/button";
// import { subscriptions } from "@/lib/api";
// import Link from "next/link";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Package } from "lucide-react";

// export default function DashboardPage() {
//   const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function checkSubscription() {
//       try {
//         const subscription = await subscriptions.getCurrentSubscription();
//         setHasSubscription(!!subscription);
//       } catch (err) {
//         // If there's an error, assume no subscription
//         setHasSubscription(false);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     checkSubscription();
//   }, []);

//   return (
//     <DashboardShell>
//       <div className="mx-auto space-y-6 p-0 md:p-2">
//         <DashboardHeader
//           heading="Dashboard"
//           text="Overview of your web scraping activities"
//         />
        
//         {!isLoading && hasSubscription === false && (
//           <Card className="mb-6 border-dashed border-2 border-muted-foreground/20">
//             <CardHeader>
//               <CardTitle>Get Started with a Subscription</CardTitle>
//               <CardDescription>
//                 You don't have an active subscription. Subscribe to start scraping websites.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-col items-center justify-center py-6 gap-4">
//                 <Package className="h-12 w-12 text-muted-foreground" />
//                 <p className="text-center text-muted-foreground max-w-md">
//                   Choose a subscription plan to access our web scraping features including email extraction, 
//                   contact information scraping, and more.
//                 </p>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button asChild className="w-full sm:w-auto">
//                 <Link href="/pricing">View Subscription Plans</Link>
//               </Button>
//             </CardFooter>
//           </Card>
//         )}

//         <div className="grid gap-6">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <OverviewCards />
//           </div>
//           <div className="grid gap-4 lg:grid-cols-7">
//             <div className="lg:col-span-3 space-y-6">
//               <SubscriptionUsageCard />
//             </div>
//           </div>
//         </div>
//       </div>
//     </DashboardShell>
//   );
// }



// ahmad-code
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Folder, MessageSquare, MoreVertical, Plus, Users, Briefcase, FileText, ClipboardList, Pencil, Mail, Shapes, Check } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Candidates");

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const recentJobs = [
    {
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      postedDate: "Posted 2 days ago",
      candidates: 12,
    },
    {
      title: "Product Manager",
      company: "InnovaTech",
      postedDate: "Posted 5 days ago",
      candidates: 8,
    },
    {
      title: "UX Designer",
      company: "Creative Solutions",
      postedDate: "Posted 1 week ago",
      candidates: 15,
    },
    {
      title: "Marketing Specialist",
      company: "Growth Partners",
      postedDate: "Posted 1 week ago",
      candidates: 6,
    },
  ];

  const candidates = [
    {
      name: "John Smith",
      position: "Senior Software Engineer",
      match: "92% match",
      avatar: "JS",
    },
    {
      name: "Sarah Johnson",
      position: "Product Manager",
      match: "88% match",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      position: "UX Designer",
      match: "84% match",
      avatar: "MC",
    },
  ];

  const upcomingTasks = [
    {
      title: "Review CVs for Software Engineer position",
      type: "document",
      info: "Due Today • High Priority",
    },
    {
      title: "Schedule interview with Sarah Johnson",
      type: "meeting",
      info: "Due tomorrow • Medium Priority",
    },
    {
      title: "Prepare offer for Michael Chen",
      type: "offer",
      info: "Due in 2 days • High Priority",
    },
  ];

  // Function to get the appropriate icon for task types
  const getTaskIcon = (type:any) => {
    switch(type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-600" />;
      case "meeting":
        return <Clock className="h-5 w-5 text-blue-600" />;
      case "offer":
        return <Briefcase className="h-5 w-5 text-blue-600" />;
      default:
        return <ClipboardList className="h-5 w-5 text-blue-600" />;
    }
  };

  const candidateTabs = ["All Candidates", "Shortlisted", "Interviewing", "Offer", "Hired", "Rejected"];

  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Removed box border around header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Recruitment Dashboard</h1>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Active Jobs Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <Briefcase className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
              </div>
              <p className="text-sm font-medium text-[#11181C] mb-1">ACTIVE JOBS</p>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">10 in last 30 days</p>
              <Button 
                variant="default" 
                size="sm" 
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
                asChild
              >
                <Link href="/jobs">View All</Link>
              </Button>
            </div>
          </Card>

          {/* Candidates Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">CANDIDATES</p>
              <div className="text-2xl font-bold">158</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">25 new this month</p>
              <Button 
                variant="default" 
                size="sm" 
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
                asChild
              >
                <Link href="/candidates">Review</Link>
              </Button>
            </div>
          </Card>

          {/* Pending Tasks Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <ClipboardList className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">PENDING TASKS</p>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">5 high priority</p>
              <Button 
                variant="default" 
                size="sm" 
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
                asChild
              >
                <Link href="/tasks">Manage Tasks</Link>
              </Button>
            </div>
          </Card>

          {/* CV Reviewing Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <FileText className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">CV REVIEWING</p>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">10 completed today</p>
              <Button 
                variant="default" 
                size="sm" 
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              >
                Review Now
              </Button>
            </div>
          </Card>
        </div>

        {/* Vertical stacked layout */}
        <div className="space-y-6">
          {/* Recent Jobs Card */}
          <div className="">
            <div className="p-6 pb-3">
              <h2 className="text-lg font-semibold">Recent Jobs</h2>
            </div>
            <div className="px-6">
              {recentJobs.map((job, index) => (
                <div key={index} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Briefcase className="h-5 w-5 text-[#000000] fill-[#000000]" />
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                      <h4 className="text-sm font-medium w-48">{job.title}</h4>
                      <p className="text-xs text-muted-foreground w-32">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-xs text-muted-foreground">{job.postedDate}</div>
                    <div className="text-xs font-medium ml-6 mr-6">{job.candidates} candidates</div>
                    <div className="flex ml-auto space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4 text-[#000000] fill-[#000000]" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 pt-2">
              <Button 
                variant="default" 
                size="sm" 
                className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
              >
                Create New Job
              </Button>
            </div>
          </div>

          {/* Candidate Pipeline Card */}
          <div className="">
            <div className="p-6 pb-3">
              <h2 className="text-lg font-semibold">Candidate Pipeline</h2>
            </div>
            <div className="border-b px-6 py-2">
              <div className="flex gap-4 overflow-x-auto pb-1">
                {candidateTabs.map((tab) => (
                  <div key={tab} className="relative">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`text-xs rounded-lg font-medium px-3 ${activeTab === tab ? 'bg-blue-50 text-blue-700' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      <span className={`mr-1 inline-block h-2 w-2 rounded-full ${activeTab === tab ? 'bg-blue-700' : 'bg-gray-300'}`}></span>
                      {tab}
                    </Button>
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              {candidates.map((candidate, index) => (
                <div key={index} className="flex items-center justify-between py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                        {candidate.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-medium">{candidate.name}</h4>
                      <p className="text-xs text-muted-foreground">{candidate.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="h-4 w-4 text-[#000000] fill-[#000000]" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Shapes className="h-4 w-4 text-[#000000] fill-[#000000]" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 pt-2">
              <Button 
                variant="default" 
                size="lg" 
                className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
              >
                View All Candidates
              </Button>
            </div>
          </div>

          {/* Upcoming Tasks Card */}
          <div className="">
            <div className="p-6 pb-3">
              <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
            </div>
            <div>
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                        {getTaskIcon(task.type)}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-sm font-medium">{task.title}</h4>
                      <p className="text-xs text-muted-foreground">{task.info}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-[#000000] flex items-center justify-center mb-2">
                    <Check className="h-6 w-6 text-[#fff]" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="p-6 pt-2">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
              >
                Create New Task
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
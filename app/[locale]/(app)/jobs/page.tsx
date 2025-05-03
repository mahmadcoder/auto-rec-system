"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle, Clock, Folder, MessageSquare, MoreHorizontal, Plus,
  Users, Briefcase, FileText, ClipboardList, Pencil, Mail, Shapes,
  Check, Search, MoreVertical, Edit, Trash, FilePlus, FileChartColumn,
  Copy, Link2,
  Circle
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

 // Tab data
 const tabItems = [
  { id: "all-jobs", label: "All Jobs" },
  { id: "active", label: "Active" }, 
  { id: "drafts", label: "Drafts" },
  { id: "closed", label: "Closed" },
  { id: "archived", label: "Archived" }
];


export default function JobsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all-jobs");

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const jobListings = [
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
    {
      title: "Data Analyst",
      company: "Analytics Pro",
      postedDate: "Posted 2 weeks ago",
      candidates: 10,
    },
    {
      title: "Sales Representative",
      company: "Revenue Growth Inc.",
      postedDate: "Posted 2 weeks ago",
      candidates: 9,
    },
  ];

  const jobIntegrations = [
    {
      name: "LinkedIn",
      status: "Connected",
      activeJobs: 12,
      postingType: "Premium",
      connected: true,
      href: "/jobs/linkedin",
    },
    {
      name: "Indeed",
      status: "Connected",
      activeJobs: 8,
      postingType: "Standard",
      connected: true,
    },
    {
      name: "Glassdoor",
      status: "Connected",
      activeJobs: 5,
      postingType: "Basic",
      connected: true,
    },
  ];

  const jobTemplates = [
    {
      title: "Software Engineering",
      description: "Template for technical roles",
    },
    {
      title: "Product Management",
      description: "Template for product roles",
    },
    {
      title: "Marketing",
      description: "Template for marketing roles",
    },
  ];


  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Jobs Management</h1>
        </div>

        {/* Statistics Cards */}
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
              >
                View All
              </Button>
            </div>
          </Card>

          {/* Draft Jobs Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <FilePlus className="h-5 w-5 text-[#1231AA] " />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">DRAFT JOBS</p>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">3 updated recently</p>
              <Button
                variant="default"
                size="sm"
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              >
                Edit Drafts
              </Button>
            </div>
          </Card>

          {/* Total Applicants Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">TOTAL APPLICANTS</p>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">35 new this week</p>
              <Button
                variant="default"
                size="sm"
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              >
                View Candidates
              </Button>
            </div>
          </Card>

          {/* Conversion Rate Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <FileChartColumn className="h-5 w-5 text-[#1231AA]" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">CONVERSION RATE</p>
              <div className="text-2xl font-bold">18%</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">+3% from last month</p>
              <Button
                variant="default"
                size="sm"
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              >
                View Analytics
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Jobs Search & Create Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search jobs..."
                className="w-[250px] pl-4 rounded-3xl"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <Link href="/jobs/create-new-job">
            <Button
              variant="default"
              size="default"
              className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Job
            </Button>
          </Link>
        </div>

        {/* Custom Tab Navigation */}
        <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex items-center py-4 px-1 text-sm font-medium ${
                    activeTab === tab.id
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Circle className={`h-2 w-2 mr-2 ${activeTab === tab.id ? "fill-black" : ""}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

        {/* Job Listings */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Job Listings</h2>
          </div>
          <div className="space-y-3">
            {jobListings.map((job, index) => (
              <div key={index} className="flex items-center justify-between py-3 bg-white rounded-lg shadow-sm px-4">
                <div className="flex items-center gap-3 w-1/3">
                  <div className="">
                    <Briefcase className="h-4 w-4 text-[#000000] fill-[#000000]" />
                  </div>
                  <div>
                    <div className="flex flex-row items-center space-x-4">
                      <h4 className="text-sm font-medium w-48">{job.title}</h4>
                      <p className="text-xs text-muted-foreground w-32">{job.company}</p>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground w-1/4 text-center">{job.postedDate}</div>
                <div className="flex items-center gap-1 w-1/6 text-center">

                  <span className="text-xs font-medium">{job.candidates} candidates</span>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Board Integration */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Job Board Integration</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {jobIntegrations.map((integration, index) => (
              <Card key={index} className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
                <div className="flex flex-col items-start">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    <Link2 className="h-5 w-5 text-[#1231AA]" />
                  </div>
                  <h3 className="text-lg font-semibold">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {integration.status} • {integration.activeJobs} active jobs
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {integration.postingType}
                  </p>
                  <div className="mt-4 flex gap-2">
                    {integration.connected ? (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
                          onClick={() => window.location.href = integration.href || '#'}
                        >
                          Manage
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-3xl text-[#1231AA] hover:bg-[#1231AA]/90 hover:text-[#ffff]"
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        className="text-xs bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Job Templates */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Job Templates</h2>
          </div>
          <div className="space-y-3">
            {jobTemplates.map((template, index) => (
              <div key={index} className="flex items-center justify-between py-3 bg-white rounded-lg shadow-sm px-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600  fill-[#1231AA]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{template.title}</h4>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <Edit className="h-4 w-4 " />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <Button
              variant="default"
              size="default"
              className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Template
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}





// In your jobs/page.tsx
// const JobsPage = async () => {
//   const response = await fetch('/api/jobs');
//   const jobs = await response.json();

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">My Jobs</h1>
//         <Link href="/jobs/create-new-job">
//           <Button>Create New Job</Button>
//         </Link>
//       </div>

//       <div className="grid gap-4">
//         {jobs.map((job) => (
//           <div key={job.id} className="border rounded-lg p-4">
//             <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
//             <p className="text-gray-600">{job.location} • {job.employmentType}</p>
//             <p className="text-gray-600">{job.salaryRange}</p>
//             <div className="mt-2">
//               {job.requiredSkills.map((skill) => (
//                 <span key={skill} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//                   {skill}
//                 </span>
//               ))}
//             </div>
//             <div className="mt-4">
//               <Badge>{job.status}</Badge>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
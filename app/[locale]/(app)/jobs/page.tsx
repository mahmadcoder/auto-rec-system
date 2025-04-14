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
  Copy, Link2
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function JobsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Jobs");

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
      href: "/linkedin",
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

  const jobTabs = ["All Jobs", "Active", "Drafts", "Closed", "Archived"];

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
                <FilePlus className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
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
                <FileChartColumn className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
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
          <Button 
            variant="default" 
            size="default" 
            className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Job
          </Button>
        </div>

        {/* Job Tabs */}
        <div className="border-b">
          <div className="flex gap-4 overflow-x-auto">
            {jobTabs.map((tab) => (
              <div key={tab} className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-sm rounded-lg font-medium px-3 py-1 ${activeTab === tab ? 'text-blue-700' : ''}`}
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
                  <Button variant="ghost" size="icon" className="h-8 w-8 ">
                  <Users className="h-4 w-4 text-[#000000] fill-[#000000]" />        
                 </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4 text-[#000000] fill-[#000000]" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4 text-[#000000] fill-[#000000]" />
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
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4 text-[#000000] fill-[#000000]" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash className="h-4 w-4 text-[#000000] fill-[#000000]" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
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
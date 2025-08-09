"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft, Briefcase, Users, FileChartColumn,
  Settings, Edit, MoreVertical, Plus,
  FileText, Link2,
  TrendingUp,
  Wallet,
  Copy,
  RefreshCcw,
  Building2,
  Search,
  RotateCw,
  Circle
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const tabItems = [
  { id: "all-posting", label: "All Postings" },
  { id: "active", label: "Active" },
  { id: "boosted", label: "Boosted" },
  { id: "expire", label: "Expire" },
  { id: "draft", label: "Drafts" },
];

// PageProps type is available when needed for params and searchParams

export default function LinkedInJobPage() {
  const [activeTab, setActiveTab] = useState("overview");
  // Destructure params for future use
  // const { linkedin: jobId } = params; // Uncomment when needed

  // Sample data for active LinkedIn job listings
  const linkedInJobs = [
    {
      title: "Senior Software Engineer",
      postedDate: "Posted 2 days ago",
      views: "72 views",
      applicants: "8 applicants",
    },
    {
      title: "Product Manager",
      postedDate: "Posted 5 days ago",
      views: "38 views",
      applicants: "14 applicants",
    },
    {
      title: "UX Designer",
      postedDate: "Posted 1 week ago",
      views: "103 views",
      applicants: "18 applicants",
    },
    {
      title: "Marketing Specialist",
      postedDate: "Posted 1 week ago",
      views: "64 views",
      applicants: "8 applicants",
    },
    {
      title: "Data Analyst",
      postedDate: "Posted 2 weeks ago",
      views: "85 views",
      applicants: "14 applicants",
    }
  ];

  // Settings for LinkedIn integration
  const integrationSettings = [
    {
      title: "Auto-import candidates",
      description: "Automatically import applicants to RecuitFlow",
      enabled: true
    },
    {
      title: "Auto-boost ads/recruiting posts",
      description: "Automatically boost ads based on views (min. 5 days)",
      enabled: true
    },
    {
      title: "Weekly performance reports",
      description: "Get detailed weekly email reports",
      enabled: true
    },
    {
      title: "LinkedIn Company Page",
      description: "Connected to: Tech Solutions Inc.",
      enabled: true,
      specialAction: "edit"
    },
    {
      title: "API Connection",
      description: "Last updated: Today at 09:45 AM",
      enabled: true,
      specialAction: "api"
    }
  ];

  // Templates for LinkedIn posting
  const postingTemplates = [
    {
      title: "Standard LinkedIn Post",
      description: "Basic job posting template"
    },
    {
      title: "Premium LinkedIn Post",
      description: "Enhanced visibility"
    },
    {
      title: "LinkedIn Spotlight",
      description: "Featured ad with company spotlight"
    }
  ];

  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Header with Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-sm">
            <Link href="/dashboard" className="text-muted-foreground">Dashboard</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/jobs" className="text-muted-foreground">Jobs</Link>
            <span className="text-muted-foreground">/</span>
            <span>LinkedIn</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/jobs">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold tracking-tight">LinkedIn Job Board Management</h1>
            </div>

          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Active Jobs Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                <Briefcase className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
              </div>
              <p className="text-sm font-medium text-[#11181C] mb-1">ACTIVE POSTINGS</p>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">4 published recently</p>
              <Button
                variant="default"
                size="sm"
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              >
                View All
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
              <div className="text-2xl font-bold">87</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">22 new this week</p>
              <Button
                variant="default"
                size="sm"
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              >
                View Candidates
              </Button>
            </div>
          </Card>

          {/* Engagement Rate Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-[#1231AA] fill-[#1231AA]" />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">ENGAGEMENT RATE</p>
              <div className="text-2xl font-bold">22%</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">+5% from last month</p>
              <Button
                variant="default"
                size="sm"
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              >
                View Analytics
              </Button>
            </div>
          </Card>

          {/* Monthly Spend Card */}
          <Card className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
            <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#1231AA0D] flex items-center justify-center mb-2">
                <Wallet className="h-5 w-5 text-[#1231AA] " />
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">MONTHLY SPEND</p>
              <div className="text-2xl font-bold">$1,250</div>
              <p className="text-xs text-muted-foreground mt-1 mb-3">Budget: $2,000</p>
              <Button
                variant="default"
                size="sm"
                className="text-xs h-8 w-32 rounded-3xl bg-[#1231AA] hover:bg-[#1231AA]/90 text-white"
              >
                Manage Budget
              </Button>
            </div>
          </Card>
        </div>

        {/* Search & Create Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search LinkedIn postings..."
                className="w-[250px] pl-4 pr-10 rounded-3xl"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <Button
            variant="default"
            size="default"
            className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Posting
          </Button>
        </div>
        {/* custom tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center py-4 px-1 text-sm font-medium ${activeTab === tab.id
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

        {/* LinkedIn Job Listings */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Active LinkedIn Postings</h2>
          </div>
          <div className="space-y-3">
            {linkedInJobs.map((job, index) => (
              <div key={index} className="flex items-center justify-between py-3  px-4">
                <div className="flex items-center gap-3 w-1/3">
                  <div className="">
                    <Briefcase className="h-4 w-4 text-[#000000] fill-[#000000]" />
                  </div>
                  <div className="flex flex-row items-center space-x-4">
                    <h4 className="text-sm font-medium w-48">{job.title}</h4>
                    <p className="text-xs text-muted-foreground w-32">{job.postedDate}</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground w-1/4 text-center">{job.views}</div>
                <div className="flex items-center gap-1 w-1/6 text-center">
                  <span className="text-xs font-medium">{job.applicants}</span>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <TrendingUp className="h-4 w-4" />
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

        {/* LinkedIn Integration Settings */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">LinkedIn Integration Settings</h2>
          </div>
          <div className="space-y-3">
            {integrationSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between py-3 bg-white rounded-lg shadow-sm px-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    {index === 0 ? (
                      <RefreshCcw className="h-4 w-4 text-blue-600" />
                    ) : index === 1 ? (
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    ) : index === 2 ? (
                      <FileChartColumn className="h-4 w-4 text-blue-600" />
                    ) : index === 3 ? (
                      <Building2 className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Link2 className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{setting.title}</h4>
                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                  </div>
                </div>
                <div>
                  {setting.specialAction === "edit" ? (
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : setting.specialAction === "api" ? (
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                        <RotateCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Switch checked={setting.enabled} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Posting Templates */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Posting Templates</h2>
          </div>
          <div className="space-y-3">
            {postingTemplates.map((template, index) => (
              <div key={index} className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{template.title}</h4>
                    <p className="text-xs text-muted-foreground">{template.description}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-2">
        
            <Link href="/jobs/linkedin/template">
              <Button
                variant="default"
                size="default"
                className="bg-[#1231AA] hover:bg-[#1231AA]/90 text-white rounded-3xl"
              >
                <Plus className="mr-2 h-4 w-4" /> Create New Template
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
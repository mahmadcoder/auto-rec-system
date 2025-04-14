"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, Briefcase, Award, Clock, ChevronRight, 
  Eye, FileText, Phone, UserCheck, CheckCircle,
  BarChart3, ChevronDown, Download, Share2, ArrowDown,
  ArrowUp, Calendar, LineChart,
  CircleCheck,
  Circle,
  TrendingUp,
  Code,
  Paintbrush,
  Megaphone,
  MoreVertical
} from "lucide-react";
import { LucideProps } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Top stats data
  const topStatsData = [
    {
      title: "TOTAL CANDIDATES",
      value: "1,247",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      buttonText: "View Profiles",
      bgColor: "bg-[#1231AA0D]",
      description:"Last 90 days",
    },
    {
      title: "ACTIVE JOBS",
      value: "24",
      icon: <Briefcase className="h-5 w-5 text-blue-600" />,
      buttonText: "View Jobs",
      bgColor: "bg-[#1231AA0D]",
      description:"Across all platforms",

    },
    {
      title: "PLACEMENTS",
      value: "18",
      icon: <CircleCheck className="h-5 w-5 text-blue-600" />,
      buttonText: "View Details",
      bgColor: "bg-[#1231AA0D]",
      description:"Last 90 days",

    },
    {
      title: "TIME TO HIRE",
      value: "32 days",
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      buttonText: "Optimize",
      bgColor: "bg-[#1231AA0D]",
      description:"Average across all rules",

    }
  ];

  // Tab data
  const tabItems = [
    { id: "overview", label: "Overview" },
    { id: "job-performance", label: "Job Performance" },
    { id: "candidate-sources", label: "Candidate Sources" },
    { id: "team-performance", label: "Team Performance" },
    { id: "custom-reports", label: "Custom Reports" }
  ];

  // Recruitment funnel data
  const recruitmentFunnelData = [
    {
      title: "Job Views",
      value: "3,452",
      icon: <Eye className="h-5 w-5 text-blue-600" />
    },
    {
      title: "Applications",
      value: "1,247",
      icon: <FileText className="h-5 w-5 text-blue-600" />
    },
    {
      title: "Phone Screens",
      value: "428",
      icon: <Phone className="h-5 w-5 text-blue-600" />
    },
    {
      title: "Interviews",
      value: "187",
      icon: <Users className="h-5 w-5 text-blue-600" />
    },
    {
      title: "Hires",
      value: "18",
      icon: <CheckCircle className="h-5 w-5 text-blue-600" />
    }
  ];

  // Source Performance data
  const sourcePerformanceData = [
    {
      id: 1,
      name: "LinkedIn Jobs",
      applications: 587,
      views: 2355, 
      conversion: "25% conversion"
    },
    {
      id: 2,
      name: "Indeed",
      applications: 402,
      views: 1789,
      conversion: "22% conversion"
    },
    {
      id: 3,
      name: "Glassdoor",
      applications: 301,
      views: 1346,
      conversion: "22% conversion"
    },
    {
      id: 4,
      name: "Referrals",
      applications: 96,
      views: 96,
      conversion: "100% conversion"
    }
  ];

  // Job Performance data
  const jobPerformanceData = [
    {
      id: 1,
      title: "Senior Software Engineer",
      applications: 87,
      interviews: 22,
      offers: 4
    },
    {
      id: 2,
      title: "Product Manager",
      applications: 52,
      interviews: 18,
      offers: 3
    },
    {
      id: 3,
      title: "UX Designer",
      applications: 43,
      interviews: 15,
      offers: 2
    },
    {
      id: 4,
      title: "Marketing Specialist",
      applications: 38,
      interviews: 12,
      offers: 2
    },
    {
      id: 5,
      title: "Data Analyst",
      applications: 27,
      interviews: 10,
      offers: 1
    }
  ];

  // Time to Hire by Department data
  const timeToHireData = [
    {
      department: "Engineering",
      average: "35 days",
      min: "21 days",
      max: "52 days",
      icon: <Code className="h-4 w-4 text-blue-700" />
    },
    {
      department: "Product",
      average: "32 days",
      min: "18 days",
      max: "43 days",
      icon: <Briefcase className="h-4 w-4 text-blue-700" />
    },
    {
      department: "Design",
      average: "28 days",
      min: "14 days",
      max: "45 days",
      icon: <Paintbrush className="h-4 w-4 text-blue-700" />
    },
    {
      department: "Marketing",
      average: "23 days",
      min: "12 days",
      max: "37 days",
      icon: <Megaphone className="h-4 w-4 text-blue-700" />
    }
  ];

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Breadcrumb navigation */}
        <div className="flex items-center text-sm font-medium">
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Analytics</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Recruitment Analytics</h1>
        </div>

        {/* Top Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          {topStatsData.map((stat, index) => (
            <Card key={index} className={`rounded-3xl ${stat.bgColor} border-0`}>
              <CardContent className="p-4">
                <div className="flex flex-col items-start">
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2 ">
                      {stat.icon}
                    </div>
                  </div>
                  <p className="text-xs font-medium text-black">{stat.title}</p>
                  <h3 className="text-xl font-bold mb-3">{stat.value}</h3>
                  <h3 className="text-xs font-medium mb-3 text-gray-500">{stat.description}</h3>
                  <Button
                    variant="default"
                    size="sm"
                    className="mt-auto text-xs rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {stat.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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

        {/* Recruitment Funnel Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recruitment Funnel</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {recruitmentFunnelData.map((item, index) => (
              <Card key={index} className="rounded-3xl bg-[#1231AA0D] border-0">
                <CardContent className="p-4">
                  <div className="flex flex-col items-start text-center">
                    <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{item.value}</h3>
                    <p className="text-xs font-semibold text-gray-500">{item.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Source Performance Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Source Performance</h2>
          </div>
          <div className="space-y-2">
            {sourcePerformanceData.map((source) => (
              <div 
                key={source.id} 
                className="flex items-center justify-between "
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-blue-700" />
                    </div>
                    <div className="text-sm font-medium">{source.name}</div>
                  </div>
                  <div className="ml-12 text-xs text-gray-500">
                    {source.applications} applications • {source.views} views • {source.conversion}
                  </div>
                </div>

                {/* analytical section */}
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-black">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-black">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                
              </div>
            ))}
          </div>
        </div>

        {/* Job Performance Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Job Performance</h2>
          </div>
          <div className="space-y-2">
            {jobPerformanceData.map((job) => (
              <div 
                key={job.id} 
                className="flex items-center justify-between p-4 "
              >
                <div className="flex items-center gap-3">
                    <Briefcase className="h-4 w-4 text-black" />
                  <div className="text-sm font-medium">{job.title}</div>
                </div>
                <div className="flex flex-row space-x-4 items-center gap-6 ">
                  <div className="text-xs font-medium">{job.applications} applications</div>
                  <div className="text-xs font-medium">{job.interviews} interviews</div>
                  <div className="text-xs font-medium">{job.offers} offer{job.offers > 1 ? 's' : ''}</div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-black "
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-black"
                  >
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-black"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  
                 
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time to Hire by Department Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Time to Hire by Department</h2>
          </div>
          <div className="space-y-2">
            {timeToHireData.map((dept, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 "
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center ">
                      {dept.icon}
                    </div>
                    <div className="text-sm font-medium">{dept.department}</div>
                  </div>
                  <div className="ml-11 flex items-center gap-4 text-xs mt-1">
                    <span className="flex items-center  text-xs text-gray-500">
                      Average: {dept.average} •
                    </span>
                    <span className="flex items-center  text-xs text-gray-500">
                      Min: {dept.min} •
                    </span>
                    <span className="flex items-center  text-xs text-gray-500">
                      Max: {dept.max}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-black"
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-black"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Report and Generate Report buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="rounded-3xl flex items-center gap-2 text-black hover:bg-blue-700 hover:text-white"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button
            variant="default"
            size="sm"
            className="rounded-3xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            Schedule Report
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}
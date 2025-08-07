"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DashboardShell } from "@/components/dashboard-shell";
import { Search, Filter, MoreVertical, Plus, Calendar, MessageSquare, Check, Users, Settings, Star, Circle, Pencil, Eye, ArrowUpDown, Cloud, Code, Wrench, Monitor } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Candidate {
  id: number;
  name: string;
  position: string;
  avatar: string;
  yearsExp: string;
  company: string;
  skills: string[];
  interviewStatus: string;
  interviewSchedule?: string;
}

// Tab data
const tabItems = [
    { id: "all-candidates", label: "All Candidates" },
    { id: "active", label: "Active" },
    { id: "on-hold", label: "On Hold" },
    { id: "rejected", label: "Rejected" },
    { id: "hired", label: "Hired" }
  ];

export default function DevOpsPoolPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [activeTab, setActiveTab] = useState("recent");
  // DevOps Stats data
  const statsData = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "TOTAL",
      value: "42",
      description: "DevOps candidates",
      buttonText: "View All"
    },
    {
      icon: <Star className="h-6 w-6 text-blue-600" />,
      title: "TOP RATED",
      value: "8",
      description: "Candidates with 8+ star rating",
      buttonText: "View Top"
    },
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      title: "INTERVIEW STAGE",
      value: "12",
      description: "Candidates to interview",
      buttonText: "Schedule"
    },
    {
      icon: <Settings className="h-6 w-6 text-blue-600" />,
      title: "POOL SETTINGS",
      value: "Manage",
      description: "Edit pool criteria and settings",
      buttonText: "Configure"
    }
  ];

  // Sample candidates data
  const candidates: Candidate[] = [
    {
      id: 1,
      name: "Robert Taylor",
      position: "DevOps Engineer",
      avatar: "RT",
      yearsExp: "5 years exp.",
      company: "AWS, Kubernetes, Docker",
      skills: ["AWS", "Kubernetes", "Docker"],
      interviewStatus: "Scheduled"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Cloud Infrastructure Specialist",
      avatar: "SJ",
      yearsExp: "7 years exp.",
      company: "GCP, Terraform, CI/CD",
      skills: ["GCP", "Terraform", "CI/CD"],
      interviewStatus: "Completed"
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "DevOps Lead",
      avatar: "MC",
      yearsExp: "8 years exp.",
      company: "Azure, Jenkins, Ansible",
      skills: ["Azure", "Jenkins", "Ansible"],
      interviewStatus: "To Schedule"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      position: "Site Reliability Engineer",
      avatar: "ER",
      yearsExp: "4 years exp.",
      company: "Prometheus, Grafana, ELK",
      skills: ["Prometheus", "Grafana", "ELK"],
      interviewStatus: "Pending"
    },
    {
      id: 5,
      name: "David Wilson",
      position: "Infrastructure Automation Specialist",
      avatar: "DW",
      yearsExp: "6 years exp.",
      company: "Puppet, Chef, GitOps",
      skills: ["Puppet", "Chef", "GitOps"],
      interviewStatus: "Scheduled"
    }
  ];

  // Skills categories data with percentages
  const skillsCategories = [
    {
      title: "Cloud Platforms",
      icon: <Cloud className="h-6 w-6 text-blue-600" />,
      skills: [
        { name: "AWS", percentage: "65%" },
        { name: "Azure", percentage: "42%" },
        { name: "GCP", percentage: "38%" }
      ],
      buttonText: "Filter by Cloud"
    },
    {
      title: "Containerization",
      icon: <Code className="h-6 w-6 text-blue-600" />,
      skills: [
        { name: "Docker", percentage: "92%" },
        { name: "Kubernetes", percentage: "78%" },
        { name: "OpenShift", percentage: "25%" }
      ],
      buttonText: "Filter by Container"
    },
    {
      title: "CI/CD Tools",
      icon: <Wrench className="h-6 w-6 text-blue-600" />,
      skills: [
        { name: "Jenkins", percentage: "72%" },
        { name: "GitLab CI", percentage: "45%" },
        { name: "GitHub Actions", percentage: "38%" }
      ],
      buttonText: "Filter by CI/CD"
    },
    {
      title: "Monitoring",
      icon: <Monitor className="h-6 w-6 text-blue-600" />,
      skills: [
        { name: "Prometheus", percentage: "58%" },
        { name: "Grafana", percentage: "55%" },
        { name: "ELK Stack", percentage: "42%" }
      ],
      buttonText: "Filter by Monitoring"
    }
  ];

  // Quick Actions data
  const quickActions = [
    {
      title: "Schedule Group Interview",
      action: "/schedule-interview"
    },
    {
      title: "Send Assessment Test",
      action: "/send-assessment"
    },
    {
      title: "Export to CSV",
      action: "/export"
    },
    {
      title: "Share Pool",
      action: "/share"
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Navigation path */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
          <span>{'>'}</span>
          <Link href="/candidates" className="hover:text-gray-700">Candidates</Link>
          <span>{'>'}</span>
          <span className="text-gray-700">DevOps Pool</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">DevOps Candidate Pool</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          {statsData.map((stat, index) => (
            <div key={index} className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
              <div className="flex flex-col items-start">
              <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    {stat.icon}
                  </div>
                <h3 className="text-xs font-medium text-gray-500">{stat.title}</h3>
                <div className="text-2xl font-bold my-2">{stat.value}</div>
                <p className="text-xs font-medium text-gray-500 mb-3">{stat.description}</p>
                <Button
                  variant="default"
                  size="sm"
                  className="mt-auto text-xs rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {stat.buttonText}
                </Button>
              </div>
            </div>
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

        {/* Filters and actions */}
        <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 items-start md:items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search DevOps candidates..."
                className="pl-2 rounded-3xl w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-4 w-4 absolute right-2.5 top-2.5 text-gray-400" />
            </div>
            <div className="flex space-x-4">
              <Button
                variant="default"
                size="default"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              
              <Button
                variant="default"
                size="default"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
          
          <Button
            variant="default"
            size="default"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
          >
            Bulk Actions
          </Button>
        </div>

        {/* Candidates List  */}
        <div className="overflow-hidden">
          {/* Candidates */}
          {candidates.map((candidate, index) => (
            <div key={index} className="flex items-center justify-between py-4  border-b">
              {/* Star marker */}
              <div className="flex items-center w-8">
                <Star className="h-5 w-5 fill-black" />
              </div>
              
              {/* Avatar and name */}
              <div className="flex items-center space-x-3 w-48">
                <Avatar className="h-8 w-8 bg-gray-200">
                  <AvatarFallback>{candidate.avatar}</AvatarFallback>
                </Avatar>
                <div >
                  <div className="text-sm font-medium">{candidate.name}</div>
                  <div className="text-xs text-gray-500">{candidate.position}</div>
                </div>
              </div>
              
              {/* Experience */}
              <div className="w-28 text-sm">{candidate.yearsExp}</div>
              
              {/* Skills */}
              <div className="w-48 text-sm">{candidate.company}</div>
              
              {/* Interview status */}
              <div className="w-36 text-sm">Interview: {candidate.interviewStatus}</div>
              
              {/* Action buttons */}
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white ">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white ">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

       {/* Candidate Skills Dashboard  */}
<div className="mt-8">
  <h2 className="text-lg font-semibold mb-4">Candidate Skills Distribution</h2>
  <div className="grid gap-6 md:grid-cols-4 ">
    {skillsCategories.map((category, index) => (
      <div key={index} className="rounded-3xl bg-[#1231AA0D] border-0 p-4">
        {/* Icon centered */}
        <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    {category.icon}
                  </div>
        
        {/* Heading centered */}
        <h3 className="text-base font-medium text-start mb-3">{category.title}</h3>
        
        {/* Skills with percentages in one line */}
        <div className="mb-2">
          <p className="text-sm">
            {category.skills.map((skill, skillIndex) => (
              <span key={skillIndex}>
                {skill.name} <span className="text-gray-500 text-xs">({skill.percentage})</span>
                {skillIndex < category.skills.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
        
        <Button
          variant="default"
          size="sm"
          className="mt-4 text-xs rounded-3xl w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {category.buttonText}
        </Button>
      </div>
    ))}
  </div>
</div>

        {/* Quick Actions */}
        <div className="space-y-4 mt-8">
          <div>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.action}>
                <Button
                  variant="default"
                  size="default"
                  className="w-full rounded-3xl  hover:bg-blue-600 text-white bg-blue-700"
                >
                  {action.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User, UsersIcon, CheckCircle, Clock, Plus, Search, Users,
  MoreHorizontal, FileText, Download, Upload, Briefcase,
  Code, Database, MoreVertical, EyeOff, Eye, Link2, BadgeAlert,
  Monitor, CirclePlus, UserPlus, PlusCircle, Edit, Trash2, AlertCircle,
  Text, TrendingUp, MoveRight, Circle
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CVRebrander() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("recent");

  // Stats data
  const statsData = [
    {
      title: "TOTAL TEMPLATES",
      value: "12",
      description: "Templates available",
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      buttonText: "Manage Templates"
    },
    {
      title: "RECENT SUBMISSIONS",
      value: "24",
      description: "Last 30 days",
      icon: <AlertCircle className="h-4 w-4 text-blue-600" />,
      buttonText: "View History"
    },
    {
      title: "PENDING APPROVAL",
      value: "5",
      description: "Awaiting review",
      icon: <Clock className="h-4 w-4 text-blue-600" />,
      buttonText: "Review Now"
    },
    {
      title: "NEW REBRANDINGS",
      value: "Start Now",
      description: "Create new CV rebrand",
      icon: <PlusCircle className="h-4 w-4 text-blue-600" />,
      buttonText: "Create New",
      link: "/cv-reviewer/create-new"
    }
  ];

  // Recent CVs data
  const recentCVs = [
    {
      name: "Michael Johnson",
      position: "Senior Software Engineer",
      modifiedDate: "Modified 2 days ago",
      company: "Tech Solutions Inc.",
      icon: <FileText className="h-4 w-4 text-black" />,
    },
    {
      name: "Sarah Williams",
      position: "Product Manager",
      modifiedDate: "Modified 3 days ago",
      company: "Innovatech",
      icon: <FileText className="h-4 w-4 text-black" />,
    },
    {
      name: "David Chen",
      position: "UX Designer",
      modifiedDate: "Modified 4 days ago",
      company: "Creative Solutions",
      icon: <FileText className="h-4 w-4 text-black" />,
    },
    {
      name: "Emily Rodriguez",
      position: "Marketing Specialist",
      modifiedDate: "Modified 5 days ago",
      company: "Growth Partners",
      icon: <FileText className="h-4 w-4 text-black" />,
    },
    {
      name: "James Wilson",
      position: "Data Analyst",
      modifiedDate: "Modified 1 week ago",
      company: "Analytics Pro",
      icon: <FileText className="h-4 w-4 text-black" />,
    }
  ];

  // CV Templates data
  const cvTemplates = [
    {
      title: "Corporate Standard",
      description: "Ideal for business roles",
      usedCount: "Used 45 times",
      icon: <FileText className="h-4 w-4 text-blue-600" />
    },
    {
      title: "Technical Focus",
      description: "Highlights tech skills",
      usedCount: "Used 52 times",
      icon: <FileText className="h-4 w-4 text-blue-600" />
    },
    {
      title: "Executive",
      description: "Professional leadership",
      usedCount: "Used 38 times",
      icon: <FileText className="h-4 w-4 text-blue-600" />
    },
    {
      title: "Create Template",
      description: "Design a new template",
      usedCount: "",
      icon: <CirclePlus className="h-4 w-4 text-blue-600" />
    }
  ];

  // Rebranding statistics data
  const rebrandingStats = [
    {
      title: "Corporate Standard",
      count: "Used 45 times",
      icon: <TrendingUp className="h-4 w-4 text-black" />
    },
    {
      title: "Technical Focus",
      count: "Used 52 times",
      icon: <MoveRight className="h-4 w-4 text-black" />
    },
    {
      title: "Executive",
      count: "Used 38 times",
      icon: <TrendingUp className="h-4 w-4 text-black" />
    },
    {
      title: "Custom Templates",
      count: "Used 16 times",
      icon: <MoveRight className="h-4 w-4 text-black" />
    }
  ];

  // Tab data
  const tabItems = [
    { id: "recent", label: "Recent CVs" },
    { id: "templates", label: "Templates" },
    { id: "pending", label: "Pending Approval" },
    { id: "completed", label: "Completed" }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Navigation path */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
          <span>{'>'}</span>
          <span className="text-gray-700">CV Rebrander</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">CV Rebrander</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-4">
          {statsData.map((stat, index) => (
            <Card key={index} className="rounded-3xl bg-[#1231AA0D] border-0">
              <CardContent className="p-4">
                <div className="flex flex-col items-start">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                    {stat.icon}
                  </div>
                  <CardTitle className="text-xs font-medium">{stat.title}</CardTitle>
                  <h3 className="text-2xl font-bold my-2">{stat.value}</h3>
                  <p className="text-xs font-medium mb-3">{stat.description}</p>
                  {stat.link ? (
                    <Link href={stat.link}>
                      <Button
                        variant="default"
                        size="sm"
                        className="mt-auto text-xs rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {stat.buttonText}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      className="mt-auto text-xs rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {stat.buttonText}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Upload Section */}
        <div className="flex justify-between items-center">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search candidate CVs..."
              className="pl-2 rounded-xl w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="h-4 w-4 absolute right-2.5 top-2.5 font-medium" />
          </div>
          <Button
            variant="default"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
          >
            <Upload className="mr-2 h-4 w-4" /> Upload CV
          </Button>
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

        {/* Recent Candidate CVs */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Recent Candidate CVs</h2>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full">
              <tbody>
                {recentCVs.map((cv, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-4 pl-4 pr-3">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FileText className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{cv.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="text-sm text-gray-900">{cv.position}</div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="text-sm text-gray-500">{cv.modifiedDate}</div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="text-sm text-gray-500">{cv.company}</div>
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CV Templates */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">CV Templates</h2>
            <Button
              variant="default"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Template
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {cvTemplates.map((template, index) => (
              <Card key={index} className="rounded-3xl bg-[#1231AA0D] border-0">
                <CardContent className="p-4">
                  <div className="flex flex-col items-start">
                      <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                        {template.icon}
                      </div>
                    <h3 className="text-base font-medium mb-1">{template.title}</h3>
                    <p className="text-xs font-medium mb-1">{template.description}</p>
                    {template.usedCount && <p className="text-xs text-gray-500 mb-3">{template.usedCount}</p>}
                    <div className="mt-auto w-full flex space-x-2">
                      {index !== 3 ? (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            className="text-sm rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Use
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-sm rounded-3xl hover:bg-blue-600 hover:text-white "
                          >
                            Preview
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          className="text-xs rounded-3xl bg-blue-600 hover:bg-blue-700 text-white w-full"
                        >
                          Create New
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Rebranding Statistics */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Rebranding Statistics</h2>
          </div>
          <div className="space-y-4">
            {rebrandingStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between py-3 px-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <h4 className="text-sm font-medium">{stat.title}</h4>
                </div>
                <div className="flex items-center">
                  <span className="text-xs font-medium mr-4">
                    {stat.icon}
                  </span>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
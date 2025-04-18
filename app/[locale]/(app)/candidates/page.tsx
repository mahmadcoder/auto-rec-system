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
  Monitor,
  CirclePlus,
  UserPlus,
  PlusCircle
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type EyeStatesType = {
  [key: number]: boolean;
};

export default function CandidatesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPool, setSelectedPool] = useState("");
  const [eyeStates, setEyeStates] = useState<EyeStatesType>({});

  // Stats data
  const statsData = [
    {
      title: "TOTAL",
      value: "247",
      description: "Candidates in database",
      icon: <Users className="h-4 w-4 text-blue-600 fill-blue-600" />,
      buttonText: "View All"
    },
    {
      title: "NEW THIS WEEK",
      value: "32",
      description: "New candidates",
      icon: <BadgeAlert className="h-4 w-4 text-blue-600" />,
      buttonText: "View New"
    },
    {
      title: "HIRED",
      value: "18",
      description: "Candidates hired",
      icon: <CheckCircle className="h-4 w-4 text-blue-600" />,
      buttonText: "View Hired"
    },
    {
      title: "LINKEDIN IMPORT",
      value: "Import",
      description: "Profiles (3 hours)",
      icon: <Link2 className="h-4 w-4 text-blue-600" />,
      buttonText: "Import"
    }
  ];

  // Candidate pools data
  const poolsData = [
    {
      title: "DevOps",
      count: "24 candidates",
      icon: <Code className="h-4 w-4 text-blue-600" />
    },
    {
      title: "Frontend",
      count: "36 candidates",
      icon: <Monitor className="h-4 w-4 text-blue-600" />
    },
    {
      title: "Backend",
      count: "28 candidates",
      icon: <Database className="h-4 w-4 text-blue-600" />
    },
    {
      title: "Create Pool",
      count: "Organize candidates by role",
      icon: <CirclePlus className="h-4 w-4 text-blue-600" />
    }
  ];

  // Recent candidates data
  const recentCandidates = [
    {
      name: "Jennifer Lee",
      position: "Frontend Developer",
      addedDate: "Added today",
      pool: "Frontend",
      avatar: "JL"
    },
    {
      name: "Robert Taylor",
      position: "DevOps Engineer",
      addedDate: "Added yesterday",
      pool: "DevOps",
      avatar: "RT"
    },
    {
      name: "Sophia Martinez",
      position: "Product Manager",
      addedDate: "Added 2 days ago",
      pool: "None",
      avatar: "SM"
    },
    {
      name: "Dylan Kim",
      position: "Data Scientist",
      addedDate: "Added 3 days ago",
      pool: "None",
      avatar: "DK"
    }
  ];

  // Quick actions data
  const quickActions = [
    {
      title: "Add Candidate",
      description: "Manually add a new candidate",
      icon: <PlusCircle className="h-4 w-4 text-blue-600" />,
      buttonText: "Add New"
    },
    {
      title: "Bulk Import",
      description: "Import candidates from CSV",
      icon: <Upload className="h-4 w-4 text-blue-600" />,
      buttonText: "Import"
    },
    {
      title: "LinkedIn Import",
      description: "Import from LinkedIn profiles",
      icon: <Link2 className="h-4 w-4 text-blue-600" />,
      buttonText: "Connect"
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Initialize eye states for all candidates
    const initialEyeStates: EyeStatesType = {};
    recentCandidates.forEach((_, index) => {
      initialEyeStates[index] = true; // true means eye is open
    });
    setEyeStates(initialEyeStates);
  }, []);

  const toggleEye = (index: any) => {
    setEyeStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Breadcrumb navigation */}
        <div className="flex items-center text-sm font-medium">
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Candidates</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Candidates Overview</h1>
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
                  {stat.title === "LINKEDIN IMPORT" ? (
                    <Button
                      variant="default"
                      size="sm"
                      className="mt-auto text-xs rounded-3xl bg-blue-600 hover:bg-blue-700 text-white"
                      asChild
                    >
                      <Link href="/candidates/linkedin-import">{stat.buttonText}</Link>
                    </Button>
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

        {/* Candidate Pools */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Candidate Pools</h2>
            <Button
              variant="default"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Pool
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-4">

            {poolsData.map((pool, index) => (
              <Card key={index} className="rounded-3xl bg-[#1231AA0D] border-0">
                <CardContent className="p-4">
                  <div className="flex flex-col items-start">
                    <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                      {pool.icon}
                    </div>
                    <h3 className="text-base font-medium mb-1">{pool.title}</h3>
                    <p className="text-xs font-medium mb-3">{pool.count}</p>
                    <div className="mt-auto w-full flex">
                      {/* Modified Link button for DevOps pool */}
                      {pool.title === "DevOps" ? (
                        <Button
                          variant="default"
                          size="sm"
                          className="text-xs rounded-3xl bg-blue-600 hover:bg-blue-700 text-white mr-2"
                          asChild
                        >
                          <Link href="/candidates/devops-pool">View Pool</Link>
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          className="text-xs rounded-3xl bg-blue-600 hover:bg-blue-700 text-white mr-2"
                        >
                          View Pool
                        </Button>
                      )}
                      {index !== 3 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-3xl hover:bg-blue-700 hover:text-white"
                        >
                          <Link href="/candidates/add-candidate">Add Candidates</Link>
                        </Button>
                      )}
                      {index === 3 && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-3xl hover:bg-blue-700 hover:text-white"
                        >
                          Create Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Candidates */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Candidates</h2>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search candidates..."
                className="pl-2 rounded-xl w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="h-4 w-4 absolute right-2.5 top-2.5 font-medium" />
            </div>
          </div>
          <div className="space-y-2">
            {recentCandidates.map((candidate, index) => (
              <div key={index} className="flex items-center justify-between py-3 bg-white rounded-xl shadow-sm px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-blue-100 text-blue-700">
                    <AvatarFallback>{candidate.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-row items-center space-x-4">
                    <h4 className="text-sm font-medium w-48">{candidate.name}</h4>
                    <p className="text-xs font-medium w-32">{candidate.position}</p>
                  </div>
                </div>
                <div className="text-xs font-medium w-1/4 text-center">{candidate.addedDate}</div>
                <div className="flex items-center gap-1 w-1/6 text-center">
                  <span className="text-xs font-medium">Pools: {candidate.pool} candidates</span>
                </div>
                <div className="flex items-center">
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-white"
                      onClick={() => toggleEye(index)}
                    >
                      {eyeStates[index] ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add to Pool */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Add to Pool</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm px-4 py-3">
              <h4 className="text-sm font-medium mb-2">Select Candidate</h4>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search candidate name"
                  className="pl-2 rounded-3xl"
                />
                <Search className="h-4 w-4 absolute right-2.5 top-2.5 font-medium" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm px-4 py-3">
              <h4 className="text-sm font-medium mb-2">Select Pool</h4>
              <Select value={selectedPool} onValueChange={setSelectedPool}>
                <SelectTrigger className="rounded-3xl">
                  <SelectValue placeholder="Browse existing pools or create new" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="new">+ Create New Pool</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              variant="default"
              size="default"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
            >
              Add to Pool
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {quickActions.map((action, index) => (
              <Card key={index} className="rounded-3xl bg-[#1231AA0D] border-0">
                <CardContent className="p-4">
                  <div className="flex flex-col items-start">
                    <div className="h-10 w-10 rounded-full bg-[#E0E4F0] flex items-center justify-center mb-2">
                      {action.icon}
                    </div>
                    <h3 className="text-base font-medium mb-1">{action.title}</h3>
                    <p className="text-xs font-medium mb-3">{action.description}</p>
                    <Button
                      variant="default"
                      size="sm"
                      className="mt-auto text-xs rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {action.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
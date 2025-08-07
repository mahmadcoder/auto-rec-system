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
  PlusCircle,
  Loader2
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
  const [recentCandidates, setRecentCandidates] = useState<any[]>([]);

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

  // Function to fetch candidates from the API
  const fetchCandidates = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/candidates', {
        headers: {
          'Authorization': 'Bearer placeholder-token' // This is a placeholder, replace with actual auth
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRecentCandidates(data);
      } else {
        console.error('Failed to fetch candidates');
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter candidates based on search query
  const filteredCandidates = recentCandidates.filter(candidate => {
    if (!searchQuery) return true;
    
    const fullName = `${candidate.firstName} ${candidate.lastName}`.toLowerCase();
    const position = (candidate.currentTitle || '').toLowerCase();
    const searchLower = searchQuery.toLowerCase();
    
    return fullName.includes(searchLower) || position.includes(searchLower);
  });

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
    // Fetch candidates
    fetchCandidates();
  }, []);

  // Initialize eye states whenever recentCandidates changes
  useEffect(() => {
    const initialEyeStates: EyeStatesType = {};
    recentCandidates.forEach((_, index) => {
      initialEyeStates[index] = true; // true means eye is open
    });
    setEyeStates(initialEyeStates);
  }, [recentCandidates]);

  const toggleEye = (index: any) => {
    setEyeStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <DashboardShell>
      <div className="mx-auto space-y-6 p-0 md:p-6">
        {/* Navigation path */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
          <span>{'>'}</span>
          <span className="text-gray-700">Candidates</span>
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
                onChange={handleSearch}
              />
              <Search className="h-4 w-4 absolute right-2.5 top-2.5 font-medium" />
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-[#1231AA]" />
            <span className="ml-2 text-[#1231AA]">Loading candidates...</span>
          </div>
          ) : filteredCandidates.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="flex flex-col items-center justify-center space-y-3">
                <UsersIcon className="h-12 w-12 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900">
                  {searchQuery ? 'No candidates match your search' : 'No candidates yet'}
                </h3>
                <p className="text-gray-500 max-w-sm">
                  {searchQuery 
                    ? `We couldn't find any candidates matching "${searchQuery}". Try a different search term.` 
                    : 'Get started by adding your first candidate to the database.'}
                </p>
                <Button
                  variant="default"
                  size="default"
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl"
                  asChild
                >
                  <Link href="/candidates/add-candidate">
                    <Plus className="mr-2 h-4 w-4" /> Add Candidate
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden">
              {filteredCandidates.map((candidate, index) => (
                <div key={index} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50">
                  <div className="w-10">
                    <Avatar className="h-8 w-8 bg-blue-100">
                      <AvatarFallback className="text-blue-700 text-xs">
                        {candidate.firstName && candidate.lastName 
                          ? `${candidate.firstName[0]}${candidate.lastName[0]}` 
                          : 'C'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 font-medium">{`${candidate.firstName} ${candidate.lastName}`}</div>
                  <div className="flex-1 text-sm text-gray-600">{candidate.currentTitle || 'No Title'}</div>
                  <div className="flex-1 text-sm text-gray-500">
                    {new Date(candidate.createdAt).toLocaleDateString() === new Date().toLocaleDateString()
                      ? 'Added today'
                      : new Date(candidate.createdAt).toLocaleDateString() === new Date(Date.now() - 86400000).toLocaleDateString()
                        ? 'Added yesterday'
                        : `Added ${new Date(candidate.createdAt).toLocaleDateString()}`}
                  </div>
                  <div className="flex-1">
                    {candidate.skills && candidate.skills.length > 0 ? (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 rounded-full">
                        {candidate.skills[0]}
                      </Badge>
                    ) : (
                      <span className="text-sm text-gray-500">None</span>
                    )}
                  </div>
                  <div className="w-24 flex justify-end space-x-1">
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
              ))}
            </div>
          )}
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